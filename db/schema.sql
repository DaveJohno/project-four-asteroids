CREATE DATABASE asteroids;
\c asteroids

CREATE TABLE high_scores(
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  player_name TEXT,
  round_number TEXT,
  score INTEGER
);

SELECT * FROM high_scores;

INSERT INTO high_scores( user_id , player_name , round_number , score) VALUES (1, 'Dave', 3, 1000), (1, 'Dave', 3, 1200),(1, 'Dave', 3, 100),(2, 'Bob', 3, 1060), (2, 'Bob', 3, 1280),(2, 'Bob', 3, 400),(3, 'Tedd', 4, 980), (3, 'Tedd', 3, 1220),(3, 'Tedd', 1, 100)