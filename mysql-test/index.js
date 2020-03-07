const mysql = require('mysql')

// 穿件连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aa123456',
    port: 3306,
    database: 'myblog'
})

// 开始连接
con.connect()

// 执行sql语句
// const sql = 'select * from users;'
// const sql = `update users set realname='阿显' where username='lisi';`
const sql = `insert into blogs(title, content, createtime, author) values ('标题C', '内容C', 154654656256, 'axian');`
con.query(sql, (err, result) => {
    if(err) {
        console.log(err)
        return
    }
    console.log('result:', result)
})

con.end()
