const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    const path = req.path

    if(method === 'POST' && path === '/api/user/login') {
        return {
            msg: '这是登录的接口'
        }
    }
}

module.exports = handleUserRouter