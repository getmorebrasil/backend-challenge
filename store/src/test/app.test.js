const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

// using a specific db for the test
mongoose.connect('mongodb://localhost/test');

// basic test to check if GET /categories is working
describe("get categories", function() {
	it("test if the route GET /categories is working", function(done) {
		request(app).get("/categories")
			.expect(200, done);
	});
});