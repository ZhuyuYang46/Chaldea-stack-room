// backend/controllers/novelController.js

const { Novel, Tag } = require('../models');

/**
 * GET /api/novels
 * 取得所有小说，可通过 ?tags=Tag1,Tag2 进行过滤
 */
exports.getAllNovels = async (req, res) => {
  try {
    const { tags } = req.query;

    // 默认 include 所有标签
    const include = [{
      model: Tag,
      through: { attributes: [] }
    }];

    // 如果传了 tags 参数，拆分并设置为 INNER JOIN
    if (tags) {
      const names = tags.split(',');
      include[0].where = { name: names };
      include[0].required = true;
    }

    const novels = await Novel.findAll({ include });
    res.json(novels);
  } catch (error) {
    console.error('getAllNovels error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/novels/:id
 * 根据 ID 取得单本小说，连带它的标签
 */
exports.getNovelById = async (req, res) => {
  try {
    const novel = await Novel.findByPk(req.params.id, {
      include: {
        model: Tag,
        through: { attributes: [] }
      }
    });
    if (!novel) {
      return res.status(404).json({ message: 'Novel not found' });
    }
    res.json(novel);
  } catch (error) {
    console.error('getNovelById error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/novels
 * 新增小说（仅创建基本字段，不处理标签关联）
 */
exports.createNovel = async (req, res) => {
  try {
    const { title, author, summary, coverImageUrl } = req.body;
    const novel = await Novel.create({ title, author, summary, coverImageUrl });
    res.status(201).json(novel);
  } catch (error) {
    console.error('createNovel error:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * PUT /api/novels/:id
 * 更新小说（仅更新基本字段，不处理标签关联）
 */
exports.updateNovel = async (req, res) => {
  try {
    const novel = await Novel.findByPk(req.params.id);
    if (!novel) {
      return res.status(404).json({ message: 'Novel not found' });
    }
    await novel.update(req.body);
    res.json(novel);
  } catch (error) {
    console.error('updateNovel error:', error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * DELETE /api/novels/:id
 * 删除小说
 */
exports.deleteNovel = async (req, res) => {
  try {
    const novel = await Novel.findByPk(req.params.id);
    if (!novel) {
      return res.status(404).json({ message: 'Novel not found' });
    }
    await novel.destroy();
    res.json({ message: 'Novel deleted' });
  } catch (error) {
    console.error('deleteNovel error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/novels/:novelId/tags
 * 为小说一次性设置标签关联
 * 前端请求体应为 { tagIds: [1,2,3] }
 */
exports.setNovelTags = async (req, res) => {
  try {
    const novelId = req.params.novelId;
    const { tagIds } = req.body;             // e.g. [1,2,3]
    
    const novel = await Novel.findByPk(novelId);
    if (!novel) {
      return res.status(404).json({ error: 'Novel not found' });
    }

    // Sequelize 会帮我们更新中间表 NovelTags
    await novel.setTags(tagIds);

    // 重新查询并带上标签返回给前端
    const updated = await Novel.findByPk(novelId, {
      include: {
        model: Tag,
        through: { attributes: [] }
      }
    });
    res.json(updated);
  } catch (error) {
    console.error('setNovelTags error:', error);
    res.status(500).json({ error: error.message });
  }
};
