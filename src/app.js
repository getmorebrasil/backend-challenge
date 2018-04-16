var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var pg = require('pg');

var conString = "postgres://postgres:postgres@localhost:5432/backendchallenge";
var client = new pg.Client(conString);
client.connect();

var jsonFile = require("../data/jsonFile.json"); 

var app = express();
app.use(bodyParser.json());

app.get('/categories', function (req, res) {
  //var JsonRes = (jsonFile);
 
  client.query("select (array_to_json(array_agg(row_to_json(arrayField)))) as categories from (select id_category, category_name from category) arrayField",function(err,result){
  	if (err) {
  		res.send(err.message);
  	}  
	else {
		res.send(JSON.stringify(result.rows));
	}  	
  });
});

app.get('/categories/:id',function(req,res,next) {
	var id = req.params.id;
	client.query("select (array_to_json(array_agg(row_to_json(arrayField)))) as categories from (select id_category, category_name from category) arrayField WHERE id_category = "+id+"",function(err,result){
  	if (err) {
  		res.send(err.message);
  	}  
	else {
		res.send(JSON.stringify(result.rows));
	}  	
  });
})

app.post('/categories', function(req, res) {
	if(checkChildrenId(req)) {
		client.query("insert into category(category_name) values('"+req.body.name+"')");
		req.body.childrenIds.forEach(insertAssoc);
		res.send({"ok":true});
	} else {
		res.send({"ok":true,"error":"invalid Children"});
	}

	//console.log("insert into category(category_name,father_id) values('"+req.body.name+"',"+idFather+")")
	
})

app.listen(3000, function () {
  console.log('listening on port 3000!');
});


//fix this
function getNextId() {
	if (jsonFile.categories.length == 0) {
		return 1;
	} else {
		var lastId = jsonFile.categories[jsonFile.categories.length-1].id;
		return lastId + 1;
	}
	
}

function checkChildrenId(requisition){
	var ids ="";
	var arrayChildrenIds = requisition.body.childrenIds;
	for (var i = 0; i < arrayChildrenIds.length-1; i++) {
		ids = ids.concat(arrayChildrenIds[i]+",");
	}
	ids = ids.concat(arrayChildrenIds[arrayChildrenIds.length-1]);

	var checkChildrenId = client.query("SELECT COUNT(*) FROM category WHERE id_category in ("+ids+")",function(err,result){
		if (err) {
			console.log(err.message);
		} else {
			var checkIdChildren = parseInt(result.rows[0].count);
			console.log(arrayChildrenIds.length == checkIdChildren);
			return (arrayChildrenIds.length == checkIdChildren);
		}
	});
}	
		
function insertAssoc(item) {
	
	try {
		client.query("insert into father_children_assoc(id_father,id_child) values((select max(id_category) from category),"+item+")");
	}
	catch(err) {
		console.log('err.message')
	}

}	