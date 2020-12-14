CREATE DATABASE Reddit;

USE Reddit;

CREATE TABLE post(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  timestamp DATETIME NOT NULL,
  score INTEGER NOT NULL
);

INSERT INTO post (title, url, timestamp, score) VALUES ("NASA: Ozone hole smallest it's been since 1988","http://localhost:3000/posts/1",'2012-06-18 10:34:09', 89);