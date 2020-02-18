const {Pool, Client} = require('pg');
const insert_statement = "INSERT INTO categories(id, name) VALUES ($1, $2)";
const update_parentage_statement = "UPDATE categories SET parent_id = $1 WHERE id = $2";
const select_statement = "SELECT * FROM categories WHERE id = $1";
const select_all_statement = "SELECT * FROM categories";
const select_children_ids_statement = "SELECT id FROM categories WHERE parent_id = $1";
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
			client.end();
		}
		else{
			callback();
			client.end();			
		}
	})
	.catch(e => {
		callback(e);
		client.end();
	})	
}

function get_all(callback){
	let client = get_connection();
	client.connect();
	client.query(select_all_statement, (err, res) => {
		if(err){
			callback(err);
			client.end();
		}
		else if(res.rows.length === 0){
			callback(null, res.rows);
			client.end();
		}
		else{
			let categories = res.rows;
			let json = [];
			for(let i in categories){
				let category = categories[i];
				let childrenIds = categories.filter(x => x.parent_id === category.id).map(y => y.id);
				json.push({
					id : category.id,
					name : category.name,
					childrenIds : childrenIds
				});
			}
			callback(null, json);
			client.end();			
		}
	});
}

function get(id, callback){
	let client = get_connection();
	client.connect();
	client.query(select_statement, [id], (err,res) => {
		if(err){
			callback(err);
			client.end();
		}
		else if(res.rows.length === 0){
			callback(null, res.rows);
			client.end();
		}
		else{
			let json = {};
			json.id = id;
			json.name = res.rows[0].name;
			client.query(select_children_ids_statement, [id], (error, result) => {
				if(error){
					callback(error);
					client.end();
				}
				else{
					json.childrenIds = (result.rows.length !== 0 ? result.rows.map(x => x.id) : []);
					callback(null, json);
					client.end();
				}
			});
		}
	});
}

function _confirm_id_exists(id){
	if(inserted_ids.includes(id)){
		return true;
	}
	else{
		let client = get_connection();
		client.query("SELECT name FROM categories WHERE id = $1", [id], (err, res) => {
			if(err){
				client.end();
				throw err;
			}
			client.end();
			return (res.rows.length !== 0);
		});
	}
}

function _children_ids_subroutine(id, childrenIds, callback){
	let difference = childrenIds.filter(x => ! inserted_ids.includes(x));
	if(difference.length !== 0){
		for(let i in childrenIds){
			if(! _confirm_id_exists(childrenIds[i])){
				let client = get_connection();
				client.connect();
				client.query(delete_statement, [id], err => {
					if(err){
						throw err;
					}
					client.end();
					callback(new Error("Invalid Categories"));
				});
				return;
			}
		}
	}
	for(let i in childrenIds){
		let child_id = childrenIds[i];
		client.query(update_parentage_statement, [id, child_id])
		.then(() => {
			client.end();
		})
		.catch(e => {
			callback(e);
			client.end();
		});
	}	
}

module.exports.insert = insert;
module.exports.get = get;
module.exports.get_all = get_all;