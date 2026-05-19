const User = require('../models/User');
const Transaction = require('../models/Transaction');

/**
 * @route   POST /api/transfer
 * @access  Private
 */
const transferFunds = async (req, res, next) => {
  try {
    const { recipientIdentifier, amount, description } = req.body;

    if (!recipientIdentifier || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Recipient and amount are required.',
      });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid transfer amount.' });
    }

    // Find sender
    const sender = await User.findById(req.user._id);

    // Find receiver by email or account number
    const receiver = await User.findOne({
      $or: [
        { email: recipientIdentifier.toLowerCase() },
        { accountNumber: recipientIdentifier.toUpperCase() },
      ],
    });

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found. Check the email or account number.',
      });
    }

    if (sender._id.toString() === receiver._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot transfer money to yourself.',
      });
    }

    if (sender.balance < parsedAmount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient funds. Your balance is $${sender.balance.toFixed(2)}.`,
      });
    }

    // Record balances before transfer
    const senderBalanceBefore = sender.balance;
    const receiverBalanceBefore = receiver.balance;

    // Atomic-style update
    sender.balance = parseFloat((sender.balance - parsedAmount).toFixed(2));
    receiver.balance = parseFloat((receiver.balance + parsedAmount).toFixed(2));

    // Save both users
    await Promise.all([sender.save(), receiver.save()]);

    const txDescription = description || `Transfer to ${receiver.name}`;

    // Create both transaction records in parallel
    const [senderTx, receiverTx] = await Promise.all([
      Transaction.create({
        user: sender._id,
        type: 'debit',
        amount: parsedAmount,
        description: txDescription,
        category: 'transfer',
        balanceBefore: senderBalanceBefore,
        balanceAfter: sender.balance,
        counterparty: receiver.name,
      }),
      Transaction.create({
        user: receiver._id,
        type: 'credit',
        amount: parsedAmount,
        description: `Transfer from ${sender.name}`,
        category: 'transfer',
        balanceBefore: receiverBalanceBefore,
        balanceAfter: receiver.balance,
        counterparty: sender.name,
      }),
    ]);

    res.status(200).json({
      success: true,
      message: `Successfully transferred $${parsedAmount.toFixed(2)} to ${receiver.name}.`,
      data: {
        transaction: senderTx,
        newBalance: sender.balance,
        recipient: {
          name: receiver.name,
          accountNumber: receiver.accountNumber,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/transfer/pay-bill
 * @access  Private
 */
const payBill = async (req, res, next) => {
  try {
    const { amount, billerName } = req.body;

    if (!amount || !billerName) {
      return res.status(400).json({ success: false, message: 'Amount and Biller Name are required.' });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid bill amount.' });
    }

    const user = await User.findById(req.user._id);

    if (user.balance < parsedAmount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient funds. Your balance is $${user.balance.toFixed(2)}.`,
      });
    }

    const balanceBefore = user.balance;
    user.balance = parseFloat((user.balance - parsedAmount).toFixed(2));
    await user.save();

    const tx = await Transaction.create({
      user: user._id,
      type: 'debit',
      amount: parsedAmount,
      description: `Payment to ${billerName}`,
      category: 'payment',
      balanceBefore,
      balanceAfter: user.balance,
      counterparty: billerName,
    });

    res.status(200).json({
      success: true,
      message: `Successfully paid $${parsedAmount.toFixed(2)} to ${billerName}.`,
      data: {
        transaction: tx,
        newBalance: user.balance,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { transferFunds, payBill };
