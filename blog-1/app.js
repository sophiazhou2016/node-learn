const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { set, get } = require('./src/db/redis')

// 获取session过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is:', d.toGMTString())
    return d.toGMTString()
}
// session 数据
// const SESSION_DATA = {}



// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        console.log('req.headers---', req.headers)
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    res.setHeader('content-type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0]
        const value = arr[1]
        req.cookie[key] = value
    })

    // 解析session
    // let needSetCookie = false
    // let userId = req.cookie.userid
    // if (userId) {
    //     console.log('SESSION_DATA:', SESSION_DATA)
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     // 第一次没有userid
    //     // 标记需要设置cookie
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}` // userId随机赋值
    //     SESSION_DATA[userId] = {}
    // }
    // // login之后设置了session，就是设置了SESSION_DATA[userId]
    // req.session = SESSION_DATA[userId]

    // 解析 session (使用redis)
    let needSetCookie = false
    let userId = req.cookie.userid
    if(!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}` // userId随机赋值
        // 初始化 redis中的session值
        set(userId, {})
    }
    // 获取session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if(sessionData === null) {
            // 初始化 redis中的session值
            set(req.sessionId, {})
            // 设置session
            req.session = {}
        } else {
            req.session = sessionData
        }
        console.log('req.session:', req.session)
        // 处理 post data
        return getPostData(req)
    })
    .then(postData => {
        req.body = postData
        // 处理blog路由
        // const blogData = handleBlogRouter(req, res)
        // if(blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
        const blogResult = handleBlogRouter(req, res)
        if(blogResult) {
            blogResult.then(blogData => {
                // 第一次设置cookie
                if(needSetCookie) {
                    res.setHeader('Set-cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                console.log('blogData:', JSON.stringify(blogData))
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理user路由
        const userResult = handleUserRouter(req, res)
        if(userResult) {
            userResult.then(userData => {
                if(needSetCookie) {
                    res.setHeader('Set-cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 未命中路由， 返回 404
        res.writeHead(404, {"content-type": "text/plain"}) // 纯文本
        res.write("404 Not Found\n")
        res.end()
    })

    
}

module.exports = serverHandle

// process.env.NODE_ENV