var express = require('express')
var path = require('path')
var chalk = require('chalk')
var bodyParser = require('body-parser')

var app = express()

var users = []

function generateGUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0
    var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function addFakeDelay (callback) {
  setTimeout(callback, 1000)
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', function (req, res, next) {
  console.log(chalk.bgHex('#125c00')(req.method) + ' ' + chalk.bgBlue(req.url))
  for (var i = 0; i < req.rawHeaders.length; i += 2) {
    console.log(chalk.bgMagenta(req.rawHeaders[i] + ': ' + req.rawHeaders[i + 1]))
  }
  console.log(chalk.yellow(JSON.stringify(req.body, null, 2)))
  console.log()
  next()
})
app.use(express.static('static'))

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get('/users', function (_, res) {
  addFakeDelay(function () {
    res.send(users)
  })
})

app.post('/users', function (req, res) {
  addFakeDelay(function () {
    // User entity validation
    const age = +req.body.age
    if (isNaN(age) || age < 1) {
      res.statusCode = 400
      res.send({
        error: 'Age is empty or invalid'
      })
      return
    }

    const name = req.body.name
    if (!name) {
      res.statusCode = 400
      res.send({
        error: 'Name is required'
      })
      return
    }

    var newUser = Object.assign({
      id: generateGUID(),
      name,
      age
    }, req.body)

    users.push(newUser)
    res.send(newUser)
  })
})

app.delete('/users/:id', function (req, res) {
  addFakeDelay(function () {
    var userToDeleteIndex = users.findIndex(function (user) {
      return user.id === req.params.id
    })

    if (userToDeleteIndex < 0) {
      res.statusCode = 404
      res.send()
      return
    }

    users.splice(userToDeleteIndex, 1)
    res.send()
  })
})

app.listen(3000)
