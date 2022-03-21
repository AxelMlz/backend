-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA PUBLIC;

CREATE TABLE authors(
	student_id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	nationality VARCHAR(30),
	books VARCHAR(100)
);

INSERT INTO authors(name, nationality, books) VALUES('Lawrence Nowell', 'UK', '"Beowulf"');
INSERT INTO authors(name, nationality, books) VALUES('William Shakespeare', 'UK', '"Hamlet", "Othello", "Romeo and Juliet", "MacBeth"');
INSERT INTO authors(name, nationality, books) VALUES('Charles Dickens', 'US', '"Oliver Twist", "A Christmas Carol"');
INSERT INTO authors(name, nationality, books) VALUES('Oscar Wilde', 'UK', '"The Picture of Dorian Gray", "The Importance of Being Earnest"');


SELECT * FROM authors;

CREATE TABLE favorites(
	favorite_id SERIAL PRIMARY KEY,
	class VARCHAR(30),
	sport VARCHAR(30),
	student_id INTEGER,
	CONSTRAINT fk_student FOREIGN KEY(student_id) REFERENCES students(student_id)
);

INSERT INTO favorites(class, sport, student_id) VALUES
('Maths', 'Cricket', 2),
('Music', 'Hip-hop', 6),
('Arts', 'Boxing', 1),
('Literature', 'Tennis', 3),
('Science', 'Tennis', 5),
('Arts', 'Baseball', 4);

CREATE TABLE students_languages(
	id SERIAL PRIMARY KEY,
	student_id INTEGER,
	language_id INTEGER,
	CONSTRAINT fk_student FOREIGN KEY(student_id) REFERENCES students(student_id),
	CONSTRAINT fk_language FOREIGN KEY(language_id) REFERENCES languages(language_id)
);

/* Rapport lvl 1 */
SELECT * FROM students WHERE student_id=3;
SELECT * FROM students WHERE student_id=6;
SELECT name, city FROM students WHERE student_id=1;
SELECT name FROM students WHERE student_id=2;
SELECT * FROM students WHERE city='Paris';
SELECT name FROM students WHERE city='Lyon';

/* Rapport lvl 2 */
SELECT * FROM students
INNER JOIN favorites ON students.student_id=favorites.student_id
WHERE students.student_id=5;

SELECT name, sport FROM students
INNER JOIN favorites ON students.student_id=favorites.student_id
WHERE students.student_id=4;

SELECT name, class FROM students
INNER JOIN favorites ON students.student_id=favorites.student_id
WHERE students.student_id=1;



