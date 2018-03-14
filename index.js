var express = require('express')
var path = require('path')

var app = express()

app.get('/', function (_, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.listen(3000)
