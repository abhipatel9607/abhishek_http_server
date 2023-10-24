//  Internal modules
const http = require("http")
const fs = require("fs")
const url = require("url")
const { v4: uuidv4 } = require('uuid'); //External Module

const PORT = 8082

// eslint-disable-next-line no-unused-vars
const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true)
    const pathParts = query.pathname.split("/");

    // 
    if (query.pathname === "/html") {
        res.writeHead(200, { "Content-Type": "text/html" })
        const readStream = fs.createReadStream("./files/index.html")
        readStream.pipe(res)
    }
    else if (query.pathname == "/json") {
        res.writeHead(200, { "Content-Type": "text/json" })
        const readStream = fs.createReadStream("./files/data.json")
        readStream.pipe(res)

    } else if (query.pathname == "/uuid") {
        // Generate a new UUID
        const uuid = uuidv4();

        // Set the response content type and send the UUID
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ "uuid": uuid }));

    } else if (pathParts.length === 3 && pathParts[1] === "status") {
        const statusCode = parseInt(pathParts[2]);
        if (isNaN(statusCode)) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid status code");
        } else {
            res.writeHead(statusCode, { "Content-Type": "text/plain" });
            res.end(`Response with status code: ${statusCode}`);
        }
    } else if (pathParts[1] === "delay") {
        const delay = parseInt(pathParts[2]);
        if (isNaN(delay)) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid delay value");
        } else {
            setTimeout(() => {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(`Response delay in : ${delay} second with status code: 200 `);
            }, delay * 1000);
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("Not Found")
        // console.log("err");

    }


}).listen(PORT)
console.log("Server Running on Port: 8082");
