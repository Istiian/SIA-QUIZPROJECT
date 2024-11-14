const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('QuizGen', { title: 'Quiz' });
  });

module.exports = router;