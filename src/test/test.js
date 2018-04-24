const chai     = require('chai');
const chaiHttp = require('chai-http');
const server   = require('../index.js');
const db       = require('../database');
const should   = chai.should();
const expect   = chai.expect;

chai.use(chaiHttp);

describe('Categories', () => {

	describe('/GET on localhost:3000/api', () => {
		it('it should GET all the categories', (done) => {
			chai.request(server)
				.get('/api')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
	});

	describe('/GET/:id on localhost:3000/api', () => {
		it('it should GET a category given an id', (done) => {
			const category = { name: "Moda", childrenids: [] };
			db.insert(category).into('category').returning('*')
				.then(data => {
					chai.request(server)
						.get('/api/' + data[0].id)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.have.property('name');
							res.body.should.have.property('childrenids');
							done();
						});
				});
		});

		it('it should return \"inputted id must be an integer less than 5000\"', (done) => {
			chai.request(server)
				.get('/api/11111111')
				.end((err, res) => {
					res.should.have.status(400);
					res.body.error.should.equal('inputted id must be an integer less than 5000');
					done();
				});
		});

		it('it should return \"category registered with inputted id is inexistent\"', (done) => {
			chai.request(server)
				.get('/api/4999')
				.end((err, res) => {
            				res.should.have.status(400);
            				res.body.error.should.equal('category registered with inputted id is inexistent');
					done();
				});
		});
	});

	describe('/POST on localhost:3000/api', () => {
		it('it should return \"type mismatch\"', (done) => {
			chai.request(server)
				.post('/api')
				.type('json')
				.send( { name: '123'} )
				.end((err, res) => {
					res.body.error.should.equal("type mismatch");
					done();
				});
		});

		it('it should return \"name cannot be left empty\"', (done) => {
			chai.request(server)
				.post('/api')
				.type('json')
				.send( { name: '', childrenids: []} )
				.end((err, res) => {
					res.body.error.should.equal("name cannot be left empty");
					done();
				});
		});


		it('it should POST a new category with no childrenids', (done) => {
			chai.request(server)
				.post('/api')
				.type('json')
				.send( { name: 'Test', childrenids: []} )
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.deep.equal( {ok: true } );
					done();
				});
		});

	  	it('it should POST a new category with two valid childrenids', (done) => {
	  		const categories = [{ name: "Moda", childrenids: [] }, {name: "Informática", childrenids: []}];
			db.insert(categories).into('category').returning('*')
				.then(data => {
					chai.request(server)
						.post('/api')
						.type('json')
						.send( { name: 'Test', childrenids: [data[0].id, data[1].id] })
						.end((err, res) => {
							res.should.have.status(201);
							res.body.should.deep.equal({ok: true });
							done();
						});
				});
		});

		it('it should return \"InvalidCategories\"', (done) => {
			chai.request(server)
				.post('/api')
				.type('json')
				.send( { name: 'Test', childrenids: [1337]} )
				.end((err, res) => {
					res.should.have.status(400);
					res.body.error.should.equal("InvalidCategories");
					done();
				});
		});
	});
});
