// Express backend entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 引入路由
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const novelRoutes = require('./routes/novelRoutes');
app.use('/api/novels', novelRoutes);

const tagRoutes = require('./routes/tagRoutes');
app.use('/api/tags', tagRoutes);

const favoriteRoutes = require('./routes/favoriteRoutes');
app.use('/api/favorites', favoriteRoutes);

// 測試保護路由（需要登入）
const authenticateToken = require('./middleware/authMiddleware');
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You have access!', user: req.user });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
