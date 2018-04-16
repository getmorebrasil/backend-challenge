var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var jsonFile = require("../data/jsonFile.json"); 

var app = express();
app.use(bodyParser.json());

app.get('/categories', function (req, res) {
  var JsonRes = (jsonFile);
  res.send(JsonRes);
});

app.get('/categories/:id',function(req,res,next) {
	var id = req.params.id;
	var wantedCategorie = jsonFile.categories.filter(function(category) {
		return category.id == id;
	});
	res.send(wantedCategorie,1,4);
})

app.post('/categories', function(req, res) {
	if (checkChildrenId(req.body.childrenIds)) {
		var addedCategory = {"id":getNextId(), name:(req.body.name) ,childrenIds: req.body.childrenIds };//Generate a new category
		jsonFile.categories.push(addedCategory);
		fs.writeFile("../data/jsonFile.json",JSON.stringify(jsonFile));
		res.send({"ok":true});
	} else {
		res.send({"ok":false,"error":"invalid Children"});
	}
	
	
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

function checkChildrenId(addedCategory){
	//var childrenArray = addedCategory.childrenIds;
	if (addedCategory.length == 0) {
		return true;
	} else {
		var childrenExists = true;
		var wantedChildren;
		for (var i = 0; i < addedCategory.length; i++) {
			wantedChildren = jsonFile.categories.filter(function(category) {
				return category.id == addedCategory[i];
			});
			if (wantedChildren.length == 0) {
				return false;
			}
		}
	}
	return true;
}
		
		