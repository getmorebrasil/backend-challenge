const port = 3003
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dataBase = require('./dataBase')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/categories', (req, res) => {
    res.send(dataBase.getProducts())
})

app.get('/categories/:id', (req, res) => {
    res.send(dataBase.getProduct(req.params.id))
})

app.post('/categories', (req, res) => {
    try {
        const retorno = dataBase.saveProduct({
            id: req.body.id,
            name: req.body.name,
            childrenIds: req.body.childrenIds
        })
        if (retorno === 1) {
            res.send({
                "ok": true
            })
        } else if (retorno === 2){
            res.send({
                "ok": false,
                "error": "IdRepeated"
            })
        }
    }
    catch(e) {
        res.send({
            "ok": false,
            "error": "SavingError"
        })
    }
})



app.listen(port, () => {
    console.log('Servive running')
})
