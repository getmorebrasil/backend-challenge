const Koa = require('koa')
const {Database} = require('mongorito')
const category = require('./src/routes/category')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const db = new Database('localhost/categories');

app.use(bodyParser())
db.register(require('./src/models/category'))
db.connect();
app.use(category.routes(), category.allowedMethods())

app.listen(3000)
