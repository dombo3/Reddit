'use strict'

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const post = require('./models/Post');

app.get('/', (req, res) => {
  post.listAll((err, rows) => {
    if (err) {
      return console.log(`Cannot get posts from db: ${err}`)
    }
    res.send(rows);
  });
})

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
})