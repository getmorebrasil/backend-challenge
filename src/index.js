const express	 = require('express');
const route      = require('./routes/index');
const bodyParser = require('body-parser');

const port       = process.env.PORT || 3000;
const app 	 = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>
	res.send(200).end());

app.use('/api', route);

app.listen(port, () =>
	console.log('Listening on port ' + port + '...');

module.exports = app;
