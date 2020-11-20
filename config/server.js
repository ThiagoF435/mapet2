var express = require('express')
var consign = require('consign')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var session = require('express-session')

var app = express()
app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(expressValidator())

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

consign()
    .include('app/routes')
    .then('config/databaseConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app
