'use strict'

const express = require('express');
const controller = require('./controllers/postController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(function(req, res, next) {
  const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
  const origin = req.get('Origin');
  if (allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Methods', '*');
  }
  next();
});

controller.postController(app);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});