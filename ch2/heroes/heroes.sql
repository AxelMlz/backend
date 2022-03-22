-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA PUBLIC;

CREATE TABLE heroes(
	hero_id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	power VARCHAR(150),
	color VARCHAR(20),
	living BOOLEAN,
	age INTEGER
);

INSERT INTO heroes(name, power, color, living, age) VALUES('Iron Man', '"money"', '"red"', FALSE, 46 );
INSERT INTO heroes(name, power, color, living, age) VALUES('Thor', '"electricity", "worthy"', '"blue"', TRUE, 300);
INSERT INTO heroes(name, power, color, living, age) VALUES('Daredevil', '"blind"', '"red"', TRUE, 30 );

SELECT * FROM heroes;
SELECT name FROM heroes WHERE name=$1;
INSERT INTO heroes(name, power, color, living, age) VALUES($1, $2, $3, $4, $5);
SELECT power FROM heroes WHERE heroes.hero_id=$1;

/**INSERT INTO <heroes>(power) VALUES (<values,>)
INSERT INTO <heroes>(power) VALUES (<values,>, <values,>)**/