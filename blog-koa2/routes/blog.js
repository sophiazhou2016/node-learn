const router = require('koa-router')()

router.prefix('/api/blog') // 前缀

router.get('/list', function (ctx, next) {
    const query = ctx.query
    ctx.body = {
        errno: 0,
        query,
        data: ['获取博客列表']
    }
})

module.exports = router
