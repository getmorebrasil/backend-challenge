const port = 3003
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dataBase = require('./dataBase')

app.get('/categories/:id', (req, res, next) => {
    res.send(dataBase)
})


