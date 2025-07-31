const express = require('express');
const router = express.Router();
const novelController = require('../controllers/novelController');
const authenticateToken = require('../middleware/authMiddleware');

// 公開路由
router.get('/', novelController.getAllNovels);
router.get('/:id', novelController.getNovelById);

// 保護路由
router.post('/', authenticateToken, novelController.createNovel);
router.put('/:id', authenticateToken, novelController.updateNovel);
router.delete('/:id', authenticateToken, novelController.deleteNovel);

module.exports = router;
