var express = require('express');
var router = express.Router();

// ^ Models
var userModel = require('../models/user');
var projectModel = require('../models/project');

// ^ Sécurité
/* TOKEN : Module de création de token unique */
var uid2 = require('uid2');
/* MOT DE PASSE : Module de chiffrement de mot de passe + Nombre de tour */
var bcrypt = require('bcrypt');
const cost = 10;

// var request = require('sync-request');


// * Création d'un compte
router.post('/sign-up', async function (req, res, next) {

  const userInfos = req.body.userInfos // Object : récupération des données envoyés par le front

  const hash = bcrypt.hashSync(userInfos.password, cost); // String : Chiffrement du mot de passe reçut du front-end
  
  /* Véfificaton si le l'utilisateur n'existe pas déjà */
  var user_account = await userModel.findOne({ email: userInfos.email });

  /* Ajout de l'utilisateur à la base de données */
  if (!user_account && userInfos.email !== "" && userInfos.password !== "" && userInfos.name !== "") {
    var newUser = new userModel({
      name : userInfos.name,
      email: userInfos.email,
      password: hash,
      occupation : userInfos.occupation,
      date_of_birth : new Date(userInfos.birthday_date),
      insert_date : new Date(),
      token : uid2(32)
    })

    await newUser.save() // enregistrement dans la base de données

    res.json({new_user : true, token : newUser.token }) // je r'envoie au front l'état de la connexion et le token de l'utilisateur me permettant de l'identifier tout au long de sa navigation
    
  }
  else {

    res.json({new_user : false })
  }

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
