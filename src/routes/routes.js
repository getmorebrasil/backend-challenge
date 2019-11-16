const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')

router.post('/', async (req, res) => {
    await controller.insertCategorie(req, res)
})

router.get('/', async (req, res) => {
    await controller.getAllCagetories(req, res)
})

router.get('/:id', async (req, res) => {
    await controller.getCategorieById(req, res)
})

module.exports = app => app.use('/categories', router)