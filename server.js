const express = require('express');
const cors = require('cors');

const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Posts API</h2>
      <p>Welcome to Jungle</p>
    `);
  });

server.use('/api/posts', postsRouter)

module.exports = server;