const Transaction = require('../models/Transaction');
const User = require('../models/User');

/**
 * @route   GET /api/transactions
 * @access  Private
 */
const getTransactions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = { user: req.user._id };
    
    // Type filter
    if (req.query.type && req.query.type !== 'All Types') {
      if (req.query.type === 'Credit') filter.type = 'credit';
      if (req.query.type === 'Debit') filter.type = 'debit';
      if (req.query.type === 'Internal Transfer') filter.category = 'transfer';
    }

    // Amount Range Filter
    if (req.query.amountRange && req.query.amountRange !== 'Any Amount') {
      if (req.query.amountRange === '$0 - $500') {
        filter.amount = { $gte: 0, $lte: 500 };
      } else if (req.query.amountRange === '$500 - $5,000') {
        filter.amount = { $gt: 500, $lte: 5000 };
      } else if (req.query.amountRange === '$5,000+') {
        filter.amount = { $gt: 5000 };
      }
    }

    // Date Range Filter
    if (req.query.dateRange && req.query.dateRange !== 'All Time') {
      const now = new Date();
      if (req.query.dateRange === 'Last 7 Days') {
        const d = new Date(); d.setDate(d.getDate() - 7);
        filter.createdAt = { $gte: d };
      } else if (req.query.dateRange === 'Last 30 Days') {
        const d = new Date(); d.setDate(d.getDate() - 30);
        filter.createdAt = { $gte: d };
      } else if (req.query.dateRange === 'This Month') {
        const d = new Date(now.getFullYear(), now.getMonth(), 1);
        filter.createdAt = { $gte: d };
      }
    }

    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Transaction.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: transactions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTransactions: total,
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/transactions
 * @access  Private
 */
const createTransaction = async (req, res, next) => {
  try {
    const { type, amount, description, category } = req.body;

    if (!type || !amount || !description) {
      return res.status(400).json({
        success: false,
        message: 'Type, amount, and description are required.',
      });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount.' });
    }

    const user = await User.findById(req.user._id);
    const balanceBefore = user.balance;

    if (type === 'debit') {
      if (user.balance < parsedAmount) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient funds.',
        });
      }
      user.balance = parseFloat((user.balance - parsedAmount).toFixed(2));
    } else {
      user.balance = parseFloat((user.balance + parsedAmount).toFixed(2));
    }

    await user.save();

    const transaction = await Transaction.create({
      user: user._id,
      type,
      amount: parsedAmount,
      description,
      category: category || 'other',
      balanceBefore,
      balanceAfter: user.balance,
    });

    res.status(201).json({
      success: true,
      message: 'Transaction recorded.',
      data: transaction,
      newBalance: user.balance,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/transactions/stats
 * @access  Private
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Current month start and end dates
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Previous month start and end dates
    const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const [currentMonthTx, prevMonthTx] = await Promise.all([
      Transaction.find({ user: userId, createdAt: { $gte: startOfCurrentMonth } }),
      Transaction.find({ user: userId, createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth } })
    ]);

    // Calculate current month
    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    currentMonthTx.forEach(tx => {
      if (tx.type === 'credit') monthlyIncome += tx.amount;
      if (tx.type === 'debit') monthlyExpenses += tx.amount;
    });

    // Calculate prev month
    let prevMonthlyIncome = 0;
    prevMonthTx.forEach(tx => {
      if (tx.type === 'credit') prevMonthlyIncome += tx.amount;
    });

    // Calculate growth percentage
    let incomeGrowth = 0;
    if (prevMonthlyIncome > 0) {
      incomeGrowth = ((monthlyIncome - prevMonthlyIncome) / prevMonthlyIncome) * 100;
    } else if (monthlyIncome > 0) {
      incomeGrowth = 100; // If no previous income but current income exists
    }

    // Calculate Spending Analytics (Hourly, Daily, Monthly)
    const hourlyAnalyticsMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setHours(now.getHours() - i);
      const hourStr = d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
      hourlyAnalyticsMap[hourStr] = { day: hourStr, total: 0, active: i === 0 };
    }

    const dailyAnalyticsMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      dailyAnalyticsMap[dayStr] = { day: dayStr, total: 0, active: i === 0 };
    }

    const monthlyAnalyticsMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(now.getMonth() - i);
      const monthStr = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      monthlyAnalyticsMap[monthStr] = { day: monthStr, total: 0, active: i === 0 };
    }

    const sevenMonthsAgo = new Date(now);
    sevenMonthsAgo.setMonth(now.getMonth() - 6);
    sevenMonthsAgo.setDate(1);
    sevenMonthsAgo.setHours(0, 0, 0, 0);

    const analyticsTx = await Transaction.find({
      user: userId,
      type: 'debit',
      createdAt: { $gte: sevenMonthsAgo }
    });

    const sevenHoursAgo = new Date(now);
    sevenHoursAgo.setHours(now.getHours() - 6, 0, 0, 0);

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    analyticsTx.forEach(tx => {
      const txDate = new Date(tx.createdAt);
      
      if (txDate >= sevenHoursAgo) {
        const hourStr = txDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
        if (hourlyAnalyticsMap[hourStr]) hourlyAnalyticsMap[hourStr].total += tx.amount;
      }
      
      if (txDate >= sevenDaysAgo) {
        const dayStr = txDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        if (dailyAnalyticsMap[dayStr]) dailyAnalyticsMap[dayStr].total += tx.amount;
      }
      
      const monthStr = txDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      if (monthlyAnalyticsMap[monthStr]) monthlyAnalyticsMap[monthStr].total += tx.amount;
    });

    const formatAnalytics = (map) => {
      const arr = Object.values(map);
      const maxVal = Math.max(...arr.map(a => a.total), 1);
      return arr.map(a => {
        const heightPercentage = Math.max((a.total / maxVal) * 100, 5);
        return {
          day: a.day,
          height: `${heightPercentage}%`,
          active: a.active,
          label: `$${(a.total >= 1000 ? (a.total / 1000).toFixed(1) + 'k' : a.total.toFixed(0))}`,
        };
      });
    };

    const spendingAnalytics = {
      hourly: formatAnalytics(hourlyAnalyticsMap),
      daily: formatAnalytics(dailyAnalyticsMap),
      monthly: formatAnalytics(monthlyAnalyticsMap)
    };

    res.status(200).json({
      success: true,
      data: {
        monthlyIncome,
        monthlyExpenses,
        incomeGrowth: parseFloat(incomeGrowth.toFixed(1)),
        spendingAnalytics
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTransactions, createTransaction, getDashboardStats };
