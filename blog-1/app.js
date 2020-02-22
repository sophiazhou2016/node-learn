const serverHandle = (req, res) => {
    res.setHeader('content-type', 'application/json')

    const resData = {
        name: '楚玉100',
        site: 'ppd',
        env: process.env.NODE_ENV
    }

    res.end(
        JSON.stringify(resData)
    )
}

module.exports = serverHandle