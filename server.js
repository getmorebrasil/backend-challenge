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

app.get('/list', (req,res) => {
	res.render('list');
});

app.get('/categories', (req,res) => {
	res.render('categories');
});

app.post('/categories', (req,res) => {
	console.log('post body', req.body);
	const client = new Client();
	client.connect()
		.then(() => {
			console.log('connection complete');
			if (req.body.childrenlds) {
				const sql = 'INSERT INTO categorias (id, name, childrenlds) VALUES ($1, $2, $3)'
				var params = [req.body.id, req.body.name, req.body.childrenlds];
				return client.query(sql, params);
			}else
				const sql = 'INSERT INTO categorias (id, name, childrenlds) VALUES ($1, $2, $3)'
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

app.listen(process.env.PORT, function() {
	console.log(`Listening on port ${process.env.PORT}.`);
});