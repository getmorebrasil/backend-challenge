const Router = require('koa-router')
const Category = require('../models/category')

const router = new Router({
	prefix: '/categories'
})

router.post('/', async function(ctx, next) {
	const {id, name, childrenIds} = ctx.request.body

	const category = new Category({
		id, name, childrenIds
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
