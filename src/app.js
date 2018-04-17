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
  client.query("SELECT (array_to_json(array_agg(row_to_json(arrayField)))) AS categories FROM (SELECT name, ARRAY(SELECT id_child FROM father_children_assoc WHERE id_father = category.id ) as \"childrenIds\" from category) arrayField",function(err,result){
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
	client.query("select (array_to_json(array_agg(row_to_json(arrayField)))) as categories from (select id, name from category) arrayField WHERE id = "+id+"",function(err,result){
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
		console.log(result);
		if (result) {
			client.query("insert into category(name) values('"+req.body.name+"')");
			req.body.childrenIds.forEach(insertAssoc);
			console.log("Adicionou: " + req.body.name);
			res.send({"ok":true});
			//res.send(checkChildrenId(req));
		} else {
			res.send({"ok":false,"error":"invalid Children"});
		}
	});
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});


function checkChildrenId(requisition, callback){
	var ids = 0;
	var arrayChildrenIds = requisition.body.childrenIds;
	var queryString = "SELECT COUNT(*) FROM category WHERE id = ANY('{"+arrayChildrenIds+"}')";

	client.query(queryString,function(err,result){
		if (err) {
			console.log("Error: " + err.message);
		} else if(arrayChildrenIds.length == 0) {
			console.log("else if: " + arrayChildrenIds.length+" / " + result.rows[0].count);
			return callback(true);
		} else {
			console.log("else : " + arrayChildrenIds.length+" / " + result.rows[0].count);
			return callback(arrayChildrenIds.length == result.rows[0].count);
		}
			
	});
}
		
function insertAssoc(item) {
	
	try {
		client.query("insert into father_children_assoc(id_father,id_child) values((select max(id) from category),"+item+")");
	}
	catch(err) {
		console.log('err.message')
	}

}	