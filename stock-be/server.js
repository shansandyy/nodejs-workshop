// router: mini app
const express = require('express');

// 初始化 dotenv
require('dotenv').config();
// 利用 express 這個框架/函式庫 來建立一個 web application
const app = express();

// 在程式碼中，不要讓某些常數散亂在專案的各處
// 至少在同一個檔案中，可以放到最上方統一管理
// 目標是: 只需要改一個地方，全部的地方就生效
// 降低漏改到的風險 -> 降低程式出錯的風險
// 用 || 預設port
const port = process.env.SERVER_PORT  || 3001;

// 允許跨源(ex: fe port3000 要對 be port3001)
// 只有後端可以允許
// npm i cors  -->  第三方提供的 cors 中間件
// 是瀏覽器鎖住
// Access-Control-Allow-Origin: * --> *表示所有前端都可以打
const cors = require('cors');
app.use(cors());

// 使用情境: 當前後端網址不同時，只想允許自己的前端來跨源存取
//          就可以利用 origin 這個設定來限制，不然預設是 * (全部)
// const corsOptions = {
//   origin: ['http://localhost:3000'],
// };
// app.use(cors(corsOptions));

// 引用 server 需要的資料庫模組
const pool = require('./utils/db');

// 要讓 express 認得json，要用這個中間件(post)
app.use(express.json());

// 一般的 middleware
app.use((req, res, next) => {
  console.log('這是中間件 A');
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

app.use((req, res, next) => {
  console.log('這是中間件 C');
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

// app.[method]
// method: get, post, delete, put, patch, ...
// GET /
app.get('/', (req, res, next) => {
  console.log('這裡是首頁');
  res.send('Hello Express');
});

// 引用 stocks
let stockRouter = require('./routers/stocks');
app.use('/api/1.0/stocks', stockRouter);

// 引用 auth
let authRouter = require('./routers/auth');
app.use(authRouter);

app.use((req, res, next) => {
  console.log('這是中間件 B');
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

// 啟動 server，並且開始 listen 一個 port
app.listen(port, () => {
  console.log(`server start at ${port}`);
});