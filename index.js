const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, },
    () => {
    console.log('connected to DB!')
})

require('./src/routes/routes')(app)

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`))