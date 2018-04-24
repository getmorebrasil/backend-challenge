const db  = require('../database');
const url = require('url');

exports.getAllCategories = (req, res) => {
	const query = url.parse(req.url, true).query;

	if(query.limit && query.page)
		return paginateCategories(res, query.limit, query.page);

	db.select().from('category')
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end();
		});
};

exports.deleteCategoryById = (req, res) => {
	const id = parseInt(req.params.id);
	
	if(!isValidId(id))
		return sendError(res, "inputted id must be an integer less than 5000");

	db('category').where({ id: id }).del()
		.then(data => {
			if(data)
				return res.status(200).json({ ok: true });
			else
				return sendError(res, "category registered with inputted id is inexistent");
		})
		.catch(err => {
			console.log(err);
			res.status(500).end();
		});
};

exports.getCategoryById = (req, res) => {
	const id = parseInt(req.params.id);

	if(!isValidId(id))
		return sendError(res, "inputted id must be an integer less than 5000");

	db.first().from('category').where({ id: id })
		.then(data => {
			if(data == undefined)
				return sendError(res, "category registered with inputted id is inexistent");
		
			return res.status(200).json(data);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end();
		});
};

exports.createCategory = (req, res) => {
	const { name, childrenids } = req.body;

	if (!checkType(name, "string") || !Array.isArray(childrenids)) {
		return sendError(res, "type mismatch");
	}

	if(name == undefined || name.length < 1)
		return sendError(res, "name cannot be left empty");

	if(childrenids.length > 0) {
		db.select().from('category').whereIn('id', childrenids)
			.then(data => {
				if(data.length !== childrenids.length) {
					return sendError(res, "InvalidCategories");
				} else {
					insertInDB();
				}
			})
			.catch(err => {
				console.log(err);
				return res.status(500).end();
			});
	} else {
		insertInDB();
	}

	function insertInDB() {
		db.insert({ name: name, childrenids: childrenids }).into('category')
			.then(data => {
				return res.status(201).json( {ok: true });
			})
			.catch(err => {
				console.log(err);
				return res.status(500).end();
			});
	}

};

exports.paginateCategories = (res, limit, page) => {
	db.select().from('category').limit(limit).offset( limit * (page - 1) )
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end();
		});
};

const sendError = (res, msg) => {
	res.status(400).json( {ok: false, error: msg } );
};

const isValidId = (id) => {
	if(Number.isInteger(id) && id < 5000)
		return true;
	else
		return false;
};

const checkType = (object, type) => {
	if(typeof object === type)
		return true;
	else
		return false;
};
