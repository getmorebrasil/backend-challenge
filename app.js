const router = require('./router')
const express = require('express');
const connector = require('./pgconnector');

const app = express();
app.use(express.json());

const ROUTE = "/categories"
const hostname = '127.0.0.1';
const port = 3000;

app.route(ROUTE)
	//TODO: verificacoes de input (proibir caracteres, etc.)
	.post(function(req, res, next){
		let json = req.body;
		connector.insert(json.name, json.childrenIds);
		res.send("SCHEISSE");
	})

	.get(function(req, res){
		console.log("GET");
		res.send("SCHEISSE");
	});

app.listen(3000, function(err){
	if(err){
		throw err;
	}
	console.log("iuasdhuisdfhuioasdfhasfui");
});