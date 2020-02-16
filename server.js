require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config/config.js');
const datasource = require('./config/datasource.js');

const app = express();
app.use(bodyParser.json());

app.config = config;
app.datasource = datasource(app);

const Categories = app.datasource.models.Categories;

app.route('/categories').get((req, res) => {
    return Categories.findAll()
        .then((categories) => res.status(200).send(categories))
        .catch((err) => {
            return res.status(400).send(err);
        });
});

app.route('/categories/:id').get((req, res) => {
    return Categories.findAll({
            where: {
                id: req.params.id
            }
        })
        .then((categories) => res.status(200).send(categories))
        .catch((err) => {
            return res.status(400).send(err);
        });
});

app.post('/categories', (req, res) => {
    return Categories.create({
            id: req.body.id,
            name: req.body.name
        }).then(() => {
            res.send({'ok': true})
        })
    
});

app.listen(3002, () => console.log('Server Started'));
