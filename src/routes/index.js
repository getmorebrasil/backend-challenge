const express  = require('express');
const category = require('../controllers/category');
const router   = express.Router();

router.route('/')
	.get(category.getAllCategories)
	.post(category.createCategory);
	
router.route('/:id')
	.get(category.getCategoryById)
	.delete(category.deleteCategoryById);

module.exports = router;
