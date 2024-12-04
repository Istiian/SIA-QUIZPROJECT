const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

router.get('/', async (req, res) => {

  const users = await User.find({HighestScore:{$gt:0}}).sort({HighestScore:-1}).limit(10);
  const you = await User.findOne({Username: req.session.Username});
  console.log(you)
  res.render("QuizGen", {
    title: 'GeoChallenge',
    IfLogIn: req.session.IfLogIn,
    Username: req.session.Username,
    users: users,
    You: you
  });
});

module.exports = router;