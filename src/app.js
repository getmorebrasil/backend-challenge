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

//filter categories by Id
app.get('/categories/:id',function(req,res,next) {
	var id = req.params.id;
	var wantedCategorie = jsonFile.categories.filter(function(category) {
		return category.id == id;
	});
	res.send(wantedCategorie);
})

//register the new category in the Json
app.post('/categories', function(req, res) {
	//jsonFile = JSON.stringify(jsonFile);
	var addedCategory = {"id":getNextId(), name:(req.body.name) ,childrenIds: req.body.childrenIds };//Generate a new category
	if (checkChildrenId(addedCategory)) {// check if there is at least one invalid children
		jsonFile.categories.push(addedCategory);//if children ok: push the new category to Json
		fs.writeFile("../data/jsonFile.json",JSON.stringify(jsonFile));//saves the file
		res.send({"ok":true});//return ok
	} else {
		res.send({"ok":false,"error":"invalid Children"});//id children not ok: return the error
	}
	
	
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
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
	var childrenArray = addedCategory.childrenIds;
	if (childrenArray.length == 0) { // leaf category can be added
		return true;
	} else {
		var childrenExists = true;
		var wantedChildren;
		//do the search for each element in childrenArray
		for (var i = 0; i < childrenArray.length; i++) {
			//console.log("childrenArray: ",childrenArray[i]);
			wantedChildren = jsonFile.categories.filter(function(category) {
				return category.id == childrenArray[i];//compare the children Id with the categories Id in the Json
			});
			//console.log("tamanho: ",wantedChildren.length);
			//console.log(wantedChildren);
			if (wantedChildren.length == 0) { //if one of the children have no match in Json file it can't be added
				//console.log('retornou false');
				return false;
			}
		}
	}
	return true;
}
		
