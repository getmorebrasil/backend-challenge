const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// utilizando mongoose para estruturacao do database
// sendo store o nome dado ao database criado
mongoose.connect('mongodb://localhost/store');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// checa se ha algum erro no db
db.on('error', (err) => {
	console.log(err);
});

// inicia app
const app = express();

// importando o modelo da db
const Category = require('./model/category');

// body parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// rota GET /categories
app.get('/categories', (req, res) => {
	// escondendo o _id no json e ordenando as categorias por id fornecido
	Category.find({}, {'_id' : 0}).exec(function(err, categories) {
		if (err) {
			console.log(err);
		} else {
			res.send({
				Categories : categories
			});
				
		}
	});
});

// rota GET /categories/:id
app.get('/categories/:id', (req, res) => {
	Category.find({'id' : req.params.id}, {'_id' : 0}, function(err, category) {
		res.send({ Category : category});
	});
});

// rota POST /categories
app.post('/categories', (req, res) => {
	let category = new Category(req.body);

	category.save(function(err) {
		if (err) {
			res.send({
				"ok" : false
			});
			return;
		} else {
			res.send({
				"ok" : true
			});
		}
	});
});

// usado para debugar
app.listen(3000, () => {
	console.log('Server started in port 3000...');
});