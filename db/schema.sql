CREATE DATABASE asteroids;
\c asteroids

CREATE TABLE high_scores(
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  user_name TEXT,
  round_number TEXT,
  score INTEGER
);

SELECT * FROM high_scores;

CREATE TABLE users(id SERIAL PRIMARY KEY,user_name TEXT, first_name TEXT, last_name TEXT, email TEXT,password_digest TEXT, keyboard_controls Text, controler_controlls Text);

SELECT * FROM users;


INSERT INTO high_scores( user_id , user_name , round_number , score) VALUES (1, 'Dave', 3, 1000), (1, 'Dave', 3, 1200),(1, 'Dave', 3, 80),(2, 'Bob', 3, 1060), (2, 'Bob', 3, 1280),(2, 'Bob', 3, 400),(3, 'Ted', 4, 980), (3, 'Ted', 3, 1220),(3, 'Ted', 1, 100),(4, 'Bobby', 1, 660),(4, 'Bobby', 1, 720),(4, 'Bobby', 1, 840);


