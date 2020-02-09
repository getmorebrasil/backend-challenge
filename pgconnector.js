const {Pool, Client} = require('pg');

const insert_statement = "INSERT INTO categories(name) VALUES ($1)";
const update_parentage_statement = "UPDATE categories SET parent_id = ($1) WHERE id = ($2)";
const select_statement = "SELECT * FROM categories";

function get_connection(params = {}){

	let client = new Client({
		user: params.user || "getmore",
		host: params.host || "localhost",
		password: 'nodejsbackend',
		database: params.database || "GETMORE",
		port: params.port || 5432
	 });

	return client;
}

function insert(name, childrenIds){

	let client = get_connection();
	client.connect();
	client.query(insert_statement, [name]).
	then(result => {
		client.end();
	})
	.catch(e => console.error(e.stack));
}

module.exports.insert = insert;