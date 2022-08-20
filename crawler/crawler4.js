// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');

(async () => {
  try {
    let stockNo = await fs.readFile('stock.txt', 'utf8');
    
    //https://www.twse.com.tw/zh/api/codeQuery?query=2330
    let queryNameResponse = await axios.get(` https://www.twse.com.tw/zh/api/codeQuery`, {
      params: {
        query: stockNo
      },
    });
    let suggestions = queryNameResponse.data.suggestions;
    let suggestion = suggestions[0];
    // console.log('suggestions.first',suggestion);
    
    if(suggestion === "(無符合之代碼或名稱)") {
      console.error(suggestion);
      throw new Error(suggestion);
    }

    //透過 split() 轉為陣列, pop()取得最後一筆 --> 用 [1] 若陣列改變容易取得錯誤資料 
    let stockName = suggestion.split('\t').pop();
    console.log('stockNo & stockName', stockNo, stockName);

    let queryDate = moment().format('YYYYMMDD'); //'20220814';
    let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      }
    })
    console.log(response.data);
    
  } catch (e) {
    console.error(e);
  }
})();


