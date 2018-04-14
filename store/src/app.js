const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// utilizando mongoose para estruturacao do database
// sendo store o nome dado ao database criado
mongoose.connect('mongodb://localhost/store');
const db = mongoose.connection;

// checa se ha algum erro no db
db.on('error', (err) => {
	console.log(err);
});

// inicia app
const app = express();

const Category = require('./model/category')

app.get('/categories', (req, res) => {
	// escondendo o _id no json e ordenando as categorias por id fornecido
	Category.find({}, {'_id' : 0}).sort('id').exec((err, categories) => {
		if (err) {
			console.log(err);
		} else {
			res.send({
				Categories : categories
			});
				
		}
	});
});

app.get('/categories/:id', (req, res) => {
	Category.find({'id' : req.params.id}, {'_id' : 0}, (err, category) => {
		res.send({ Category : category});
	});
});

// usado para debugar
app.listen(3000, () => {
	console.log('Server started in port 3000...');
});