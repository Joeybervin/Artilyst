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
/* config du cloudinary avec le compte cloudinary de mustapha 
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

// var request = require('sync-request');


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
      token: uid2(32)
    })

    await newUser.save() // enregistrement dans la base de données

    res.json({ new_user: true, token: newUser.token }) // je r'envoie au front l'état de la connexion et le token de l'utilisateur me permettant de l'identifier tout au long de sa navigation

  }
  else {

    res.json({ new_user: false })
  }

});

// Connexion à un compte déjà existant
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

//* ____________________________________ PROFILE ________________________________

// Pour afficher le profil de l'utilisateur
router.post('/user_profile', async function (req, res, next) {

  let token = req.body.token // Je récupère le token de l'utilisateur envoyé par le front end
  /* Je récupère toutes les infos de l'utilisateur */
  let user_account = await userModel.findOne({
    token: token,
  });
  console.log(user_account)
  res.json(user_account) // Object :  Je renvoie les informations au front-end
})

// Pour modifier les informations du profil de l'utilisateur
router.put('/update_user_profile', async function (req, res, next) {

  let user_new_informations = req.body.user_new_informations // Je récupère les infos entrées

console.log(user_new_informations.characteristics)
  await userModel.updateOne( 
    { token: user_new_informations.token },
    {
      name : user_new_informations.name,
      description: user_new_informations.description,
      cv: user_new_informations.cv,
      city: user_new_informations.city,
      characteristics: {
        gender: user_new_informations.gender, 
        ethnicGroup: user_new_informations.ethnicGroup,
        hair: user_new_informations.hair, 
        eyes: user_new_informations.eyes, 
        height: user_new_informations.height, 
        weight: user_new_informations.weight, 
        corpulence: user_new_informations.corpulence,
        measurements: { 
            waist: user_new_informations.waistSize, 
            bust: user_new_informations.bustSize, 
            hips: user_new_informations.hipMeasurement },
    
      },
      
      siren: user_new_informations.siren, // 14 chiffre
    }
  );

  res.json({changement : "terminé"})
})

//* ____________________________________ PROJET ________________________________

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
    age_min:projectInfos.ageMin,
    age_max: projectInfos.ageMax,
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

//* ____________________________________ PHOTOS / GALLERY ________________________________

//? AJOUT
// Uploader Photo dans Cloundinary et récuperer l'URL de la photo dans cloudinary */
router.put('/upload_image_profil', async function (req, res, next) {

  let image = './tmp/' + uniqid() + '.jpg' // récupérer la photo du tmp en lui donnant un nom aleatoire avec uniqid

  var user_token = req.body.token
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

});

// Uploader Photo dans Cloundinary et récuperer l'URL de la photo dans cloudinary */
router.put('/upload_image_portfolio', async function (req, res, next) {

  // console.log(req.body.token)
  // console.log(req.body.portofolioName)
  // console.log(req.files.image_uploaded)


  let image = './tmp/' + uniqid() + '.jpg' 

  let user_token = req.body.token
  let portofolioName = req.body.portofolioName

  var resultCopy = await req.files.image_uploaded.mv(image);

  if (!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(image);
    res.json(resultCloudinary);
  } else {
    res.json({ error: resultCopy });
  }

  fs.unlinkSync(image); // suppression de la photo du dossier tmp

  await userModel.updateOne( // ! A REVOIR
    { token: user_token,
    portfolio : {title : portofolioName} },
    { $push:  { images : resultCloudinary.url }
    } )

    console.log(userModel)



});

router.put('/upload_portfolio', async function (req, res, next) {

  let user_token = req.body.token
  let portfolioName = req.body.portfolioName

  let user = await userModel.findOne({token : user_token})

  const doublePortfolio = user.portfolio.find( element => element.title === portfolioName)

  if (!doublePortfolio ) {

    await userModel.updateOne(
        { token: user_token },
        { $push: { portfolio: {
          title : portfolioName,
          images : [] }
        } })

        res.json({upload : true})
  }
  else {

    res.json({upload : false})
  }

  

});


//? SUPPRESSION
// Pour que l'utilisateur supprime une photo de ses iamges de profil
router.delete('/delete_profile_Image', async function (req, res, next) {

  let profileImageUrl = req.body.profileImageUrl
  let user_token = req.body.token

  await userModel.updateOne(
    {token: user_token},
    {$pull : {profile_photo : profileImageUrl}}
    );

    res.json({status : "supprimé"})

})

// Pour que l'utilisateur puisse supprimer un portofolio
router.delete('/delete_portfolio_image', async function (req, res, next) {

  let portfolioImageUrl = req.body.portfolioImageUrl
  let user_token = req.body.token
  let portfolioTitle = req.body.portfolioTitle

  console.log(portfolioTitle)

  let deleteresult = await userModel.updateOne(
    {token: user_token},
    {$pull: {portfolio : {
      title : portfolioTitle,
      images : portfolioImageUrl}}}
    );
    console.log(deleteresult) 
})

// Pour que l'utilisateur puisse supprimer une image de son portofolio
router.delete('/delete_portfolio', async function (req, res, next) {

  
  let user_token = req.body.token
  let portfolioName = req.body.portfolioName

    await userModel.updateOne(
        { token: user_token },
        { $pull: { portfolio: {
          title : portfolioName }
        } })

    res.json({deleteStatus : true})

})

//* ____________________________________ ANNONCES / RECHERCHE / FILTRE ________________________________

// Pour filtrer et chercher les castings correpondant au critères de l'artiste
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

// Pour qu'un artiste puisse postuler à des offres
router.post('/postuler', async function (req, res, next) {

  var id_Projet_Selected = req.body.projectId
  var userSelected = req.body.userSelected //table de id des users selectionnés par le rectruteur (dans la table project)
  var match = false // le false est juste pour tester, ensuite on définira une condition pour vérifier le match (true/false)
  var token = req.body.token

  var user = await userModel.findOne({token:token}) // on recherche le user connecté pour récuperer son id et comparer pour le match
  
  const idProjectExist = user.projects_selected.find(id => id.idProject === id_Projet_Selected) // vérifier si le projet a déja été séléctionné ou pas 
 
  //console.log("id_Projet_Selected",id_Projet_Selected)
  // console.log(token)
  console.log("userSelected",userSelected)
  //console.log(user)
  //console.log("user.projects_selected",user.projects_selected)
  //console.log("idProjectExist",idProjectExist)

  if(!idProjectExist){
    const matchVerify = userSelected.find(id => id == user._id);
  console.log(matchVerify)
  if(matchVerify){
  match = true
  }
  console.log("matchVerify",matchVerify)

  await userModel.updateOne(
    { token: token },
    { $push: { projects_selected:{idProject: id_Projet_Selected , match:match } } }
  )

  res.json( {already:false , saveProjectSelected : true } )
  }
  else {
    res.json( {already:true} )
  }

})

module.exports = router;
