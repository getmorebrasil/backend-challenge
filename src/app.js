var express = require('express');
var bodyParser = require('body-parser');

var jsonFile = require("../data/jsonFile.json"); 

var app = express();
app.use(bodyParser.json());

//return a list with all categories(still need to work on the presentation)
app.get('/categories', function (req, res) {
  var JsonRes = JSON.stringify(jsonFile, 1, 4);
  res.send(JsonRes);
});

app.post('/', function(req, res) {
	//res.send('Adoro o Morro');
	res.send(req.body.key);
})

app.get('/:id',function(req,res,next) {
	var id = req.params.id;
	res.send(id);
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});