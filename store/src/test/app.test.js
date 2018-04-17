const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

describe("get categories", function() {
	it("test if the route GET /categories is working", function(done) {
		request(app).get("/categories")
			.expect(200, done);
	});
});

describe("post category", function() {
	it("post a new category and check if was created and then remove", function(done) {
		request(app).post("/categories")
			.send({ childrenId : [], id : 1000, name : "Jefferson" })
			.expect({ "ok" : true} , function() {
				request(app).get("/categories/1000")
					.expect( { "id" : 1000} )
					.expect(200, function() {
						request(app).delete("/categories/1000")
							.expect({ "removed" : true }, done);
					});
			});
	});
});

// test invalid id
describe("post a category with invalid Id", function() {
	it("add a category and try to add another category with the same id", function(done) {
		request(app).post("/categories")
			.send({ childrenId : [], id : 1001, name : "Jefferson" })
			.expect({ "ok" : true}, function() {
				request(app).post("/categories")
					.send({ childrenId : [], id : 1001, name : "Jair" })
					.expect({ "ok" : false, "error" : "InvalidId"}, function() {
						request(app).delete("/categories/1001")
							.expect({ "removed" : true }, done);
					});
			});
	});
});

// test invalid childrenid
describe("post a category with invalid childrenId", function() {
	it("tries to create a category with invalid childrenId and check the returned error", function(done) {
		request(app).post("/categories")
			.send({ childrenId : [1, 2, 3], id : 1010, name : "Jefferson" })
			.expect({ "ok" : false, "error" : "InvalidCategories" }, done);
	});
});

// tries to create a category without name
describe("post a category without name", function() {
	it("tries to add a category without the attribute 'name' and check the returned error", function(done) {
		request(app).post("/categories")
			.send({ childrenId : [], id : 1011 })
			.expect({ "ok" : false , 
				       "error" : [{ "msg" : "NameRequired", 
				                    "param" : "name" }]}, done);
	});
});

// tries to create a category without id
describe("post a category without id", function() {
	it("tries to add a category without the attribute 'id' and check the returned error", function(done) {
		request(app).post("/categories")
			.send({ childrenId : [], name : "Jefferson" })
			.expect({ "ok" : false , 
				       "error" : [{ "msg" : "IdRequired", 
				                    "param" : "id" }]}, done);
	});
});

// tries to create a category without anything
describe("post a category without attribute", function() {
	it("tries to add a category without any attribute and check the returned error", function(done) {
		request(app).post("/categories")
			.send()
			.expect({ "ok" : false , 
				      "error" : [{ "msg" : "IdRequired", "param" : "id" },
				                 { "msg" : "NameRequired", "param" : "name" }]}, done);
	});
});