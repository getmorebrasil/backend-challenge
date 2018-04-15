const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	id : {
		type : Number,
		required : true
	},
	name : {
		type : String,
		required : true
	},
	childrenId : {
		type : [Number],
	},
});

const Category = module.exports = mongoose.model('Category', categorySchema);