-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA PUBLIC;

CREATE TABLE authors(
	author_id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	nationality VARCHAR(10),
	books VARCHAR(100)
);

INSERT INTO authors(name, nationality, books) VALUES('Lawrence Nowell', 'UK', '"Beowulf"');
INSERT INTO authors(name, nationality, books) VALUES('William Shakespeare', 'UK', '"Hamlet", "Othello", "Romeo and Juliet", "MacBeth"');
INSERT INTO authors(name, nationality, books) VALUES('Charles Dickens', 'US', '"Oliver Twist", "A Christmas Carol"');
INSERT INTO authors(name, nationality, books) VALUES('Oscar Wilde', 'UK', '"The Picture of Dorian Gray", "The Importance of Being Earnest"');

SELECT * FROM authors;
SELECT name, nationality FROM authors WHERE authors.author_id=$1;
SELECT books FROM authors WHERE authors.author_id=$1;



