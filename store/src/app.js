const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// utilizando mongoose para estruturacao do database
// sendo store o nome dado ao database criado
mongoose.connect('mongodb://localhost/store');
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
	if (Object.keys(req.query).length === 0) {
		sendCategories(req, res);
	} else {
		paginateCategories(req, res);
	}
});

function sendCategories(req, res) {
	Category.find({}, { '__v' : 0 })
			.sort({ 'id' : 1 })
			.exec(function(err, categories) {
		if (err) throw err;
		res.send({ Categories : categories });
	});
}

function paginateCategories(req, res) {
	Category.paginate({}, { page : parseFloat(req.query.page), 
							limit : parseFloat(req.query.limit),
							sort : req.query.sort,
							select : 'id name childrenId' })
			.then(function(categories) {
		res.send({ Categories : categories });
	});
}

// rota GET /categories/:id
app.get('/categories/:id', (req, res) => {
	Category.find({'id' : req.params.id}, 
		          { '_id' : 0, '__v' : 0 }, 
		          function(err, category) {
		if (err) throw err;
		res.send({ Category : category});
	});
});

// rota POST /categories
app.post('/categories', (req, res) => {

	// checa se algum campo está em branco
	req.checkBody('id', 'IdRequired').notEmpty();
	req.checkBody('name', 'NameRequired').notEmpty();
	let errors = req.validationErrors();

	// caso possui algum campo em branco, aponta qual, 
	// caso contrario procede para salvar a nova categoria
	if (errors) {
		invalidField(res, errors);
	} else {
		 newCategory(req, res);
	}

});

// resposta de campos nao preenchidos e mostra quais sao
function invalidField (res, errors) {
	res.send({
		"ok" : false,
		"error" : errors
	});
}

// cria uma nova categoria e testa se ela possui childrenIds validos
function newCategory (req, res) {
	sameIdValidation(req, res)
}

// testa se o Id ja esta sendo utilizado por outra categoria
function sameIdValidation(req, res) {

	Category.find({ 'id' : req.body.id }, function(err, idCategory) {
		if (err) throw err;

		// testa se o objeto retornado pelo find eh diferente de 0
		// e caso for, o id ja esta sendo utilizado e tera uma resposta
		// de id invalido, caso contrario, sera verificado se os
		// childrenIds sao validos.
		if (Object.keys(idCategory).length !== 0) {
			invalidIdResponse(res);
		} else {
			childrenIdValidation(req, res);
		}
	});
}

// procura no db uma lista com os childrenId passados e
// compara o tamanho da lista encontrada no db com a quantidade de
// childrenIds pasados, caso seja igual a categoria eh salva no db, 
// caso contrario as categorias passadas são invalidas.
function childrenIdValidation(req, res) {
	let childrenId = req.body.childrenId;

	Category.find({ 'id' : childrenId }, function(err, categories) {
		if (err) throw err;
		if (Object.keys(categories).length === childrenId.length) {
			saveInDB(req, res);
		} else {
			invalidCategoriesResponse(res);
		}
	});
}

// salva a nova categoria no database
function saveInDB (req, res) {
	let category = new Category(req.body);

	category.save(function (err) {
		if (err) throw err;
		res.send({ "ok" : true });
	});
}

// respota de Id ja sendo utilizado
function invalidIdResponse (res) {
	res.send({
		"ok" : false,
		"error" : "IdAlreadyBeingUsed"
	});
}

// resposta de Categorias filhas invalida
function invalidCategoriesResponse (res) {
	res.send({ 
		"ok" : false , 
		"error" : "InvalidCategories"
	});
}

// usado para debugar
app.listen(3000, () => {
	console.log('Server started in port 3000...');
});