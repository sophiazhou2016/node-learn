const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

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
    console.log('its cookies:', req.cookie)

    // 处理 post data
    getPostData(req).then(postData => {
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