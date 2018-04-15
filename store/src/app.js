const express = require('express');
const expressValidator = require('express-validator');
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

// body parser middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// express validator middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		let namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;
		while(namespace.lenght) {
			formParam += '[' +namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

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

	// checa por possiveis campos em branco
	req.checkBody('id', 'IdRequired').notEmpty();
	req.checkBody('name', 'NameRequired').notEmpty();
	let errors = req.validationErrors();

	// caso algum campo foi deixado em branco, aponta qual foi
	if (errors) {
		res.send({
			"ok" : false,
			"error" : errors
		});

	} else {
		let category = new Category(req.body);
		// let childrenId = req.body.childrenId;
		Category.find({'id' : { $all : req.body.childrenId }}, function(errs, cat) {
			res.send({ Category : cat });
		});
		category.save(function(err) {
			if (err) {
				res.send({ "ok" : false });
			} else {
				res.send({ "ok" : true });
			}
		});
	}
});

// usado para debugar
app.listen(3000, () => {
	console.log('Server started in port 3000...');
});