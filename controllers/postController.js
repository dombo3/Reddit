'use strict'

const Post = require('../models/Post');

const postController = (app) => {
  
  app.get('/posts/:id', (req, res) => {
    Post.get(req.params.id, (err, post) => {
      if (err) {
        return console.log(`Cannot get post from db: ${err}`);
      }
      if (post) {
        res.send(post);
      } else {
        res.status(404).end();
      }
    })
  })
  
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
      Post.create(newPost, (err, result) => {
        if (err) {
          return console.log(`Cannot insert post to db: ${err}`);
        }
        res.send(result);
      });
    } else {
      res.send("Please provide title in the post");
    }
  });

  app.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = new Post(req.body);
    
    Post.update(post, id, (error, result) => {
      if (error) {
        return console.log(`Cannot update post in db: ${err}`);
      }
      res.send(result);
    });
  })

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

  app.delete('/posts/:id', (req, res) => {
    Post.delete(req.params.id, (err, result) => {
      if (err) {
        return console.log(`Cannot delete post from db: ${err}`);
      }
      res.status(204).end();
    })
  })
}

module.exports = {postController,};