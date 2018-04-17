	﻿create table category( 
		id_category serial,
		category_name varchar(50),
	
		primary key(id_category)
	);

	create table father_children_assoc(
		id_father int,
		id_child int,

		primary key(id_father,id_child),
		foreign key(id_father) references category(id_category) on delete restrict,
		foreign key(id_child) references category(id_category) on delete restrict
	);

	drop table category
	drop table father_children_assoc
	insert into category(category_name) values('atalaia')

	select * from category
	select * from father_children_assoc

	insert into father_children_assoc(id_father,id_child) values((select max(id) from category),1)






