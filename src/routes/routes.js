const express = require('express')
const router = express.Router()
const Categorie = require('../model/Categories')

async function verifyChildrenIds(childrenIds) {
    console.log(childrenIds.length)
    let allExists = true
    for (let index = 0; index < childrenIds.length; index++) {
        let id = childrenIds[index]
        if (await Categorie.findOne({ id : id }) === null) {
            console.log(`ERROR, The children with ${id} not exist`)
            allExists = false
        }
    }
    console.log(`OK, all children exists`)
    return allExists
}

async function verifyId(id) {
    if (await Categorie.findOne({ id }) === null) {
        console.log(`OK, The category with ${id} not exist`)
        return true
    } else {
        console.log(`ERROR, The category with ${id} exist`)
        return false
    }
}

router.post('/', async (req, res) => {

    const id = req.body.id
    const childrenIds = req.body.childrenIds

    if (await verifyId(id) && await verifyChildrenIds(childrenIds)) {
        try {
            
            const categorie = new Categorie({
                id: req.body.id,
                name: req.body.name,
                childrenIds: req.body.childrenIds
            })

            await categorie.save()
            res.status(201).json({ ok: true })
        } catch (err) {
            res.json({ message: err })
        }
    } else {
        res.json({ ok : false, error : "InvalidCategories" })
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