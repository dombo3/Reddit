'use strict'

const express = require('express');
const Post = require('./models/Post');
const app = express();
const PORT = process.env.PORT || 3000;
const post = require('./models/Post');

app.use(express.json());

app.get('/posts', (req, res) => {
  post.listAll((err, result) => {
    if (err) {
      return console.log(`Cannot get posts from db: ${err}`);
    }
    res.send(result);
  });
});

app.post('/posts', (req, res) => {
  if (req.body.title && req.body.url) {
    const newPost = new Post(req.body);
    post.addPost(newPost, (err, result) => {
      if (err) {
        return console.log(`Cannot insert post to db: ${err}`);
      }
      res.send(result);
    });
  } else {
    res.send("Please provide title and url in the post");
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});