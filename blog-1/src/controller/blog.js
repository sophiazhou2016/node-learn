const getList = (author, keyword) => {
    // 先返回假数据，但格式是正确的
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 15637635675735,
            author: 'zhangsan'
        },{
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1367657656755,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 15637635675735,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个对象，包含 title content 属性
    // console.log('newBlog blogData...', blogData)
    return {
        id: 3 // 表示新建博客，插入到表里面的 id
    }
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新的博客id
    // blogData 是一个对象，包含 title content 属性
    console.log('updateBlog,', id, blogData)
    return true
}

const delBlog = (id) => {
    // id 就是要删除博客的 id
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}