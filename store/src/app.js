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
	throw err;
});

// inicia app
const app = express();

// importando o modelo da db
const Category = require('./model/category');

// body parser middleware
app.use(bodyParser.urlencoded( {extended : false} ));
app.use(bodyParser.json());

// express validator middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		let namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;
		while(namespace.length) {
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

	// retirando o _id e __v no json e ordenando as categorias por id fornecido
	Category.find({}, { '_id' : 0, '__v' : 0 }).exec(function(err, categories) {
		if (err) throw err;
		res.send({ Categories : categories });
	});
});

// rota GET /categories/:id
app.get('/categories/:id', (req, res) => {
	Category.find({'id' : req.params.id}, { '_id' : 0, '__v' : 0 }, function(err, category) {
		if (err) throw err;
		res.send({ Category : category});
	});
});

// rota POST /categories
app.post('/categories', (req, res) => {

	// checa se algum campo está em branco
	req.body('id', 'IdRequired').notEmpty();
	req.body('name', 'NameRequired').notEmpty();
	let errors = req.validationErrors();

	// caso possui algum campo em branco, aponta qual, 
	// caso contrario procede para salvar a nova categoria
	if (errors) {
		invalidField(res, errors);
	} else {
		 newCategory(req, res);
	}

});

// mostra quais campos estão invalidos
function invalidField (res, errors) {
	res.send({
		"ok" : false,
		"error" : errors
	});
}

// cria uma nova categoria e testa se ela possui childrenIds validos
function newCategory (req, res) {
	let category = new Category(req.body);
	let childrenId = req.body.childrenId;

	// procura no db uma lista com os childrenId passados e
	// compara o tamanho da lista encontrada no db com a quantidade de
	// childrenIds pasados, caso seja igual a categoria eh salva no db, 
	// caso contrario as categorias passadas são invalidas
	Category.find({ 'id' : childrenId }, function(err, categories) {
		if (err) throw err;
		if (Object.keys(categories).length === childrenId.length) {
			saveInDB(res, category);
		} else {
			invalidCategories(res);
		}
	});
}

// salva a nova categoria no database
function saveInDB (res, category) {
	category.save(function (err) {
		if (err) throw err;
		res.send({ "ok" : true });	
	});
}

// envia a mensagem de categoria invalida
function invalidCategories (res) {
	res.send({ 
		"ok" : false , 
		"error" : "InvalidCategories"
	});
}

// usado para debugar
app.listen(3000, () => {
	console.log('Server started in port 3000...');
});