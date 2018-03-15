var express = require('express')
var path = require('path')
var chalk = require('chalk')
var bodyParser = require('body-parser')

var app = express()

var users = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', function (req, res, next) {
  console.log(chalk.default.red('request'))
  next()
})
app.use(express.static('static'))

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get('/users', function (_, res) {
  res.send(users)
})

app.post('/users', function (req, res) {
  var newUser = Object.assign({}, req.body)
  users.push(newUser)
  res.send(newUser)
})

app.listen(3000)
