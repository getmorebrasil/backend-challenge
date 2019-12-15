import test from "ava";

import mongoMock from "./mocks/mongoose";
import mongoose from "mongoose";
import CategoriesService from "../src/services/CategoriesService";

test.before(async () => {
	await mongoMock.mock();
});

test.serial("[Service] Categories .createCategory", async t => {
	// Setup Categories To Be Used
	const cat = {
		id: 201,
		name: "Test",
		childrenIds: [],
	};
	// Try Create
	await CategoriesService.createCategory(cat);
	// Verify if created
	const catExists = await mongoose.connection.model("Category").exists(cat);
	t.true(catExists, "Category successfully created");
});

test.serial("[Service] Categories .fetchCategories", async t => {
	// Serial Test -> Cat 201 already on database
	// Setup Categories To Be Used
	const cat = {
		id: 201,
		name: "Test",
		childrenIds: [],
	};
	// Try Create
	const categories = await CategoriesService.fetchCategories();
	// Verify if category contains the given cat
	const filteredCat = categories.filter(catElem => catElem.id === cat.id)[0];
	// Verify if successfuly fetched
	t.deepEqual(filteredCat, cat, "Category successfully fetched");
});

test.serial("[Service] Categories .fetchCategoryById", async t => {
	// Serial Test -> Cat 201 already on database
	// Setup Categories To Be Used
	const cat = {
		id: 201,
		name: "Test",
		childrenIds: [],
	};
	// Try Create
	const category = await CategoriesService.fetchCategoryById(cat.id);
	// Verify if category contains the given cat
	t.deepEqual(category, cat, "Category successfully fetched");
});
