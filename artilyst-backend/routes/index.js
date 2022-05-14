var express = require('express');
var router = express.Router();

// My models
var userModel = require('../models/user');
var projectModel = require('../models/project');

var request = require('sync-request');


// * Création d'un compte
router.post('/sign-up', async function (req, res, next) {

  const userInfos = req.body.userInfos

  console.log(userInfos);

});

// * Connexion
router.post('/sign-in', async function(req, res, next) {

  let alreadyMember = false;

  /* Vérifications des informations données */
  var account = await userModel.findOne({
    email: req.body.signInEmail,
    password: req.body.signInPassword
  });


  if (account !== null) {
    alreadyMember = true
    
  }
  else {
    alreadyMember = false
  }
 

  res.json({alreadyMember})
  
});


module.exports = router;
