const { validationResult } = require('express-validator');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { generateToken } = require('../services/tokenService');

/**
 * Format user response (strip password, include token)
 */
const userResponse = (user, token) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  accountNumber: user.accountNumber,
  balance: user.balance,
  phone: user.phone,
  avatar: user.avatar,
  createdAt: user.createdAt,
  token,
});

/**
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const user = await User.create({ name, email, password });

    // Give welcome bonus of $1,000
    user.balance = 1000;
    await user.save();

    await Transaction.create({
      user: user._id,
      type: 'credit',
      amount: 1000,
      description: 'Welcome Bonus',
      category: 'deposit',
      balanceBefore: 0,
      balanceAfter: 1000,
      counterparty: 'Vault System',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully. Welcome to Vault!',
      data: userResponse(user, token),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Explicitly select password (it's excluded by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: userResponse(user, token),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
