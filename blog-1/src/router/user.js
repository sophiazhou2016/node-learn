const loginCheck = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    const path = req.path
    console.log('111')
    if(method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body
        console.log(1)
        const result = loginCheck(username, password)
        return result.then(data => {
            console.log('data:', data)
            if(data.username) {
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }
}

module.exports = handleUserRouter