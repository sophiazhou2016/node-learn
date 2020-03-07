const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONFIG)

// 开始你连接
con.connect()

// 统一执行sql的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                // console.log(err)
                reject(err)
                return
            }
            // console.log('result:', result)
            resolve(result)
        })
    })
    return promise
}

// 保持连接状态，不使用con.end()

module.exports = {
    exec
}