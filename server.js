const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const Client = require('pg').Client;
require('dotenv').config();

const app = express();
const mustache = mustacheExpress();

mustache.cache = null;

app.engine('mustache', mustache);
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

//ROTA /list: Retorna a lista de todas as categorias do banco de dados.
app.get('/GET/categories', (req,res) => {
	const client = new Client();
	client.connect()
		.then(() => {
			return client.query('SELECT * FROM categorias;');
		})
		.then((results) => {
			console.log('results?', results);
			res.render('list', results);
		})
		.catch((err) => {
			console.log('err', err)
			res.redirect('/');
		});
});
//Rota /categories: Permite adicionar uma categoria inserindo ID, Name e ChildrensIds.
app.get('/POST/categories', (req,res) => {
	res.render('categories');
});
//Rota /categories: Metódo POST, adiciona no banco de dados a categoria.
app.post('/POST/categories', (req,res) => {
	console.log('post body', req.body);
	const client = new Client();
	client.connect()
		.then(() => {
			console.log('connection complete');
			const sql = 'INSERT INTO categorias (id, name, childrenlds) VALUES ($1, $2, $3)'
			if (req.body.childrenlds) {
				var params = [req.body.id, req.body.name, req.body.childrenlds];
				return client.query(sql, params);
			}else
				var params = [req.body.id, req.body.name, {}];
				return client.query(sql, params);
		})
		.then((result) => {
			console.log('result?', result);
			res.redirect('/list');
		})
		.catch((err) => {
			console.log('err', err)
			res.redirect('/list');
		});
});
//Rota /categories/:id: retorna apenas a categoria com o ID correspondente no banco de dados.
app.get('/GET/categories/:id', (req,res) => {
	const client = new Client();
	client.connect()
		.then(() => {
			console.log('connection complete');
			return client.query(`SELECT * FROM categorias WHERE id = ${req.params.id}`);
		})
		.then((results) => {
			console.log('results?', results);
			res.render('answer', results);
		})
		.catch((err) => {
			console.log('err', err)
			res.redirect('/');
		});
});

app.listen(process.env.PORT, function() {
	console.log(`Listening on port ${process.env.PORT}.`);
});