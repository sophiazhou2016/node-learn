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

module.exports = {
    getList,
    getDetail
}