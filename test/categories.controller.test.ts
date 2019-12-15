import test from "ava";

import axiosModule from "axios";
import mongoose from "mongoose";
import * as https from "https";

import mongoMock from "./mocks/mongoose";
import env from "./mocks/dotenv";
import { start } from "../src/loaders";
import { FastifyInstance } from "fastify";

const BASE_URL = `https://${env.SERVICE_HOST}:${env.SERVICE_PORT}`;
const axios = axiosModule.create({
	baseURL: BASE_URL,
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
	}),
});

let app: FastifyInstance = null;

test.before(async () => {
	await mongoMock.mock(false);
	app = await start();
});

test.serial("[Controller] Categories .routeCategoriesPost", async t => {
	t.timeout(5000);
	t.plan(2);

	const catToCreate = {
		id: 101,
		name: "Test",
		childrenIds: [],
	};
	// Post on Route
	try {
		const response = await axios.post(`/categories`, catToCreate);
		// Test Return
		t.true(response.data.ok);
		// Test if mongo have the category created
		t.true(await mongoose.model("Category").exists(catToCreate));
	} catch (err) {
		t.fail(err.message);
	}
});

test.serial("[Controller] Categories .routeCategoriesGetAll", async t => {
	// Serial test => Category 101 already created
	t.plan(2);

	const catToFind = {
		id: 101,
		name: "Test",
		childrenIds: [],
	};
	// Post on Route
	try {
		const response = await axios.get(`/categories?offset=0&limit=10`);
		const respData = response.data;

		const filteredCat = respData.find(cat => cat.id === catToFind.id);
		// Test Return
		t.truthy(filteredCat);
		// Filter response by id
		t.deepEqual(filteredCat, catToFind, "Category Fetched");
	} catch (err) {
		t.fail(err.message);
	}
});

test.serial("[Controller] Categories .routeCategoriesGetById", async t => {
	// Serial test => Category 101 already created
	const catToFind = {
		id: 101,
		name: "Test",
		childrenIds: [],
	};
	// Post on Route
	try {
		const response = await axios.get(`/categories/${catToFind.id}`);
		const data = response.data;
		// Filter response by id
		t.deepEqual(data, catToFind, "Category Fetched");
	} catch (err) {
		t.fail(err.message);
	}
});

test.after(async () => {
	await app.close();
});
