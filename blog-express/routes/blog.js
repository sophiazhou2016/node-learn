var express = require('express');
var router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', function(req, res, next) {
    // res.json: 的作用 1. 直接转成json字符;2. 自动设置了content-type就是 application/json
    // res.json({
    //     errno: 0,
    //     data: [1, 2, 3]
    // });
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    // if(req.query.isadmin) {
    //     // 管理员界面
    //     const loginCheckResult = loginCheck(req)
    //     console.log(3, loginCheckResult)
    //     if(loginCheckResult) {
    //         // 未登录
    //         return loginCheckResult
    //     }
    //     // 强致查询自己的博客
    //     author = req.session.username
    // }
    const result = getList(author, keyword)
    return result.then(listData => {
        console.log('router listData:', listData)
        res.json(
            new SuccessModel(listData)
        )
    })
});

router.get('/detail', function(req, res, next) {
    res.json({
        errno: 0,
        data: 'OK'
    });
});

module.exports = router;
