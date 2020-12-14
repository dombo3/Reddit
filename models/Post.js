'use strict'

const db = require('../db');

let Post = function(post) {
  this.title = post.title;
  this.url = post.url;
}

Post.listAll = function(result) {
  const query = 'SELECT * FROM post';
  db.query(query, (err, posts) => {
    if (err) {
      console.error(`Cannot retrive data from db ${err.toString()}`);
      return result(err, null);
    }
    result(null, posts);
  })
}

Post.addPost = function(post, res) {
  const isoTimestamp = new Date().toISOString();
  const timestamp = isoTimestamp.replace('T', " ").replace(/\..*/, "");
  const score = 0;
  const query = `INSERT INTO post (title, url, timestamp, score) VALUES ("?", "?", "${timestamp}", ${score})`;
  db.query(query, [post.title, post.url], (err, result, fields) => {
    if (err) {
      console.error(`Cannot insert data to db ${err.toString()}`);
      return res(err, null);
    }
    post['id'] = result.insertId;
    post['timestamp'] = timestamp;
    post['score'] = score;
    res(null, post);
  });
};

module.exports = Post;