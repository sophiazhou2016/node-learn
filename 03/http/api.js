 
// /http/api.js
const http = require("http");
const fs = require("fs");
http
    .createServer((req, res) => {
        const { method, url } = req;
        console.log('method:', method, '; url:', url);

        // 观察cookie
        console.log('cookie:', req.headers.cookie)
        if (method == "GET" && url == "/") {
            fs.readFile("./index.html", (err, data) => {
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            });
        } else if (method == "GET" && url == "/api/users") {
            // CROS
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader("Content-Type", "application/json");
            // 设置cookie
            res.setHeader('Set-Cookie', 'cookie1=va222;')
            res.end(JSON.stringify([{ name: "tom", age: 20 }]));
            
        } else if (method === 'OPTIONS' && url === '/api/users') {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Headers": "X-Token,Content-Type",
                "Access-Control-Allow-Methods": "PUT"
            })
            res.end()
        }
    })
    .listen(4000, () => {
        console.log('api listen at ' + 4000)
    });