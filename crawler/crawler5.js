// 用 axios 去目標 API 抓資料
// await 版本
// 更好的參數設定
// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
// 查到股票代碼的中文名稱
// 存到 db
const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');

// 利用 mysql2 這個套件來存取資料庫
// 還有一個套件叫 mysql，但這比較舊，建議用 mysql2
// mysql 沒有提供 promise 版本，還是 callback，可以用來練習包 promise
const mysql = require('mysql2');

// 帳號密碼不可以寫死在程式碼中、更不可以推上 github
// 利用 dotenv 來處理
// 1. 建立一個 .env 檔案，裡面寫好環境設定
// 2. 利用 dotenv 讀進程式裡來（以下這行）
require('dotenv').config();

// 開始抓資料
// 2330 台積電
// 2603 長榮
// axios.get(url, 設定)
(async () => {
  // let, const:  block scope {}
  // var: function scope
  let connection;
  try {
    // access deny: 通常是帳號密碼不對
    // connection 失敗: 通常是 host/port 設錯、或是 mysql 根本沒開好
    // 如果有連不上的情況，要檢查:
    // 1. 到底有沒有讀到這個變數
    // 2. 到底讀到什麼？
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // 需要從 stock.txt 的檔案裡讀取股票代碼
    let stockNo = await fs.readFile('stock.txt', 'utf-8'); // 2603, 2330

    // 去查詢股票代碼的中文名稱
    // https://www.twse.com.tw/zh/api/codeQuery?query=2330
    let queryNameResponse = await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
      params: {
        query: stockNo,
      },
    });

    // console.log(queryNameResponse.data);
    let suggestions = queryNameResponse.data.suggestions;
    let suggestion = suggestions[0];
    if (suggestion === '(無符合之代碼或名稱)') {
      console.error(suggestion);
      throw new Error(suggestion);
    }
    let stockName = suggestion.split('\t').pop();
    // console.log('stockName & stockNo', stockName, stockNo);
    // INSERT INTO stocks (id, name) VALUES ('2330', '台積電')
    // 自己串 sql 字串: 容易出錯、有資訊安全上的風險 sql injection
    // connection.query
    let saveNameResult = connection.execute(`INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)`, [stockNo, stockName]);
    // console.log(saveNameResult);
    let queryDate = moment().format('YYYYMMDD'); //'20220814';
    let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    });
    // console.log(response.data);

    //
    let data = response.data.data.map((d) => {
      d = d.map((value) => {
        // return value.split(',').join("");
        return value.replace(/,/g, '');
      });

      // d[0] = Number(d[0].split('/').join("")) + 19110000;
      d[0] = parseInt(d[0].replace(/\//g, ''), 10) + 19110000;
      // 加 10 進位
      d.unshift(stockNo);
      return d;
    })
    // console.log(data);

    let savePriceResult = await connection
      .promise()
      .query('INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?', [data]);
    console.log(savePriceResult);

  } catch (e) {
    console.error(e);
  } finally {
    if (connection) {
      // 關掉連線
      connection.end();
    }
  }
})();