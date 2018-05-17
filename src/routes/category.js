const Router = require('koa-router')
const Category = require('../models/category')

const router = new Router({
	prefix: '/categories'
})

router.post('/', async function(ctx, next) {
	const {id, name, childrenIds} = ctx.request.body

	const category = new Category({
		id: +id, name, childrenIds: JSON.parse(childrenIds)
	})

	try {
		await category.save()
		ctx.body = {"ok": true}
		ctx.status = 201
	} catch(err) {
		ctx.body = {"ok": false}
		ctx.status = 400
	}
})

router.get('/', async function(ctx, next) {
	const categories = await Category.find()
	
	ctx.body = categories
	status = 200
})

module.exports = router
