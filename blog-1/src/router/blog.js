const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
    const id = req.query.id

    const path = req.path

    // 获取博客列表
    if(method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        const result = getList(author, keyword)
        return result.then(listData => {
            console.log('router listData:', listData)
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id
        // const detailData = getDetail(id)
        const result = getDetail(id)
        return result.then(detailData => {
            return new SuccessModel(detailData)
        })
    }

    // 新建一篇博客
    if(method === 'POST' && path === '/api/blog/new') {
        // console.log('req.body::', req.body)
        // const data = newBlog(req.body)
        // return new SuccessModel(data)
        req.body.author = 'zhangsan' // 假数据，待开发登录时再改成真是数据
        const result = newBlog(req.body)
        return result.then( data => {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if(method === 'POST' && path === '/api/blog/update') {
        return updateBlog(id, req.body).then(val => {
            if(val) {
                return new SuccessModel()
            }else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    // 删除一篇博客
    if(method === 'POST' && path === '/api/blog/del') {
        const author = 'zhangsan' // 假数据，待登录后修改成真实数据
        const result = delBlog(req.query.id, author)
        return result.then(val => {
            console.log('delBlog:', val)
            if(val) {
                return new SuccessModel()
            }else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter