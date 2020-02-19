const { add, mult } = require('./test')
const _ = require('lodash')

const sum = add(1, 5)
const result = mult(100, 20)

console.log('sum:', sum)
console.log('result:', result)

const arr = _.concat([1, 2, 3], 4)
console.log('arr...', arr)