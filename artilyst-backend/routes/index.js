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

// * Connexion à un compte déjà existant
router.post('/sign-in', async function(req, res, next) {

  let email = req.body.email;
  let password = req.body.password;

  /* Vérifications des informations données */
  let user_account = await userModel.findOne({
    email: email,
  });


  if (user_account !== null && bcrypt.compareSync(password, user_account.password)) {
    res.json({already_member : true, token : user_account.token})
    
  }
  else {
    res.json({already_member : false})
  }
  
});

// * Pour afficher le profil de l'utilisateur
router.post('/user_profile', async function(req, res, next){

  let user_token = req.body.token // Je récupère le token de l'utilisateur envoyé par le front end

    /* Je récupère toutes les infos de l'utilisateur */
    let user_account = await userModel.findOne({
      token: user_token,
    });
  
  res.json({user_account}) // Object :  Je renvoie les informations au front-end
  
})
  
//* Pour modifier les informations du profil de l'utilisateur
router.put('/update_user_profile', async function(req, res, next){

  let user_token = req.body.token // Je récupère le token de l'utilisateur envoyé par le front end

  let user_new_informations = req.body.user_new_informations // Je récupère les infos entrées

  await userModel.updateOne(
    {token: user_token},
     {
      name : user_new_informations.name,
      gender :  user_new_informations.gender,
      description: user_new_informations.description,
      cv : user_new_informations.cv,
      photos :  {}, // photos_profil : Array, portofolios : Array => Object
      user_caracteristics : user_new_informations.user_caracteristics,
      city : user_new_informations.city,
      siren : user_new_informations.siren, // 14 chiffre
    }
    );
})

module.exports = router;
