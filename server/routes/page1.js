const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
  res.render('home');
});

router.get('/haha', function(req, res) {
  res.render('home/haha.html');
});

module.exports = router;
