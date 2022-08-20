//await 版本
//更好的參數設定

const axios = require('axios');

let stockNo = 2330;
let queryDate = '20220814';

    (async ()=>{
        try{
            let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`,{
                params: {
                    response: 'json',
                    date: queryDate,
                    stockNo: stockNo,
                },
            });
            console.log(response.data);
        }catch (e) {
            console.error(e);
        }
    })()