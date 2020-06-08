// 创建一个长度为10字节以0填充的Buffer
// 两位16进制代表一个字节
// 一位 ： bit ，其中每一个逻辑0或者1便是一个位
// 字节 ： byte， 一个字节有 8位
// 16个位为一个字
// 通常称16位是一个字，而32位呢，则是一个双字，64位是两个双字
const buf1 = Buffer.alloc(10)
console.log('buf1:', buf1)

const buf2 = Buffer.from('a')
console.log('buf2:',buf2) // <Buffer 61> a 的ASCII

// UFT-8:一种变长的编码方案，使用 1~6 个字节来存储;
const buf3 = Buffer.from('汉')
console.log('buf3:', buf3)

const buf4 = Buffer.concat([buf2, buf3])
console.log('buf4:', buf4, buf4.toString())