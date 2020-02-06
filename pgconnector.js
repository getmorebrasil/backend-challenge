const {Pool, Client} = require('pg');

function get_connection(params = {}){

	let client = new Client({
		user: params.user || "postgresql",
		host: params.host || "localhost",
		database: params.database || "GETMORE",
		port: params.port || 5432
	 });

	return client;
}

module.exports = get_connection;