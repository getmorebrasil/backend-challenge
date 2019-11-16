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
        await categorie.save()
        res.status(201).json({ ok: true })
    } catch (err) {
        res.json({ message: err })
    }
})

const filterResult = '-_id -__v'

router.get('/', async (req, res) => {
    try {
        const allCategories = await Categorie.find({}).select(filterResult).sort({ 'id' : -1})
        res.json(allCategories)
    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const OneCategorie = await Categorie.findOne({ id : req.params.id }).select(filterResult)
        res.json(OneCategorie)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = app => app.use('/categories', router)