var express = require('express');
var connector = require('./pgconnector');
var app = express();

const ROUTE = "/categories"

app.route(ROUTE)

	.post(function(req, res, next){
		let connection = connector.get_connection();
		connection.end();
	})

	.get(function(req, res){
		console.log("GET");
		res.send("SCHEISSE");
	})

