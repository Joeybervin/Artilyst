var express = require('express');
var router = express.Router();

// My models
var userModel = require('../models/user');
var projectModel = require('../models/project');

var request = require('sync-request');


// * Création d'un compte
router.post('/sign-up', async function (req, res, next) {

  let alreadyMember = false;
  /* Véfificaton si le compte éxiste déjà */
  var user_account = await userModel.findOne({ email: req.body.signUpEmail });

  /* Ajout de l'utilisateur à la base de données */
  if (!user_account && req.body.signUpEmail !== "" && req.body.signUpPassword !== "" && req.body.signUpUsername !== "") {
    alreadyMember = true
    var newUser = new userModel({
      email: req.body.signUpEmail,
      password: req.body.signUpPassword,
    })

    /* J'enregistre dans la base de données */
    await newUser.save()
  }
  
  res.json({alreadyMember})

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
