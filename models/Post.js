'use strict'

const db = require('../db');

let Post = function(post) {
  this.title = post.title;
  this.url = post.url || "";
}

Post.get = (id, user = "anonymus", result) => {
  const query = `SELECT * FROM post WHERE id=? AND user=?`;
  db.query(query, [id, user], (err, post) => {
    if (err) {
      console.log(`Cannot retrieve data from db ${err.toString()}`);
      return result(err, null);
    }
    result(null, post[0]);
  })
}

Post.listAll = (user, result) => {
  let query = 'SELECT * FROM post';
  if (user) {
    query += ' WHERE user=?';
  }

  db.query(query, user, (err, posts) => {
    if (err) {
      console.error(`Cannot retrive data from db ${err.toString()}`);
      return result(err, null);
    }
    result(null, posts);
  })
}

Post.create = (post, user = "anonymus", res) => {
  const isoTimestamp = new Date().toISOString();
  const timestamp = isoTimestamp.replace('T', " ").replace(/\..*/, "");
  const score = 0;
  const query = 
    `INSERT INTO post (title, url, timestamp, score, user, vote) VALUES (?, ?, "${timestamp}", ${score}, ?, 0)`;
  db.query(query, [post.title, post.url, user], (err, result) => {
    if (err) {
      console.error(`Cannot insert data to db ${err.toString()}`);
      return res(err, null);
    }

    db.query(`SELECT * FROM post WHERE id=?`, result.insertId, (err, r) => {
      res(null, r);
    })
  });
};

Post.update = (post, id, user = "anonymus", res) => {
  const query = 
  `UPDATE post
    SET title=?,
      url=?
    WHERE id=? AND user=?;`
  db.query(query, [post.title, post.url, id, user], (err, result) => {
    if (err) {
      console.error(`Cannot update data in db ${err.toString()}`);
      return res(err, null);
    }

    if (result.affectedRows > 0) {
      db.query(`SELECT * FROM post WHERE id=?`, id, (err, r) => {
        res(null, r[0]);
      })
    } else {
      res(401, null);
    }
  })
}

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

Post.delete = (id, user = "anonymus", res) => {
  const query = `DELETE from post WHERE id=? AND user=?`;
  db.query(query, [id, user], (err, result) => {
    if (err) {
      console.error(`Cannot delete data from db ${err.toString()}`);
      return res(err, null);
    }

    if (result.affectedRows > 0) {
      res(null, result);
    } else {
      res(401, null);
    }
  })
}

module.exports = Post;