'use strict'

const Post = require('../models/Post');

const postController = (app) => {
  app.get('/posts', (req, res) => {
    Post.listAll((err, result) => {
      if (err) {
        return console.log(`Cannot get posts from db: ${err}`);
      }
      res.send(result);
    });
  });

  app.post('/posts', (req, res) => {
    if (req.body.title) {
      const newPost = new Post(req.body);
      Post.addPost(newPost, (err, result) => {
        if (err) {
          return console.log(`Cannot insert post to db: ${err}`);
        }
        res.send(result);
      });
    } else {
      res.send("Please provide title in the post");
    }
  });

  app.put('/posts/:id/upvote', (req, res) => {
    Post.upVote(req.params.id, (err ,result) => {
      if (err) {
        return console.log(`Cannot upvote post in db: ${err}`);
      }
      res.send(result[0]);
    });
  })

  app.put('/posts/:id/downvote', (req, res) => {
    Post.downVote(req.params.id, (err ,result) => {
      if (err) {
        return console.log(`Cannot downvote post in db: ${err}`);
      }
      res.send(result[0]);
    });
  })
}

module.exports = {postController,};