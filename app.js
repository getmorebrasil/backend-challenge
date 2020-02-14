const router = require('./router');
const express = require('express');
const connector = require('./pgconnector');

const app = express();
app.use(express.json());

const ROUTE = "/categories";
const hostname = '127.0.0.1';
const port = 3000;

app.route(ROUTE)
	//TODO: verificacoes de input (proibir caracteres, etc.)
	.post(function(req, res){
		let json = req.body;

		//normaliza nomes para poder aplicar regra de nomes únicos
		//(se certifica que o mesmo nome não pode ser cadastrado novamente por conta de maiúsculas ou minúsculas)
		connector.insert(json.id, json.name.toLowerCase(), json.childrenIds, (err, status, message) => {
			res.append("Content-Type", "application/json");
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
		console.log("GET");
		res.send("SCHEISSE");
	});

app.listen(port, function(err){
	if(err){
		throw err;
	}
	console.log("Server running on port " + port);
});