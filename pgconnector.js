const {Pool, Client} = require('pg');

const insert_statement = "INSERT INTO categories(id, name) VALUES ($1, $2)";
const update_parentage_statement = "UPDATE categories SET parent_id = ($1) WHERE id = ($2)";
const select_statement = "SELECT * FROM categories WHERE id = $1 OR name = $2";

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

function insert(id, name, childrenIds, callback){

	let client = get_connection();
	client.connect();
	client.query(insert_statement, [id, name])
	.then(() => {
		if(childrenIds.length !== 0){
			for(let i in childrenIds){
				let update_client = get_connection();
				update_client.connect();
				update_client.query(update_parentage_statement, [id, childrenIds[i]])
				.then(() => {
					update_client.end();
				})
				.catch(e => {
					throw(e);
				});
			}
		}
		callback(null, 200, "Categoria " + name + " cadastrada com sucesso.");
		client.end();
	})
	.catch(e => {
		callback(e);
		client.end();
	})
	
	
}

function get(id, name = null){

	let client = get_connection();
	client.connect();
	client.query(select_statement, [id, name], (err, res) => {
		if(err){
			throw err;
		}
		client.end();
		return res.rows[0];
	})
}

module.exports.insert = insert;