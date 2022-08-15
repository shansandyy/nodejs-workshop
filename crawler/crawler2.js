//await 版本
//更好的參數設定

const axios = require('axios');
let stockNo = 2330;
let queryDate = '20220814';

axios
    .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220813&stockNo=2330&_=1660378514253')
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });