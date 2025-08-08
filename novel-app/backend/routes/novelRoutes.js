// backend/routes/novelRoutes.js
const express = require('express');
const router = express.Router();
const novelController = require('../controllers/novelController');
const authenticateToken = require('../middleware/authMiddleware');

// ─── 公开路由 ────────────────────────────────────────────────────
router.get('/', novelController.getAllNovels);
router.get('/:id', novelController.getNovelById);

// ─── 受保护路由（需要登录）───────────────────────────────────────
// 创建小说
router.post(
  '/', 
  authenticateToken, 
  novelController.createNovel
);

// 更新小说
router.put(
  '/:id', 
  authenticateToken, 
  novelController.updateNovel
);

// 删除小说
router.delete(
  '/:id', 
  authenticateToken, 
  novelController.deleteNovel
);

// 为某本小说一次性设置标签关联
router.post(
  '/:novelId/tags',
  authenticateToken,
  novelController.setNovelTags
);

// 添加章节
router.post('/:id/chapters', async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are necessary.' })
  }

  try {
    const chapter = await Chapter.create({
      novelId: id,
      title,
      content
    })
    res.status(201).json(chapter)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to add chapter.' })
  }
});

module.exports = router;
