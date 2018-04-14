let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
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
		required : true
	}
});

let Category = module.exports = mongoose.model('Category', categorySchema);