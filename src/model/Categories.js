const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

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

CategorySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Categories', CategorySchema)