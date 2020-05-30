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
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
    // res.json: 的作用 1. 直接转成json字符;2. 自动设置了content-type就是 application/json
    // res.json({
    //     errno: 0,
    //     data: [1, 2, 3]
    // });
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if(req.query.isadmin) {
        // 管理员界面
        if(req.session.username === null) {
            // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        // 强致查询自己的博客
        author = req.session.username
    }
    const result = getList(author, keyword)
    return result.then(listData => {
        console.log('router listData:', listData)
        res.json(
            new SuccessModel(listData)
        )
    })
});

router.get('/detail', (req, res, next) => {
    const id = req.query.id
    // const detailData = getDetail(id)
    const result = getDetail(id)
    return result.then(detailData => {
        res.json(
            new SuccessModel(detailData)
        )
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username // 假数据，待开发登录时再改成真是数据
    const result = newBlog(req.body)
    return result.then( data => {
        res.json(new SuccessModel(data))
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    return updateBlog(req.query.id, req.body).then(val => {
        if(val) {
            res.json(new SuccessModel())
        }else {
            res.json(new ErrorModel('更新博客失败'))
        }
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username;
    const result = delBlog(req.query.id, author)
    console.log('author: ', author, result);
    return result.then(val => {
        console.log('del:val:', val);
        if(val) {
            res.json(new SuccessModel())
        }else {
            res.json(new ErrorModel('删除博客失败'))
        }
    })
})
module.exports = router;
