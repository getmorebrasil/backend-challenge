let express = require('express')
let Sequelize = require('sequelize')
let bodyParser = require('body-parser')

var sqlite = require('sqlite-sync');
sqlite.connect('./db.sqlite3');

let app = express()
app.use(bodyParser.json())

const sequelize = new Sequelize('db', null, null, {
  dialect: 'sqlite',
  storage: './db.sqlite3'
})

const Category = sequelize.define('category', {
  id: {
  	type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

sequelize.sync()

Category.hasOne(Category, {foreignKey: 'parentId'})

app.use(bodyParser.json())

app.listen(3000)

app.get('/categories', function (req, res) {
  	
//,[sequelize.fn('COUNT', sequelize.col('id')), 'nums']]
  	Category.findAll({
  		attributes: ['id', 'name']

  	}).then(function (categories) {
  		res.send(categories)
  	})
})

app.get('/categories/:id', function (req, res) {
  	
//,[sequelize.fn('COUNT', sequelize.col('id')), 'nums']]
  	Category.findAll({
  		attributes: ['id', 'name'],
  		where: {
    	Id: req.params.id
  		}
  	}).then(function (categories) {
  		res.send(categories)
  	})
})

app.post('/categories', function(req, res) {
	checkChildrenId(req, function(result) {
		console.log(result);
		if (result) {
			Category.create({
			    id: req.body.id,
			    name: req.body.name,
			    parentId: null
			  }).then(category => {
			  	req.body.childrenId.forEach((item) => updateTable(item, req.body.id))
			    res.send({'ok': true})
			  })
		} else {
			res.send({"ok":false,"error":"invalid Children"});
		}
	});
});


app.get('/', function (req, res) {
	var rows = sqlite.run("SELECT id FROM categories WHERE id in(1,2,3,4)");
	// console.log(rows);
	// let chosen = Array(rows); 
	res.send({"a":rows.length});
})

function checkChildrenId(requisition, callback){
	let ids = 0;
	let arrayChildrenIds = requisition.body.childrenId;
	var rows = sqlite.run("SELECT id FROM categories WHERE id in("+arrayChildrenIds+")");
		
		if(arrayChildrenIds.length == 0) {
			console.log("else if: " + arrayChildrenIds.length+" / " + rows.length);
			return callback(true);
		} else {
			console.log("else : " + arrayChildrenIds.length+" / " + rows.length);
			return callback(arrayChildrenIds.length == rows.length);
		}
}

function updateTable(item,idParent) {
	Category.update({ parentId: idParent },
	{
  		where: {
  			id: item
  		}
  	});
  	
}