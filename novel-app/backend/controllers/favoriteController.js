// backend/controllers/favoriteController.js
const { Favorite, Novel } = require('../models');

// 取得目前使用者所有收藏（返回小说列表）
exports.getMyFavorites = async (req, res) => {
  try {
    // 查询收藏记录，并 include 小说
    const favs = await Favorite.findAll({
      where: { userId: req.user.id },
      include: {
        model: Novel,
        as: 'Novel',
        attributes: ['id', 'title', 'author', 'coverImageUrl']
      }
    });

    // 把每条收藏记录里的 Novel 实例抽出来
    const novels = favs.map(fav => fav.Novel || null).filter(n => n);
    res.json(novels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 新增收藏
exports.addFavorite = async (req, res) => {
  try {
    const novelId = req.params.novelId;
    const favorite = await Favorite.create({
      userId: req.user.id,
      novelId
    });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 取消收藏
exports.removeFavorite = async (req, res) => {
  try {
    const novelId = req.params.novelId;
    const favorite = await Favorite.findOne({
      where: { userId: req.user.id, novelId }
    });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    await favorite.destroy();
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
