const router = require('koa-router')()

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog') // 前缀

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''

    if(ctx.query.isadmin) {
        console.log('is admin');
        // 管理员界面
        if(ctx.session.username === null) {
            console.error('is admin, not login')
            // 未登录
            ctx.body = new ErrorModel('未登录')
            return
        }
        // 强致查询自己的博客
        author = ctx.session.username
    }
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
    const id = ctx.query.id
    const detailData = await getDetail(id)
    ctx.body = new SuccessModel(detailData)
});

router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body
    ctx.body.author = ctx.session.username // 假数据，待开发登录时再改成真是数据
    const data = await newBlog(body)
    ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async (ctx, next) => {
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if(val){
        ctx.body = new SuccessModel()
    }else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})

router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const val = await delBlog(ctx.query.id, author)
    if(val) {
        ctx.body = new SuccessModel()
    }else {
        ctx.body = new ErrorModel('删除博客失败')
    }
})

module.exports = router
