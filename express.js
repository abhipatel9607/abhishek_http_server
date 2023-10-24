// Module Import
const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
const path = require('path')



app.get('/html', (req, res) => {
    res.sendFile(path.resolve("./files/index.html"));
});

app.get('/json', (req, res) => {
    res.sendFile(path.resolve("./files/data.json"));
});

app.get('/uuid', (req, res) => {
    const uuid = uuidv4();
    res.send(JSON.stringify({ "uuid": uuid }))
});

app.get('/status/:code', (req, res) => {
    const code = req.params.code
    res.status(parseInt(code)).send("The Response code is " + code)
});

app.get('/delay/:second', (req, res) => {
    const second = req.params.second
    setTimeout(() => {
        res.status(200).send(`Response delay in : ${second} second with status code: 200 `)
    }, parseInt(second) * 1000)
});

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});