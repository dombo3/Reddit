'use strict'

const express = require('express');
const controller = require('./controllers/postController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

controller.postController(app);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});