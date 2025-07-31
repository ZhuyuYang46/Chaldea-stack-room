const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const authenticateToken = require('../middleware/authMiddleware');

// 公開：取得所有標籤
router.get('/', tagController.getAllTags);

// 保護：新增、修改、刪除
router.post('/', authenticateToken, tagController.createTag);
router.put('/:id', authenticateToken, tagController.updateTag);
router.delete('/:id', authenticateToken, tagController.deleteTag);

module.exports = router;
