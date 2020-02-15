require('dotenv').config();

const express = require('express')
const config = require('./config/config.js');
const datasource = require('./config/datasource.js');

const app = express();

app.config = config;
app.datasource = datasource(app);

const Categories = app.datasource.models.Categories;

app.route('/categories').get((req, res) => {
    Categories.findAll({
        attributes: ['id', 'name']
    }).then(function (categories) {
        res.send(categories);
    });
});

app.listen(3002, () => console.log('Server Started'));
