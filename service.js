const port = 3003
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dataBase = require('./dataBase')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/categories', (req, res) => {
    try {
        res.send(dataBase.getProducts())
    } catch(e) {
        res.send("Error. Try again")
    }
})

app.get('/categories/:id', (req, res) => {
    try {
        res.send(dataBase.getProduct(req.params.id))
    } catch(e) {
        res.send("Error. Try again")
    }
})

app.post('/categories', (req, res) => {
    try {
        const flag = dataBase.saveProduct({
            id: req.body.id,
            name: req.body.name,
            childrenIds: req.body.childrenIds
        })
        if (flag === "ok") {
            res.send({
                "ok": true
            })
        } else {
            res.send({
                "ok": false,
                "error": flag
            })
        }
    } catch(e) {
        res.send({
            "ok": false,
            "error": "SavingError"
        })
    }
})

app.listen(port, () => {
    console.log('Service running')
})
