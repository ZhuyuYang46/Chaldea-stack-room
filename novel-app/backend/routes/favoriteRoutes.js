const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authenticateToken = require('../middleware/authMiddleware');

// 需登入
router.get('/', authenticateToken, favoriteController.getMyFavorites);
router.post('/:novelId', authenticateToken, favoriteController.addFavorite);
router.delete('/:novelId', authenticateToken, favoriteController.removeFavorite);

module.exports = router;
