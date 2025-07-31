const { Favorite } = require('../models');

// 取得目前使用者所有收藏
exports.getMyFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({ where: { userId: req.user.id } });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 新增收藏
exports.addFavorite = async (req, res) => {
  try {
    const novelId = req.params.novelId;
    const favorite = await Favorite.create({ userId: req.user.id, novelId });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 取消收藏
exports.removeFavorite = async (req, res) => {
  try {
    const novelId = req.params.novelId;
    const favorite = await Favorite.findOne({ where: { userId: req.user.id, novelId } });
    if (!favorite) return res.status(404).json({ message: 'Favorite not found' });

    await favorite.destroy();
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
