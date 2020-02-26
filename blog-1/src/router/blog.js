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
        const listData = getList(author, keyword)

        return new SuccessModel(listData)
    }

    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id
        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }

    // 新建一篇博客
    if(method === 'POST' && path === '/api/blog/new') {
        console.log('req.body::', req.body)
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }

    // 更新一篇博客
    if(method === 'POST' && path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel('更新博客失败')
        }
    }

    // 删除一篇博客
    if(method === 'POST' && path === '/api/blog/del') {
        const result = delBlog(req.query.id)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel('删除博客失败')
        }
    }
}

module.exports = handleBlogRouter