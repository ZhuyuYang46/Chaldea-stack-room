const { Novel } = require('../models');

// 取得所有小說
exports.getAllNovels = async (req, res) => {
  try {
    const novels = await Novel.findAll();
    res.json(novels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 取得單一本
exports.getNovelById = async (req, res) => {
  try {
    const novel = await Novel.findByPk(req.params.id);
    if (!novel) return res.status(404).json({ message: 'Novel not found' });
    res.json(novel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 新增小說（需登入）
exports.createNovel = async (req, res) => {
  try {
    const { title, author, summary, coverImageUrl } = req.body;
    const novel = await Novel.create({ title, author, summary, coverImageUrl });
    res.status(201).json(novel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 修改小說（需登入）
exports.updateNovel = async (req, res) => {
  try {
    const novel = await Novel.findByPk(req.params.id);
    if (!novel) return res.status(404).json({ message: 'Novel not found' });

    await novel.update(req.body);
    res.json(novel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 刪除小說（需登入）
exports.deleteNovel = async (req, res) => {
  try {
    const novel = await Novel.findByPk(req.params.id);
    if (!novel) return res.status(404).json({ message: 'Novel not found' });

    await novel.destroy();
    res.json({ message: 'Novel deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
