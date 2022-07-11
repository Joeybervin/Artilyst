var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var cloudinary = require('cloudinary').v2; // module de stockage d'image
var fs = require('fs'); // chargement du fs qui nous permettra de supprimer la photo du dossier tmp

// ^ Models
var userModel = require('../models/user');
var projectModel = require('../models/project');

// ^ Sécurité
/* TOKEN : Module de création de token unique */
var uid2 = require('uid2');
/* MOT DE PASSE : Module de chiffrement de mot de passe + Nombre de tour */
var bcrypt = require('bcrypt');
const cost = 10;

// ^ Paramètres et configurations
cloudinary.config({
  cloud_name: 'joeybervin',
  api_key: '557384916495445',
  api_secret: '4ODzJdCJtyRDjFNwkIL15nXYf9A'
});

// var request = require('sync-request');

router.put('/change', async function (req, res, next) {


await Artylist.adminCommand( {
  refineCollectionShardKey: "Artylist.projects",
  key: { ' location': 1, location: 1 }
} )

});


router.get('/', async function (req, res, next) {
  res.render('index', {title : "Express"})
});

//* ____________________________________ CONNEXION ________________________________

// Création d'un compte
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
      description: null,
      cv: null,
      city: null,
      characteristics: {
        gender: null, 
        ethnicGroup: null,
        hair: null, 
        eyes: null, 
        height: null, 
        weight: null, 
        corpulence: null,
        measurements: { 
            waist: null, 
            bust: null, 
            hips: null },
      },
      portfolio : [
        {title : "exemple",
        images : []}
      ],
      profile_photo : [],
      projects_selected : [],
      projects_created : [],
      siren: null, // 14 chiffre
      token: uid2(32),
    })

    await newUser.save() // enregistrement dans la base de données

    res.json({ new_user: true, user: newUser }) // Object : Je renvoie un message de réussite et les données de l'utilisateur

  }
  else {

    res.json({ new_user: false })
  }

});

// Connexion à un compte déjà existant
router.post('/sign-in', async function (req, res, next) {

  let email = req.body.email;
  let password = req.body.password;

  /* Recher du user dans la base de données */
  let user_account = await userModel.findOne({ email: email });

  /* Vérification de la correspondance avec le mot de passe +  envoie */
  if (user_account !== null && bcrypt.compareSync(password, user_account.password)) {
    res.json({ already_member: true, user: user_account }) // OBJECT

  }
  else {
    res.json({ already_member: false }) // OBJECT
  }

});



//* ____________________________________ ANNONCES => ACTION : POSTULER / RECRUTER ________________________________

// Pour qu'un ARTISTE puisse postuler à des offres
router.post('/postuler', async function (req, res, next) {

  var id_Projet_Selected = req.body.projectId
  var userSelected = req.body.userSelected //table de id des users selectionnés par le rectruteur (dans la table project)
  var match = false // le false est juste pour tester, ensuite on définira une condition pour vérifier le match (true/false)
  var token = req.body.token

  var user = await userModel.findOne({ token: token }) // on recherche le user connecté pour récuperer son id et comparer pour le match

  const idProjectExist = user.projects_selected.find(id => id.idProject === id_Projet_Selected) // vérifier si le projet a déja été séléctionné ou pas 

  if(!idProjectExist){

    const matchVerify = userSelected.find(id => id === user._id);

  if(matchVerify){
  match = true
  }


  await userModel.updateOne(
    { token: token },
    { $push: { projects_selected:{idProject: id_Projet_Selected , match : match } } }
  )

  res.json( {already : false , saveProjectSelected : true } )
  }
  else {

    let project = await  projectModel.find({_id : id_Projet_Selected})
    res.json( {already : true, photoProjet : project.photos } )
  }

})

/
// Pour qu'un RECRUTEUR puisse engager
router.post('/recruter', async function (req, res, next) {

  var id_Projet = req.body.projectId  // l'id du projet concerné
  var userSelectedId = req.body.userSelectedId // l'id du user selectionné
  var token = req.body.token // au cas ou...
  var match = false // le false est juste pour tester, ensuite on définira une condition pour vérifier le match (true/false)

  var project = await projectModel.findOne({ _id: id_Projet }) // chercher le projet concerné par le recrutement
  var userHired = await userModel.findOne({ _id: userSelectedId }) // chercher le user recruté

  const idUserSelectedExist = project.users_selected.find(id => id === userSelectedId) // vérifier si le juser est déja dans la table user selected

  //console.log("userHired",userHired)


  if (!idUserSelectedExist) {
    const matchVerify = userHired.projects_selected.find(e => e.idProject == id_Projet); // vérifier si le project concerné par le rectutement existe déja dans la table projectselected (pour le match)
 
    if (matchVerify) {
      match = true
    }


    await projectModel.updateOne(
      { _id: id_Projet },
      { $push: { users_selected: userSelectedId } }
    )


    for (let i = 0; i < userHired.projects_selected.length; i++) {
      if (userHired.projects_selected[i].idProject == id_Projet) {
        userHired.projects_selected[i].match = match
      }

    }

    let status = await userHired.save()




    res.json({ userHired })
  }
  else {
    res.json({ result: false })
  }

  // ?? res.json(user.projects_created)
  
})


module.exports = router;
