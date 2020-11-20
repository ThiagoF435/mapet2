var app = require('./config/server')
var express = require('express')
var fs = require('fs')
var http = require('http')
var https = require('https')

app.listen(process.env.PORT, function() {
    console.log('Server on!')
})