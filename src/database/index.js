const knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: '',
		password: '',
		database: 'test'
	}
});

module.exports = knex;