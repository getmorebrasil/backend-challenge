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
	ctx.status = 200
})

router.param('id', async function(id, ctx, next) {
	ctx.category = await Category.find({id: +id})
	if (!ctx.category) return ctx.status = 404
	return next()
})

router.get('/:id', async function(ctx, next) {
	ctx.body = ctx.category
	ctx.status = 200
})

module.exports = router
