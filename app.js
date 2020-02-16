const router = require('./router');
const express = require('express');
const connector = require('./pgconnector');
const {titleCase} = require('title-case');

const app = express();
app.use(express.json());

const ROUTE = "/categories";
const hostname = '127.0.0.1';
const port = 3000;

app.route(ROUTE)
	.post(function(req, res){
		let json = req.body;
		res.append("Content-Type", "application/json");
		connector.insert(json.id, json.name, json.childrenIds, err => {
			if(err){
				res.json({
					"ok" : false,
					"error" : err.stack
				});
			}
			else{
				res.json({
					"ok" : true
				});				
			}
		});
	})

	.get(function(req, res){
		res.append("Content-Type", "application/json");
		connector.get(null, (err, result) => {
			if(err){
				res.json({
					"ok" : false,
					"error" : err.stack
				});
			}
			else{
				res.json(result);
			}
		});
	});

app.listen(port, function(err){
	if(err){
		throw err;
	}
	console.log("Server running on port " + port);
});