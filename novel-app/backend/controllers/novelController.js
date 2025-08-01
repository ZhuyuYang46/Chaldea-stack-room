// backend/controllers/novelController.js
const { Novel, Tag } = require('../models');

// 取得所有小說，並可根据 ?tags=标签1,标签2 过滤
exports.getAllNovels = async (req, res) => {
  try {
    const { tags } = req.query;

    // 构造 include 配置：默认只 include 所有标签
    const include = [{
      model: Tag,
      through: { attributes: [] }  // 不返回中间表字段
    }];

    // 如果 URL 里有 tags 参数，就加上 where + required 强制 INNER JOIN
    if (tags) {
      const names = tags.split(','); // ["奇幻","冒险"]
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

// 取得单一本小说，连带它的标签
exports.getNovelById = async (req, res) => {
  try {
    const novel = await Novel.findByPk(req.params.id, {
      include: {
        model: Tag,
        through: { attributes: [] }
      }
    });
    if (!novel) return res.status(404).json({ message: 'Novel not found' });
    res.json(novel);
  } catch (error) {
    console.error('getNovelById error:', error);
    res.status(500).json({ error: error.message });
  }
};

// 新增 小说（不处理标签关联，若需要可另开接口）
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

// 修改小说（同上，不自动处理标签）
exports.updateNovel = async (req, res) => {
  try {
    const novel = await Novel.findByPk(req.params.id);
    if (!novel) return res.status(404).json({ message: 'Novel not found' });

    await novel.update(req.body);
    res.json(novel);
  } catch (error) {
    console.error('updateNovel error:', error);
    res.status(400).json({ error: error.message });
  }
};

// 刪除小說
exports.deleteNovel = async (req, res) => {
  try {
    const novel = await Novel.findByPk(req.params.id);
    if (!novel) return res.status(404).json({ message: 'Novel not found' });

    await novel.destroy();
    res.json({ message: 'Novel deleted' });
  } catch (error) {
    console.error('deleteNovel error:', error);
    res.status(500).json({ error: error.message });
  }
};
