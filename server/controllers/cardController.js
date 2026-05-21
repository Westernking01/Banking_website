const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Card = require('../models/Card');

/**
 * Generate a random 16-digit card number
 */
const generateCardNumber = () => {
  return Array.from({ length: 4 }, () =>
    Math.floor(1000 + Math.random() * 9000).toString()
  ).join(' ');
};

/**
 * Generate CVV
 */
const generateCVV = () => Math.floor(100 + Math.random() * 900).toString();

/**
 * @route   GET /api/cards
 * @access  Private
 */
const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cards.length,
      data: cards,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/cards
 * @access  Private
 */
const createCard = async (req, res, next) => {
  try {
    const { type = 'virtual', network = 'visa', color } = req.body;

    // Limit virtual cards per user
    const existingCards = await Card.countDocuments({ user: req.user._id });
    if (existingCards >= 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum of 5 cards allowed per account.',
      });
    }

    const rawCardNumber = generateCardNumber();
    const cvv = generateCVV();

    // Hash CVV for secure storage
    const salt = await bcrypt.genSalt(10);
    const cvvHash = await bcrypt.hash(cvv, salt);

    // Calculate expiry: 3 years from now
    const now = new Date();
    const expiryMonth = String(now.getMonth() + 1).padStart(2, '0');
    const expiryYear = String(now.getFullYear() + 3).slice(-2);

    // Mask card number: **** **** **** XXXX
    const parts = rawCardNumber.split(' ');
    const maskedNumber = `**** **** **** ${parts[3]}`;

    const card = await Card.create({
      user: req.user._id,
      cardNumber: rawCardNumber,
      maskedNumber,
      cardHolder: req.user.name.toUpperCase(),
      expiryMonth,
      expiryYear,
      cvvHash,
      type,
      network,
      color: color || '#00236f',
    });

    // Return card with one-time CVV (plain) for display — never stored plain
    res.status(201).json({
      success: true,
      message: 'Virtual card created successfully.',
      data: {
        ...card.toObject(),
        cvv, // Return CVV only once on creation
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/cards/:id/freeze
 * @access  Private
 */
const freezeCard = async (req, res, next) => {
  try {
    const card = await Card.findOne({ _id: req.params.id, user: req.user._id });

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found or does not belong to your account.',
      });
    }

    card.isFrozen = !card.isFrozen;
    await card.save();

    res.status(200).json({
      success: true,
      message: `Card ${card.isFrozen ? 'frozen' : 'unfrozen'} successfully.`,
      data: card,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/cards/:id/limit
 * @access  Private
 */
const updateSpendingLimit = async (req, res, next) => {
  try {
    const { spendingLimit } = req.body;
    const parsed = parseFloat(spendingLimit);

    if (isNaN(parsed) || parsed < 100 || parsed > 100000) {
      return res.status(400).json({
        success: false,
        message: 'Spending limit must be between $100 and $100,000.',
      });
    }

    const card = await Card.findOne({ _id: req.params.id, user: req.user._id });
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found or does not belong to your account.',
      });
    }

    card.spendingLimit = parsed;
    await card.save();

    res.status(200).json({
      success: true,
      message: `Spending limit updated to $${parsed.toLocaleString()}.`,
      data: card,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCards, createCard, freezeCard, updateSpendingLimit };
