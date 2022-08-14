// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');



(async () => {
  try {
    let stockNo = await fs.readFile('stock.txt', 'utf8');
    let queryDate = moment().format('YYYYMMDD'); //'20220814';
    
    // https://www.twse.com.tw/zh/api/codeQuery?query=2330
    let queryNameResponse = await axios.get(` https://www.twse.com.tw/zh/api/codeQuery`, {
      params: {
        query: stockNo
      },
    });
    let suggestions = queryNameResponse.data.suggestions;
    let suggestion = suggestions[0];
    // console.log('first', suggestion);
    if (suggestion === '(無符合之代碼或名稱)') {
        console.error(suggestion);
        throw new error(suggestion);
    }
    let stockName = suggestion.split('\t').pop();
    // console.log(stockName[1]);
    console.log(stockName);

    // console.log(queryNameResponse.data);
  } catch (e) {
    console.error(e);
  }
})();


