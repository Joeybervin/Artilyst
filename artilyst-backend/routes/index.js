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
      name: userInfos.name,
      email: userInfos.email,
      password: hash,
      occupation: userInfos.occupation,
      date_of_birth: new Date(userInfos.birthday_date),
      insert_date: new Date(),
      token: uid2(32)
    })

    await newUser.save() // enregistrement dans la base de données

    res.json({ new_user: true, token: newUser.token }) // je r'envoie au front l'état de la connexion et le token de l'utilisateur me permettant de l'identifier tout au long de sa navigation

  }
  else {

    res.json({ new_user: false })
  }

});

// * Connexion à un compte déjà existant
router.post('/sign-in', async function (req, res, next) {

  let email = req.body.email;
  let password = req.body.password;

  /* Vérifications des informations données */
  let user_account = await userModel.findOne({
    email: email,
  });


  if (user_account !== null && bcrypt.compareSync(password, user_account.password)) {
    res.json({ already_member: true, token: user_account.token })

  }
  else {
    res.json({ already_member: false })
  }

});


// * Pour afficher le profil de l'utilisateur
router.post('/user_profile', async function (req, res, next) {

  console.log(req.body)
  let token = req.body.token // Je récupère le token de l'utilisateur envoyé par le front end
  /* Je récupère toutes les infos de l'utilisateur */
  console.log(token);
  let user_account = await userModel.findOne({
    token: token,
  });

  res.json({ user_account }) // Object :  Je renvoie les informations au front-end

})

//* Pour modifier les informations du profil de l'utilisateur
router.put('/update_user_profile', async function (req, res, next) {

  let user_new_informations = req.body.user_new_informations // Je récupère les infos entrées

  await userModel.updateOne(
    { token: user_new_informations.user_token },
    {
      name: user_new_informations.name,
      gender: user_new_informations.gender,
      description: user_new_informations.description,
      cv: user_new_informations.cv,
      user_caracteristics: user_new_informations.user_caracteristics,
      city: user_new_informations.city,
      siren: user_new_informations.siren, // 14 chiffre
    }
  );
})


// Creer un projet 
router.post('/project', async function (req, res, next) {

  const projectInfos = req.body.projectInfo // Object : récupération des données du projet envoyées par le front


  /* Ajout du projet à la base de données */

  var newProject = new projectModel({
    title: projectInfos.title,
    description: projectInfos.description,
    collaborators: projectInfos.occupation,
    gender: projectInfos.gender,
    insert_date: new Date(),
    project_dates: { start: projectInfos.date_start, end: projectInfos.date_end },// début => fin
    category: projectInfos.category,
    remuneration: projectInfos.remuneration,
    photos: '',
    users_selected: projectInfos.userstable, // table de tokens des users selectionnées

    age_range: { age_min: projectInfos.ageMin, age_max: projectInfos.ageMax },
    collaborators_caracteristics: {},
    localisation: projectInfos.location,

  })

  await newProject.save() // enregistrement dans la base de données

  console.log(newProject._id)

  await userModel.updateOne(
    { token: projectInfos.token },
    { $push: { projects_created: newProject._id } }
  )


  res.json({ new_project: true }) // je renvoie au front l'état de l'enregistrement dans la BDD



});



module.exports = router;
