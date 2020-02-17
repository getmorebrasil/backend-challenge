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

//Categories.hasOne(Categories, {)

app.listen(3003, () => console.log('Server Started'));

//ROUTES

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
    existChildren(req.body.childrenId, function(exist){
        if (exist) {
            Categories.create({
                id: req.body.id,
                name: req.body.name,
                childrenId : req.body.childrenId
            });
            res.send({'ok': true});
        } else {
            res.send({"ok":false,"error":"Children Invalid"});
        }
    });    
});

//FUNCTIONS POST

function existChildren (id, callback) {
    return Categories.findAll({
        where: {
            id: id
        }
    }).then((categories) => {
        if (Object.keys(categories).length === 0) {
			return callback(false);
		} else {
			return callback(true);
		}
    })
}