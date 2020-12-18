CREATE DATABASE Reddit;

USE Reddit;

/** CREATE POST **/

CREATE TABLE post(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  timestamp DATETIME NOT NULL,
  score INTEGER NOT NULL
);

INSERT INTO post (title, url, timestamp, score) VALUES ("NASA: Ozone hole smallest it's been since 1988","http://localhost:3000/posts/1",'2012-06-18 10:34:09', 89);

ALTER TABLE post ADD user VARCHAR(255) NOT NULL DEFAULT('anonymus');
ALTER TABLE post ADD vote INTEGER NOT NULL;

-- /** CREATE USER **/

-- CREATE TABLE user(
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255) NOT NULL
-- );

-- ALTER TABLE post ADD (user_id) INTEGER NOT NULL DEFAULT(1);
-- INSERT INTO user (name) VALUES ('dombo3');
-- ALTER TABLE post ADD CONSTRAINT FOREIGN KEY (user_id) REFERENCES user (id);