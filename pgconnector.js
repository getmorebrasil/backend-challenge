const {Pool, Client} = require('pg');

const insert_statement = "INSERT INTO categories(name) VALUES ($1)";
const select_statement = "SELECT * FROM categories";

function get_connection(params = {}){

	let client = new Client({
		user: params.user || "postgresql",
		host: params.host || "localhost",
		database: params.database || "GETMORE",
		port: params.port || 5432
	 });

	return client;
}

function insert(name, childrenIds = []){

	let client = get_connection();
	client.query("BEGIN");
	let res = client.query(insert_statement, [name]);
	console.log(res);
	client.query("COMMIT");
	console.log("done");
	client.end();
}

module.exports.insert = insert;