require('dotenv').config();

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

    // 日期保持 string ，不要轉為 js 的 data格式
    dateStrings : true,
  }).promise();

  module.exports = pool;