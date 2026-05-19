const express = require('express');
const { getCards, createCard, freezeCard } = require('../controllers/cardController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getCards);
router.post('/', createCard);
router.patch('/:id/freeze', freezeCard);

module.exports = router;
