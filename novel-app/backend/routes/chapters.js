const express = require('express');
const router = express.Router({ mergeParams: true });
const { Chapter } = require('../models');

// 获取章节列表
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.findAll({ where: { novel_id: req.params.id } });
    res.json(chapters);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load chapters.');
  }
});

// 新增章节
router.post('/', async (req, res) => {
  const chapter = await Chapter.create({
    novel_id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  res.status(201).json(chapter);
});

// 获取单个章节
router.get('/:chapterId', async (req, res) => {
  const chapter = await Chapter.findByPk(req.params.chapterId);
  if (!chapter) return res.sendStatus(404);
  res.json(chapter);
});

// 更新章节
router.put('/:chapterId', async (req, res) => {
  const chapter = await Chapter.findByPk(req.params.chapterId);
  if (!chapter) return res.sendStatus(404);
  await chapter.update({ title: req.body.title, content: req.body.content });
  res.json(chapter);
});

module.exports = router;
