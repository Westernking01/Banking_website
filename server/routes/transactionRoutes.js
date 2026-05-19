const express = require('express');
const { getTransactions, createTransaction, getDashboardStats } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/', getTransactions);
router.post('/', createTransaction);

module.exports = router;
