'use strict'

const db = require('../db');

let Post = function(post) {
  this.title = post.title;
  this.url = post.url || "";
}

Post.listAll = (result) => {
  const query = 'SELECT * FROM post';
  db.query(query, (err, posts) => {
    if (err) {
      console.error(`Cannot retrive data from db ${err.toString()}`);
      return result(err, null);
    }
    result(null, posts);
  })
}

Post.addPost = (post, res) => {
  const isoTimestamp = new Date().toISOString();
  const timestamp = isoTimestamp.replace('T', " ").replace(/\..*/, "");
  const score = 0;
  const query = `INSERT INTO post (title, url, timestamp, score) VALUES (?, ?, "${timestamp}", ${score})`;
  db.query(query, [post.title, post.url], (err, result) => {
    if (err) {
      console.error(`Cannot insert data to db ${err.toString()}`);
      return res(err, null);
    }

    db.query(`SELECT * FROM post WHERE id=?`, result.insertId, (err, r) => {
      res(null, r);
    })
  });
};

Post.upVote = (id, res) => {
  const query = `UPDATE post SET score = score + 1 WHERE id=${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.error(`Cannot update data in db ${err.toString()}`);
      return res(err, null);
    }

    db.query(`SELECT * FROM post WHERE id=?`, id, (err, r) => {
      res(null, r);
    })
  })
}


Post.downVote = (id, res) => {
  const query = `UPDATE post SET score = score - 1 WHERE id=${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.error(`Cannot update data in db ${err.toString()}`);
      return res(err, null);
    }
    
    db.query(`SELECT * FROM post WHERE id=?`, id, (err, r) => {
      res(null, r);
    })
  })
}

module.exports = Post;