const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render("About",{title: 'About', 
      IfLogIn: req.session.IfLogIn, 
      Username: req.session.Username
  });
  
  });

module.exports = router;