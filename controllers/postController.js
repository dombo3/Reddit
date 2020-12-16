'use strict'

const Post = require('../models/Post');

const postController = (app) => {

  app.use(function(req, res, next) {
    const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
    const origin = req.get('Origin');
    if (allowedOrigins.includes(origin)) {
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
  });

  app.get('/posts', (req, res) => {
    Post.listAll((err, result) => {
      if (err) {
        return console.log(`Cannot get posts from db: ${err}`);
      }
      res.send(result);
    });
  });

  app.post('/posts', (req, res) => {
    if (req.body.title && req.body.url) {
      const newPost = new Post(req.body);
      Post.addPost(newPost, (err, result) => {
        if (err) {
          return console.log(`Cannot insert post to db: ${err}`);
        }
        res.send(result);
      });
    } else {
      res.send("Please provide title and url in the post");
    }
  });

  app.put('/posts/:id/upvote', (req, res) => {
    Post.upVote(req.params.id, (err ,result) => {
      if (err) {
        return console.log(`Cannot upvote post in db: ${err}`);
      }
      res.send(result);
    });
  })

  app.put('/posts/:id/downvote', (req, res) => {
    Post.downVote(req.params.id, (err ,result) => {
      if (err) {
        return console.log(`Cannot downvote post in db: ${err}`);
      }
      res.send(result);
    });
  })
}

module.exports = {postController,};