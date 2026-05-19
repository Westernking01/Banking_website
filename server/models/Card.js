const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const cardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    maskedNumber: {
      type: String, // e.g. **** **** **** 4242
      required: true,
    },
    cardHolder: {
      type: String,
      required: [true, 'Card holder name is required'],
      trim: true,
    },
    expiryMonth: {
      type: String,
      required: true,
    },
    expiryYear: {
      type: String,
      required: true,
    },
    cvvHash: {
      type: String,
      required: true,
      select: false,
    },
    type: {
      type: String,
      enum: ['virtual', 'physical'],
      default: 'virtual',
    },
    network: {
      type: String,
      enum: ['visa', 'mastercard'],
      default: 'visa',
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
    spendingLimit: {
      type: Number,
      default: 5000,
    },
    color: {
      type: String,
      default: '#00236f',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
