const express = require('express');
const cors = require('cors');
const db = require('./models');              // 引入 Sequelize 实例
const app = express();
const PORT = process.env.PORT || 3001; // 与前端 Vite 代理端口保持一致
const novelRouter = require('./routes/novels');
const chapterRouter = require('./routes/chapters');

// 允许来自 Vite 开发服务器的跨域请求
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use('/api/novels', novelRouter);
// 这里挂载章节路由
app.use('/api/novels/:id/chapters', chapterRouter);

// 同步模型到数据库后再启动服务
db.sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });