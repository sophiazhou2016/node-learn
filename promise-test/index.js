const fs = require('fs')
const path = require('path')



// callback 方式获取一个文件的内容
// function getFileContent(filename, callback) {
//     const fullFileName = path.resolve(__dirname, 'files', filename)
//     // 读取文件，异步
//     fs.readFile(fullFileName, (err, data) => {
//         if(err) {
//             console.log(err)
//             return
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// // 测试 callback-hell
// getFileContent('a.json', aData => {
//     console.log('aData:', aData)
//     getFileContent(aData.next, bData => {
//         console.log('bData:', bData)
//         getFileContent(bData.next, cData => {
//             console.log('cData:', cData)
//         })
//     })
// })

// 用promise获取文件内容
function getFileContent(filename) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', filename)
        // 读取文件，异步
        fs.readFile(fullFileName, (err, data) => {
            if(err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

// getFileContent('a.json').then(aData => {
//     console.log('aData', aData)
//     return getFileContent(aData.next)
// }).then(bData => {
//     console.log('bData', bData)
//     return getFileContent(bData.next)
// }).then(cData => {
//     console.log('cData', cData)
// })

// async await
// koa2
// 同步语法
async function readFileData() {
    // 1. await 紧跟一个promise
    // 2. await 前面需要async
    try {
        const aData = await getFileContent('a.json')
        console.log('aData:', aData)
        const bData = await getFileContent(aData.next)
        console.log('bData:', bData)
        const cData = await getFileContent(bData.next)
        console.log('cData:', cData)
    }catch(err) {
        console.error(err)
    }
}

readFileData()

// 返回的还是一个promise
// async function readAData() {
//     const aData = await getFileContent('a.json')
//     console.log('aData:', aData)
//     return aData
// }

// async function test() {
//     const aData = await readAData()
//     console.log('aData:', aData)
// }
// test()

// async await 要点
// 1. await 后面可以追加 promise 对象，获取 resolve 的值
// 2. await 必须包裹在 async 函数里面
// 3. await 函数执行返回的也是一个 promise 对象
// 4. try-catch 截获 promise 中 reject 的值
