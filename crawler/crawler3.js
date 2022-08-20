// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
//    下載npm i moment
// 2. 從檔案中讀取股票代碼
const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');

(async () => {
  try {
    let stockNo = await fs.readFile('stock.txt', 'utf-8');
    let queryDate = moment().format('YYYYMMDD'); //'20220814' 自動取得當日日期，並可修改格式.format('YYYY/MM/DD');
    // console.log(queryDate);
    let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
})();


