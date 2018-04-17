-- USING POSTGRES SQL


CREATE table category( 
	id serial,
	name varchar(50),
	
	primary key(id)
);

create table father_children_assoc(
		id_father int,
		id_child int,
	
		primary key(id_father,id_child),
		foreign key(id_father) references category(id) on delete restrict,
		foreign key(id_child) references category(id) on delete restrict
	);





