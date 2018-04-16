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

describe("post category", function() {
	it("post a new category and check if was created and then remove", function(done) {
		request(app).post("/categories")
			.send({ id : 1000, name : "Jefferson", childrenId : [] })
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
			.send({ id : 1001, name : "Jefferson", childrenId : [] })
			.expect({ "ok" : true}, function() {
				request(app).post("/categories")
					.send({ id : 1001, name : "Jair", childrenId : [] })
					.expect({ "ok" : false, "error" : "InvalidId"}, function() {
						request(app).delete("/categories/1001")
							.expect({ "removed" : true }, done);
					});
			});
	});
});

// test invalid childrenid
describe("post a category with invalid childrenId", function() {
	it("add a category with invalid childrenId", function(done) {
		request(app).post("/categories")
			.send({ id : 1010, name : "Jefferson", childrenId : [1, 2] })
			.expect({ "ok" : false, "error" : "InvalidCategories" }, done);
	});
});

// tries to create a category without name
describe("post a category without name", function() {
	it("try to add a category with the name field in blank", function(done) {
		request(app).post("/categories")
			.send({ id : 1011, childrenId : [] })
			.expect({ "ok" : false , 
				       "error" : [{ "msg" : "NameRequired", 
				                    "param" : "name" }]}, done);
	});
});

// tries to create a category without id
describe("post a category without id", function() {
	it("try to add a category with the id field in blank", function(done) {
		request(app).post("/categories")
			.send({ name : "Jefferson" , childrenId : [] })
			.expect({ "ok" : false , 
				       "error" : [{ "msg" : "IdRequired", 
				                    "param" : "id" }]}, done);
	});
});

// tries to create a category without anything
describe("post a category without attribute", function() {
	it("try to add a category without any attribute", function(done) {
		request(app).post("/categories")
			.send()
			.expect({ "ok" : false , 
				      "error" : [{ "msg" : "IdRequired", "param" : "id" },
				                 { "msg" : "NameRequired", "param" : "name" }]}, done);
	});
});

// criar metodo para remover, então adicioanr e remover
// testar retorno do get de um id especifico
// adicionar e dar get no id adicionado
// alterar README.md com a descrição do que foi feito
// no inicio, preservando o enunciado