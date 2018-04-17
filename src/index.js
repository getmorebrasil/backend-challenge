const express	 = require('express');
const route      = require('./routes/index');
const bodyParser = require('body-parser');
const app 		 = express();

let port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>
	res.send(200).end());

app.use('/api', route);

app.listen(port);
console.log("Running on " + port + "...");

module.exports = app;