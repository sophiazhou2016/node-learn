var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
    // res.json: 的作用 1. 直接转成json字符;2. 自动设置了content-type就是 application/json
    res.json({
        errno: 0,
        data: [1, 2, 3]
    });
});

router.get('/detail', function(req, res, next) {
    res.json({
        errno: 0,
        data: 'OK'
    });
});

module.exports = router;
