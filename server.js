require('dotenv').config()

const express = require('express')
const app = express()

app.route('/categories').get((req, res) => {
    res.json([{
        id: 1,
        name: "Fabiola"
    }])
});

app.listen(3002, () => console.log('Server Started'))