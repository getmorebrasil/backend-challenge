const express = require('express')
const router = express.Router()
const Categorie = require('../model/Categories')

router.post('/', async (req, res) => {
    console.log('test')
    const categorie = new Categorie({
        id: req.body.id,
        name: req.body.name,
        childrenIds: req.body.childrenIds
    })
    
    try {
        const savedCategorie = await categorie.save()
        res.json(savedCategorie)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = app => app.use('/categories', router)