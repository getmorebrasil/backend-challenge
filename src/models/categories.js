'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id : {
        type: Number,
        required: true,
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    childrens : [{
        type: Number,
        required: true
    }]
});

module.exports = mongoose.model('Category', schema);