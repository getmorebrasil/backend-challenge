const http = require('http');
const router = require('./router')
var express = require('express');
var connector = require('./pgconnector');

var app = express();
app.use(express.json());

const ROUTE = "/categories"
const hostname = '127.0.0.1';
const port = 3000;

app.route(ROUTE)

	.post(function(req, res, next){
		console.log(req.body);
		console.log(req.body);
		console.log(req.body);
		let json = req.body;
		connector.insert(json.name, json.childrenIds);
		res.send("SCHEISSE");
	})

	.get(function(req, res){
		console.log("GET");
		res.send("SCHEISSE");
	})

app.listen(3000, function(err){
	if(err){
		throw err;
	}
	console.log("iuasdhuisdfhuioasdfhasfui");
});