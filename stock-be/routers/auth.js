const express = require('express');
const router = express.Router();

router.post('/api/1.0/auth/register',(req, res, next) => {
    // 確認資料有沒有收到
    console.log('register', req.body);
    // 檢查 email 有沒有重複 --> 如果有回覆400 及錯誤訊息
    // 密碼要雜湊 hash
    // 資料存到資料庫
    // 回覆前端
    res.json({});
});

module.exports = router;