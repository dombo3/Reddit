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
}

module.exports = {postController,};