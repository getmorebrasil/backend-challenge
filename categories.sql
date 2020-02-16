DROP DATABASE IF EXISTS GETMORE;
CREATE DATABASE GETMORE;

DROP USER IF EXISTS getmore;
CREATE USER getmore WITH PASSWORD 'nodejsbackend';

DROP TABLE IF EXISTS categories;

CREATE TABLE categories(
	id SMALLINT PRIMARY KEY,
	name VARCHAR(250) NOT NULL,
	parent_id SMALLINT REFERENCES categories(id)
);

DROP INDEX IF EXISTS name_index;
CREATE INDEX name_index ON categories(name);

GRANT ALL PRIVILEGES ON TABLE categories TO getmore;

INSERT INTO categories(id, name) VALUES (0, 'weapons');
INSERT INTO categories(id, name, parent_id) VALUES (1, 'firearms', 0);
INSERT INTO categories(id, name, parent_id) VALUES (2, 'handguns', 1);
INSERT INTO categories(id, name, parent_id) VALUES (3, 'semi-autos', 2);
INSERT INTO categories(id, name, parent_id) VALUES (4, 'revolvers', 2);
INSERT INTO categories(id, name, parent_id) VALUES (5, 'smith & wesson', 4);
INSERT INTO categories(id, name, parent_id) VALUES (9, 'beretta', 3);

INSERT INTO categories(id, name, parent_id) VALUES (10, 'knives', 0);
INSERT INTO categories(id, name, parent_id) VALUES (11, 'folding knives', 10);
INSERT INTO categories(id, name, parent_id) VALUES (12, 'fixed blades', 10);
INSERT INTO categories(id, name, parent_id) VALUES (13, 'spyderco', 11);
INSERT INTO categories(id, name, parent_id) VALUES (20, 'bayonets', 12);
INSERT INTO categories(id, name, parent_id) VALUES (21, 'combat knives', 12);
INSERT INTO categories(id, name, parent_id) VALUES (22, 'survival knives', 12);
INSERT INTO categories(id, name, parent_id) VALUES (23, 'cold steel', 21);