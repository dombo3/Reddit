'use strict'

const db = require('../db');

let Post = function () {
}

Post.listAll = function (result) {
  const query = 'SELECT * FROM post';
  db.query(query, (err, rows) => {
    if (err) {
      console.error(`Cannot retrive data from db ${err.toString()}`);
      return result(err, null);
    }
    result(null, rows);
  })
}

module.exports = Post;