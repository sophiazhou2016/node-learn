const xss = require('xss')
const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    // 先返回假数据，但格式是正确的
    let sql =  `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += 'order by createtime desc'

    // 返回promise
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData 是一个对象，包含 title content author 属性
    const title = xss(blogData.title)
    console.log('title is:', title)
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()

    const sql = `insert into blogs(title, content, author, createtime)
        values ('${title}', '${content}', '${author}', ${createtime})
    `
    return exec(sql).then(insertData => {
        // console.log('insertData:', insertData)
        return {
            id: insertData.insertId
        }
    })
    // return {
    //     id: 3 // 表示新建博客，插入到表里面的 id
    // }
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新的博客id
    // blogData 是一个对象，包含 title content 属性
    console.log('updateBlog,', id, blogData)
    const title = blogData.title
    const content = blogData.content
    const sql = `update blogs set title='${title}', content='${content}' 
        where id='${id}'
    `
    return exec(sql).then(updateData => {
        console.log('updateData: ', updateData)
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
    // return true
}

const delBlog = (id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from blogs where id='${id}' and author='${author}'`
    return exec(sql).then(deleteData => {
        if(deleteData.insertData > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}