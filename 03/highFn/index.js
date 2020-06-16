const add = (x, y) => x + y
console.log(`add: ${add(1, 2)}`)

// 高阶函数
// 1. 接受参数为函数
// 2. 返回参数为函数

// const format = fn => (...args) => `[${fn(...args)}]`
// const myAdd = format(add)
// console.log(`format:${myAdd(2, 3)} `)

const format = (front, end) => fn => (...args) => `${front}${fn(...args)}${end}`
const myAdd = format('【', '】')(add)
console.log(`format: ${myAdd(3, 4)}`)