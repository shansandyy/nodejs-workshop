const express = require('express');
const router = express.Router();

const pool = require('../utils/db');

//API
router.get('/',async (req, res, next)=>{
    // 取得 Array[0] 的兩種寫法
    
    // 1. let result =await pool.execute('SELECT * FROM stocks');
    // let data = result[0]
  
    // 2. ES6 寫法
    let [data] = await pool.execute('SELECT * FROM stocks');
    // console.log('result, data', data);
    res.json(data)
  })

  
  // 列出某個股票代碼的所有報價資料
  // GET /stocks/2330
  router.get('/:stockId',async (req, res, next) => {
    const stockId = req.params.stockId;
    // console.log(req.params)
    // stockId: '2330'
  
    //  去資料庫撈資料
    // let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=?', [stockId]);
    //  console.log(data)
  
  
    // perpage
    const perPage = 4;
  
    // page 
    const page = req.query.page || 1;
  
    // total
    let [total] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [stockId]);
    // console.log(total)
    total = total[0].total;
  
    // total page --> lastpage
    let lastPage =  Math.ceil(total/perPage);
  
    // offset -->跳過幾頁
    const offset = perPage * (page-1);
  
    let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?', [stockId, perPage, offset]);
  
    // 把取得的資料回覆給前端
    res.json({
      pagination: {
        total, // 總共有幾筆
        perPage, // 一頁有幾筆
        page, // 目前在第幾頁
        lastPage, // 總頁數
      },
      data,
    });
  });

  module.exports = router;
