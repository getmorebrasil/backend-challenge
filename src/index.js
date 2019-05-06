const express = require('express');
const bodyParser = require('body-parser');
const Category = require('./category')

const api = express();

// '__dirname' automatically locates this file on computer
api.use(express.static(__dirname + '/public'));
api.use(bodyParser.json());

api.get('/categories', (req, res) => {
    let categories = Category.find((err, categories) => {
        if (err){
            console.log(err.message)
            res.send(err)
        } else {
            //console.log("Success")
            res.send(categories)
        }
    })
});

api.get('/categories/:categoryId', (req, res) => {
    let category = Category.find({id: req.params.categoryId}, (err, category) => {//findById(req.params.categoryId, (err: any, category: any) => {
        if (err){
            console.log(err.message)
            res.send(err)
        } else {
            //console.log("Success")
            res.send(category)
        }
    })
});

//api.put('/categories', categoryController.addCategory);

api.delete('/categories/:categoryId', (req, res) => {
    Category.deleteOne({id: req.params.categoryId}, (err) => {
        if (err){
            res.send(err)
        } else {
            res.send({'ok': true})
        }
    })
});

api.post('/categories', (req, res) => {
    //var category = new Category(req.body);
    const category = new Category({ // Extract JSON category object from request
		//_id: new mongoose.Types.ObjectId(),
		id: req.body.id,
		name: req.body.name,
		childrenIds: req.body.childrenIds
    });

    let categoryDB = Category.find({id: category.id}, (err, categoryDB) => {
        // If category already exists, returns false
        if (categoryDB.length == 0){

            // Check if children exist
            let childrenCategories = Category.find({id: req.body.childrenIds}, (err, childrenCategories) => {
                const cIds = req.body.childrenIds;
                //console.log(cIds);
                //console.log(childrenCategories.length)

                // If all children exist, all children Id's will be in the database
                if (cIds.length === childrenCategories.length){
                    category.save((err) => {
                        if (err){
                            res.send(err)
                        } else {
                            //res.send(category)
                            res.send({'ok': true})
                        }
                    })  
                } else {
                    res.send({ok: false, error: "Not all children exist"})
                }
            })
        } else {
            res.send({'ok': false, 'error': "Category already exists"})
        }
    })
});

api.listen(3000, () => {
    console.log('API up and running')
});

