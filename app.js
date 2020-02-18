const express = require('express');
const connector = require('./pgconnector');
const validator = require('./validator');
const app = express();
app.use(express.json());

const ROUTE = "/categories";
const hostname = '127.0.0.1';
const port = 3000;

app.route(ROUTE)
	.post((req, res) => {
		let json = req.body;
		res.append("Content-Type", "application/json");
		let [validated, error_message] = validator.validate_fields(json.id, json.name, json.childrenIds);
		if(! validated){
			res.json({
				"ok" : false, 
				"error" : error_message
			});
			return;
		}
		connector.insert(json.id, json.name, json.childrenIds, err => {
			if(err){
				res.json({
					"ok" : false,
					"error" : err.message
				});
			}
			else{
				res.json({
					"ok" : true
				});
			}
		});
	})

	.get((req, res) => {
		connector.get_all((err, result) => {
			if(err){
				res.json({
					"ok" : false,
					"error" : err.message
				});
			}
			else{
				res.json(result);
			}
		});
	});

app.get(ROUTE + "/:id", (req, res) => {
	connector.get(req.params.id, (err, result) => {
		if(err){
			console.log('err: ');
			console.log(err);
			res.json({
				"ok" : false,
				"error" : err.message
			});
		}
		else{
			res.json(result);
		}		
	});
});

app.listen(port, err => {
	if(err){
		throw err;
	}
	console.log("Server running on port " + port);
});