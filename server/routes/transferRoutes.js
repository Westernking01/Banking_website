const express = require('express');
const { transferFunds, payBill } = require('../controllers/transferController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', transferFunds);
router.post('/pay-bill', payBill);

module.exports = router;
