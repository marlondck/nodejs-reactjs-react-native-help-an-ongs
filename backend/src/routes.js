const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'ola mundo' });
})

module.exports = routes;