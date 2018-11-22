const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/api', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;

