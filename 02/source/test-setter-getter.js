const k = {
    info: {
        name: '我是名字'
    },
    get name() {
        return this.info.name
    },
    set name(val) {
        console.log('name is ' + val)
        this.info.name = val
    }
}

console.log('1x: ', k.name)
k.name = 'Alsa'
console.log('2x: ', k.name)
