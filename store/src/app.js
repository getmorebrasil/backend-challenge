const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// initializing mongoose
mongoose.connect('mongodb://localhost/store');
const db = mongoose.connection;

// check for a error in the database
db.on('error', (err) => {
	throw err;
});

// initialize the app
const app = express();

// import the model
const Category = require('./model/category');

// body-parser middleware
app.use(bodyParser.urlencoded( {extended : false} ));
app.use(bodyParser.json());

// express-validator middleware
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

// GET /categories route, send the categories using pagination or not
app.get('/categories', (req, res) => {
	if (Object.keys(req.query).length === 0) {
		sendCategories(req, res);
	} else {
		paginateCategories(req, res);
	}
});

// send all the categories sorted by id
function sendCategories(req, res) {
	Category.find({}, { '__v' : 0 })
			.sort({ 'id' : 1 })
			.exec(function(err, categories) {
		if (err) throw err;

		res.send({ Categories : categories });
	});
}

// send the categories based on the query chosed
function paginateCategories(req, res) {
	Category.paginate({}, { page : parseFloat(req.query.page), 
							limit : parseFloat(req.query.limit),
							sort : req.query.sort,
							select : 'id name childrenId' })
			.then(function(categories) {
		res.send({ Categories : categories });
	});
}

// GET /categories/:id route, send the category with the specfic id
app.get('/categories/:id', (req, res) => {
	Category.find({'id' : req.params.id}, 
		          { '_id' : 0, '__v' : 0 }, 
		          function(err, category) {
		if (err) throw err;

		res.send({ Category : category});
	});
});

// POST /categories used to add a new category
app.post('/categories', (req, res) => {

	// check blank field
	req.checkBody('id', 'IdRequired').notEmpty();
	req.checkBody('name', 'NameRequired').notEmpty();
	let errors = req.validationErrors();

	if (errors) {		
		responseInvalidField(res, errors);
	} else {		
		 createNewCategory(req, res);
	}

});

// response of which field is invalid
function responseInvalidField (res, errors) {
	res.send({
		"ok" : false,
		"error" : errors
	});
}

// create a new category
function createNewCategory (req, res) {
	idValidation(req, res);
}

// test if the id already exist
function idValidation(req, res) {

	Category.find({ 'id' : req.body.id }, function(err, idCategory) {
		if (err) throw err;

		if (Object.keys(idCategory).length !== 0) {
			responseIvalidId(res);
		} else {
			childrenIdValidation(req, res);
		}
	});
}

// test if the IDs in the childrenId field exist
function childrenIdValidation(req, res) {
	let childrenId = req.body.childrenId;

	Category.find({ 'id' : childrenId }, function(err, categories) {
		if (err) throw err;

		if (Object.keys(categories).length !== childrenId.length) {
			responseInvalidCategory(res);
		} else {
			saveNewCategory(req, res);
		}
	});
}

// save the new category in the database
function saveNewCategory (req, res) {
	let category = new Category(req.body);

	category.save(function (err) {
		if (err) throw err;

		res.send({ "ok" : true });
	});
}

// response for a Id already being used
function responseIvalidId (res) {
	res.send({
		"ok" : false,
		"error" : "IdAlreadyBeingUsed"
	});
}

// response for a invalid category
function responseInvalidCategory (res) {
	res.send({ 
		"ok" : false , 
		"error" : "InvalidCategories"
	});
}

// to use postman
app.listen(3000, () => {
	console.log('Server started in port 3000...');
});