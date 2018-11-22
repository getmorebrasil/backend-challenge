const mongoose = require('../database');

const CategorySchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
    },
    childrenId: {
        type: [Number],
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;