(async() => {
    const Sequelize = require('sequelize')

    // 建立链接
    const sequelize = new Sequelize('myblog', 'root', 'Aa123456', {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        operatorAliases: false
    })

    // 定义模型
    const Fruit = sequelize.define('Fruit', {
        name: { type: Sequelize.STRING(20), allowNull: false },
        price: { type: Sequelize.FLOAT, allowNull: false },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    })

    // 同步
    let ret = await Fruit.sync()
    console.log('ret 1:', ret)

    // 添加
    ret = await Fruit.create({
        name: '香蕉',
        price: 3.5
    })
    console.log('ret 2:', ret)

    // 查询
    ret = await Fruit.findAll()
    console.log('ret 3:', JSON.stringify(ret))

    // 更新
    await Fruit.update({
        price: 4
    }, {
        where: {
            name: '香蕉'
        }
    })

    const Op = Sequelize.Op
    ret = await Fruit.findAll({
        where: {
            price: {
                [Op.lt]: 5,
                [Op.gt]: 3
            }
        }
    })
    console.log('ret 3:', JSON.stringify(ret, null, 4))

})()