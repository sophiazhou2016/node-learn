const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const open = require('open')

const log = content => console.log(chalk.green(content))
const { clone } = require('./download')

const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    // 打印欢迎界面
    clear()

    const data = await figlet('Vax welcome')
    log(data)

    log(`🚀创建项目：${name}`)
    await clone('github:su37josephxia/vue-template', name)

    log('安装依赖')
    await spawn('npm', ['install'], { cwd: `./${name}` })
    // cwd: Current working directory of the child process

    log(`
        👌安装完成：
        To get Start:
        ===========================
            cd ${name}
            npm run serve
        ===========================
                    `)
    
    // 打开浏览器
    await open('http://localhost:8080/')
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}