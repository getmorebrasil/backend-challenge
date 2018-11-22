const express = require('express');

const Category = require('../models/category');

const router = express.Router();


// Rota POST para criar uma nova categoria

router.post('/', async (req, res) => {

    const { id } = req.body;

    try {

        // Checking if Id of category already exists
        if (await Category.findOne({ id })) {
            return res.status(400).send({
                'ok': false,
                'error': 'Id already exists'
            });
        } else {
            return checkChildrenIds(req, res);
        }

    } catch (e) {
        return res.status(400).send({ 'ok' : false })
    }
});


// Verifica se os Ids do 'Children' existem

function checkChildrenIds(req, res) {
    const childrenId = req.body.childrenIds;

    Category.find({ 'id' : childrenId}).then(function(categories){

        if (Object.keys(categories).length === Object.keys(childrenId).length) {
            insertNewCategoryInBD(req, res);
        } else {
            return res.status(400).send({
                "ok": false,
                "error": "InvalidCategories"
            });
        }
    });
}

// Insere uma nova categoria no Banco de Dados

function insertNewCategoryInBD(req, res) {
    const category = Category.create(req.body);
    return res.status(201).send({'ok': true});
}

// Retorna uma lista com todas as categorias registradas.

router.get('/', (req, res) => {
    Category.find({}, { '__v' : 0 })
        .sort({ 'id' : 1 })
        .then(function(categories) {

            res.send({ Categories : categories });
        });
});


//  Retorna os dados da categoria com o id passado.

router.get('/:id', function(req, res) {
    Category.find({ 'id' : req.params.id },
        { '__v' : 0 })
        .then(function(category) {
            res.send(category);
        });
});

module.exports = app => app.use('/categories', router);