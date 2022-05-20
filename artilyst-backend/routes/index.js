var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var cloudinary = require('cloudinary').v2;
var fs = require('fs'); // chargement du fs qui nous permettra de supprimer la photo du dossier tmp

/***** config du cloudinary avec le compte cloudinary de mustapha 
cloudinary.config({
 cloud_name: 'dxmpjeafy',
 api_key: '854443517271688',
 api_secret: '2ir7uEavjtm5ntcCK8wk6n1oKuM' 
});*/
cloudinary.config({
  cloud_name: 'joeybervin',
  api_key: '557384916495445',
  api_secret: '4ODzJdCJtyRDjFNwkIL15nXYf9A'
});

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

  let token = req.body.token // Je récupère le token de l'utilisateur envoyé par le front end
  /* Je récupère toutes les infos de l'utilisateur */
  let user_account = await userModel.findOne({
    token: token,
  });
  console.log(user_account)
  res.json(user_account) // Object :  Je renvoie les informations au front-end
})

//* Pour modifier les informations du profil de l'utilisateur
router.put('/update_user_profile', async function (req, res, next) {

  let user_new_informations = req.body.user_new_informations // Je récupère les infos entrées

  await userModel.updateOne(
    { token: user_new_informations.token },
    {
      occupation: user_new_informations.occupation,
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

  const projectInfos = req.body.projectInfos // Object : récupération des données du projet envoyées par le front


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

/******* Uploader Photo dans Cloundinary et récuperer l'URL de la photo dans cloudinary */



router.post('/upload_photo_profil', async function (req, res, next) {

  let image = './tmp/' + uniqid() + '.jpg' // récupérer la photo du tmp en lui donnant un nom aleatoire avec uniqid
  //var image = './tmp/image_uploaded.jpg'

  var user_token = await req.files.image_uploaded.name
  var resultCopy = await req.files.image_uploaded.mv(image);

  if (!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(image);
    res.json(resultCloudinary);
  } else {
    res.json({ error: resultCopy });
  }

  fs.unlinkSync(image); // suppression de la photo du dossier tmp

  await userModel.updateOne(
    { token: user_token },
    { $push: { profile_photo: resultCloudinary.url } })

  // var test = await userModel.findOne({token:req.body.token})

  // console.log( 'resultat cloud' , resultCloudinary);
  // console.log('cloudinary.uploader',cloudinary.uploader)
  //console.log('req.files',req.files)
  //console.log('test',test)

});


/************ Route permettant d'envoyer à la BDD le nom du nouveau portfolio + les url des images */
router.post('/add_portfolio', async function (req, res, next) {

  let image = './tmp/' + uniqid() + '.jpg' // Création d'un nom d'image unique

  var resultCopy = await req.files.avatar.mv(image); // on la place temporairement dans le dossier tmp

  var porfolioName = req.body.porfolio.name // récuperer le nom du porfolio créé , on suppose que le req.body récuper un object de la form { name : nom du porolio , listImages : [ urlImage1 , urlImage2... ]}
  var imageUrlListFront = req.body.porfolio.listImages // récuperer une table d'url d'images séléctionnées (photos dans le smartphone)
  var listUrlImageCloudinary = [] // initialisation de la table d'URL des photos dans cloudinary
  var resultCloudinary
  var portfolio = {} // initialisation de l'object porfolio à pusher dans la bdd

  //var resultCopy = await req.files.avatar.mv(image);
  if (imageUrlListFront.length > 0) {
    imageUrlListFront.map(async (image) => {
      resultCloudinary = await cloudinary.uploader.upload(image);// envoie de l'URL de l'image selectionnées au cloud
      listUrlImageCloudinary.push(resultCloudinary.url) // ajout de l'URL cloud de l'image dans le table (que l'on renvoie apres au front)
    }

    )
    res.json(listUrlImageCloudinary);  // envoie de la table des url cloud au front pour les afficher    
    portfolio['title'] = porfolioName;
    portfolio['images'] = listUrlImageCloudinary

  } else {
    res.json({ error: resultCopy });
  }

  //fs.unlinkSync(image); // suppression de la photo du dossier tmp

  await userModel.updateOne(
    { token: req.body.token },
    { $push: { portfolio: portfolio } })

  var test = await userModel.findOne({ token: req.body.token })

  console.log('resultat cloud', resultCloudinary);
  console.log('req.body.token', req.body.token)
  console.log('test', test)

});


router.post('/search_casting', async function (req, res, next) {

  let user = await userModel.findOne({ token: req.body.token });

  // console.log('UTILISATEUR : ' + user)

  function getAge(dateString) {
    let ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  let userAge = getAge(user.date_of_birth);
  console.log('AGE', userAge);

  let projects = await projectModel.find(
    { gender: user.gender, localisation: user.city }
  )

  console.log('PROJETS', projects);

  let matchingProjects = projects.filter(e => e.age_min < userAge);

  // age_min: { $gt: userAge }, age_max: { $lt: userAge }
  // console.log(user.gender);
  // console.log(user.city);
  // console.log(typeof(userAge));
  console.log('MATCHING PROJECTS :', matchingProjects);

  res.json({ matchingProjects })


})

module.exports = router;
