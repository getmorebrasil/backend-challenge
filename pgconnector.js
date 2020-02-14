const {Pool, Client} = require('pg');
const insert_statement = "INSERT INTO categories(id, name) VALUES ($1, $2)";
const update_parentage_statement = "UPDATE categories SET parent_id = $1 WHERE id = $2";
const select_statement = "SELECT * FROM categories WHERE id = $1 OR name = $2";
const delete_statement = "DELETE FROM categories WHERE id = $1";

const inserted_ids = [];

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
		inserted_ids.push(id);
		if(childrenIds.length !== 0){
			_children_ids_subroutine(id, childrenIds, callback);
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

function _confirm_id_exists(id){
	let client = get_connection();
	client.query("SELECT name FROM categories WHERE id = $1", [id], (err, res) => {
		if(err){
			client.end();
			throw err;
		}
		client.end();
		return (res.rows.length !== 0);
	})
}

function _children_ids_subroutine(id, childrenIds, callback){
	let difference = childrenIds.filter(x => ! inserted_ids.includes(x));
	let client = get_connection();
	client.connect();
	if(difference.length !== 0){
		for(let i in childrenIds){
			if(! _confirm_id_exists(childrenIds[i])){
				callback(new Error("Invalid Categories"));
				client.query(delete_statement, [id], err => {
					if(err){
						throw err;
					}
					client.end();
				});
				return;
			}
		}
	}
	for(let i in childrenIds){
		let child_id = childrenIds[i];
		client.query(update_parentage_statement, [id, child_id])
		.then(() => {
			console.log('executou ' + update_parentage_statement.replace('$1',id).replace('$2',child_id));
			client.end();
		})
		.catch(e => {
			callback(e);
			client.end();
		});
	}	
}

module.exports.insert = insert;