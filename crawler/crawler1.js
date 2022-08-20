//1.下載npm i axios
//2.require 引用

//3.開始抓資料
const axios = require('axios');
axios
    .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220813&stockNo=2330&_=1660378514253')
    .then((response) => {
        // console.log(response);

        //抓取data
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });