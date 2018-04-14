const express = require('express');
const body-parser = require('body-parser');
const mongoose = require('mongoose');

// utilizando mongoose para estruturacao do database
// sendo store o nome dado ao database criado
mongoose.connect('mongodb://localhost/store');
let db = mongoose.connection;

// checa se ha algum erro no db
db.on('error', (err) => {
	console.log(err);
});

// inicia app
const app = express();

