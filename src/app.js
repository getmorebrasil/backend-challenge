var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var pg = require('pg');

var conString = "postgres://postgres:postgres@localhost:5432/backendchallenge";
var client = new pg.Client(conString);
client.connect();

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
	checkChildrenId(req, function(result) {
		if (result) {
			client.query("insert into category(category_name) values('"+req.body.name+"')");
			req.body.childrenIds.forEach(insertAssoc);
			res.send({"ok":true});
			//res.send(checkChildrenId(req));
		} else {
			res.send({"ok":false,"error":"invalid Children"});
		}
	})
	//console.log("insert into category(category_name,father_id) values('"+req.body.name+"',"+idFather+")")
	
})

app.listen(3000, function () {
  console.log('listening on port 3000!');
});


function checkChildrenId(requisition, callback){
	var ids =""
	var arrayChildrenIds = requisition.body.childrenIds;
	var a;
	var b;
	if (arrayChildrenIds.length == 0) {
		return true;
	}
	for (var i = 0; i < arrayChildrenIds.length-1; i++) {
		console.log("ids: " + ids);
		ids = ids.concat(arrayChildrenIds[i]+",");
	}
	ids = ids.concat(arrayChildrenIds[arrayChildrenIds.length-1]);
	console.log("ids: " + ids);
	
	client.query("SELECT COUNT(*) FROM category WHERE id_category in ("+ids+")",function(err,result){
		if (err) {
			console.log(err.message);
		} 
			var checkChildrenId = parseInt(result.rows[0].count);
			console.log("checkChildrenId: " + checkChildrenId);
			console.log("arrayChildrenIds: " + arrayChildrenIds.length);
			console.log(arrayChildrenIds.length == checkChildrenId);
			a = arrayChildrenIds.length;
			b = checkChildrenId;
			callback(arrayChildrenIds.length == checkChildrenId);
			
	});
}

function getQueryResult(arrayChildrenIds) {

}
		
function insertAssoc(item) {
	
	try {
		client.query("insert into father_children_assoc(id_father,id_child) values((select max(id_category) from category),"+item+")");
	}
	catch(err) {
		console.log('err.message')
	}

}	