function validate_id(id){
	return typeof(id) == 'number';
}

function validate_name(name){
	const blacklist = /[ !@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/;
	return (typeof(name) == 'string' && name.length !== 0 && ! blacklist.test(name));
}

function validate_children_ids(childrenIds){
	if(! childrenIds instanceof Array){
		return false;
	}
	else{
		if(childrenIds.length === 0){
			return true; 
		}
		else{
			for(let i in childrenIds){
				if(typeof(childrenIds[i]) != 'number'){
					return false;
				}
			}
			return true;
		}
	}
}

function validate_fields(id, name, childrenIds){
	if(! validate_id(id)){
		return [false, "Invalid id format"];
	}
	else if(! validate_name(name)){
		return [false, "Invalid name format"];
	}
	else if(! validate_children_ids(childrenIds)){
		return [false, "Invalid childrenIds format"];
	}
	return [true, null];
}

module.exports.validate_fields = validate_fields;