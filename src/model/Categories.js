const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    childrenIds: {
        type: Array
    }
})

module.exports = mongoose.model('Categories', CategorySchema)