-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA PUBLIC;

CREATE TABLE students(
	student_id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	city VARCHAR(30)
);

INSERT INTO students(name, city) VALUES('Véronique', 'Paris');
INSERT INTO students(name, city) VALUES('Steeven', 'Lyon');
INSERT INTO students(name, city) VALUES('Marc', 'Marseille');
INSERT INTO students(name, city) VALUES('Nour', 'Lyon');
INSERT INTO students(name, city) VALUES('Romain', 'Paris');
INSERT INTO students(name, city) VALUES('Sophie', 'Paris');

SELECT * FROM students;

CREATE TABLE languages(
	language_id SERIAL PRIMARY KEY,
	name VARCHAR(30)
);

INSERT INTO languages(name) VALUES('French');
INSERT INTO languages(name) VALUES('English');
INSERT INTO languages(name) VALUES('German');
INSERT INTO languages(name) VALUES('Spanish');
INSERT INTO languages(name) VALUES('Mandarin');

SELECT * FROM languages;

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

INSERT INTO students_languages(student_id, language_id) VALUES
(1, 1),
(1, 2), 
(2, 1),
(2, 3),
(3, 1),
(4, 1),
(4, 2),
(4, 4),
(4, 5),
(5, 1),
(5, 5),
(6, 1),
(6, 2),
(6, 3);

SELECT * FROM students_languages;

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



