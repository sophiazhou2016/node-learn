const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'WJiol_8776#'

// md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex') // 16进制
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

// const re = genPassword('123')
// console.log('re:', re)

module.exports = {
    genPassword
}