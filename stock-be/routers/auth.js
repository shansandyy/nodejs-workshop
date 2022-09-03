const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../utils/db');

router.post('/api/1.0/auth/register',async (req, res, next) => {
    // TODO: 確認資料有沒有收到
    // console.log('register', req.body);

    // TODO:檢查 email 有沒有重複
    let [member] = await pool.execute('SELECT * FROM members WHERE email=?', [req.body.email]);
    // console.log(member.length);
    if(member.length === 0){
        // 等於0,表示尚未被註冊,故寫入資料庫
        // TODO:密碼要雜湊 hash
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashedPassword)

        // TODO:資料存到資料庫
        let result = await pool.execute('INSERT INTO members (email, password, name) VALUES (?, ?, ?)', [req.body.email, hashedPassword, req.body.name]);
        console.log(result);

        // TODO:回覆前端
        res.json({ message: 'ok' });
    }else{
        // TODO:email --> 如果有回覆400 及錯誤訊息
        // >0,表示已被註冊過
        return res.status(400).json({ message: '這個 email 已經註冊過' });
    }
    
    res.json({});
});

module.exports = router;