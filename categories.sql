CREATE TABLE categories(
	id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(250) NOT NULL,
	parent_id SMALLINT REFERENCES categories(id)
);