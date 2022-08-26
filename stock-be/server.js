const express = require('express');
// 初始化 dotenv
require('dotenv').config();
// 利用 express 這個框架/函式庫 來建立一個 web application
const app = express();

// 在程式碼中，不要讓某些常數散亂在專案的各處
// 至少在同一個檔案中，可以放到最上方統一管理
// 目標是: 只需要改一個地方，全部的地方就生效
// 降低漏改到的風險 -> 降低程式出錯的風險
const port = process.env.SERVER_PORT;

const cors = require('cors');
app.use(cors());

// 使用資料庫
// const mysql = require('mysql2/promise');  也可以使用
const mysql = require('mysql2');
let pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // 限制 pool 連線數的上限
    connectionLimit: 10,
  }).promise();

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

//API
app.get('/api/01/stocks',async (req, res, next)=>{
  // 取得 Array[0] 的兩種寫法
  
  // 1. let result =await pool.execute('SELECT * FROM stocks');
  // let data = result[0]

  // 2. ES6 寫法
  let [data] = await pool.execute('SELECT * FROM stocks');
  // console.log('result, data', data);
  res.json(data)
})



app.use((req, res, next) => {
  console.log('這是中間件 B');
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

// 啟動 server，並且開始 listen 一個 port
app.listen(port, () => {
  console.log(`server start at ${port}`);
});