var express = require('express');
var router = express.Router();

var request = require('sync-request');


// * Create a account
router.post('/sign-up', function(req, res, next) {


  res.render('index', { title: 'Express' });
});

// * Connexion
router.post('/sign-in', function(req, res, next) {

  
  res.render('index', { title: 'Express' });
});


module.exports = router;
