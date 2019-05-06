const mongoose = require('mongoose')

const uri = 'mongodb://127.0.0.1:27017/local';

mongoose.connect(uri, {useNewUrlParser: true}, (err) => {
    if (err){
        console.log(err.message)
    } else{
        console.log("Successfully connected to MongoDB")
    }
})

const categorySchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type:String, required: true},
    childrenIds: {type: [Number], required: true}
})


module.exports = mongoose.model('Category', categorySchema);

//const Category = mongoose.model('Category', categorySchema);
//export default Category;