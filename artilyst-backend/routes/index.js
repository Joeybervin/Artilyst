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
const { populate } = require('../models/user');
const cost = 10;

// ^ Paramètres et configurations
cloudinary.config({
  cloud_name: 'Rafbervin',
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

//* ____________________________________ PROFILE ________________________________
// Pour afficher tous les utilisateurs //! TEMPORAIRE
router.get('/all_users_profile', async function (req, res, next) {

  let all_users_account = await userModel.find();
  res.json(all_users_account) // Object :  Je renvoie les informations au front-end
})

// Pour afficher le profil de l'utilisateur
router.post('/user_profile', async function (req, res, next) {

  let token = req.body.token // Je récupère le token de l'utilisateur envoyé par le front end
  /* Je récupère toutes les infos de l'utilisateur */
  let user_account = await userModel.findOne({
    token: token,
  });
  
  res.json(user_account) // Object :  Je renvoie les informations au front-end
})

// Pour modifier les informations du profil de l'utilisateur
router.put('/update_user_profile', async function (req, res, next) {

  let user_new_informations = req.body.user_new_informations // Je récupère les infos entrées

console.log(user_new_informations.characteristics)
  await userModel.updateOne( 
    { token: user_new_informations.token },
    {
      name: user_new_informations.name,
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
            waist: user_new_informations.waist, 
            bust: user_new_informations.bust, 
            hips: user_new_informations.hips },
      },

      siren: user_new_informations.siren, // 14 chiffre
    }
  );

  res.json({ changement: "terminé" })
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
    photos: [],
    users_selected: projectInfos.userstable, // table de tokens des users selectionnées
    age_min: projectInfos.ageMin,
    age_max: projectInfos.ageMax,
    collaborators_caracteristics: {},
    location: projectInfos.location,

  })

  await newProject.save() // enregistrement dans la base de données


  await userModel.updateOne(
    { token: projectInfos.token },
    { $push: { projects_created: newProject._id } }
  )


  res.json(newProject._id) // je renvoie au front l'état de l'enregistrement dans la BDD


});

router.post('/displayProjects', async function (req, res, next) {
  var token = req.body.token


  var user = await userModel.findOne({ token: token })

  let resultat = []

  for (let i = 0; i < user.projects_created.length; i++) {
    var project = await projectModel.findOne({ _id: user.projects_created[i] })

    resultat.push(project)

  }

  //await user.projects_created.forEach( async (e) => {


  // } )
  //console.log("resultat", resultat)
  res.json(resultat)

})

router.delete('/deleteProject', async function (req, res, next) {


  let idProject = req.query.id
  //console.log("idProject", idProject)
  await projectModel.deleteOne({ _id: idProject });

  //! A revoir
  // ! Ajouter le fait que cela le supprime chez l'utilisateur aussi

  res.json({ deleteStatus: true })

})

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

  let image = './tmp/' + uniqid() + '.jpg'

  let user_token = req.body.token
  let portfolioIndex = req.body.portfolioIndex

  let user = await userModel.findOne({ token: user_token })

  var resultCopy = await req.files.image_uploaded.mv(image);

  if (!resultCopy) {

    var resultCloudinary = await cloudinary.uploader.upload(image);

    user.portfolio[parseInt(portfolioIndex)].images.push(resultCloudinary.url)

    await userModel.updateOne(
      { token: user_token },
      { portfolio: user.portfolio })

    res.json(resultCloudinary);
  } else {
    res.json({ error: resultCopy });
  }

  fs.unlinkSync(image); // suppression de la photo du dossier tmp

});

router.put('/upload_portfolio', async function (req, res, next) {

  let user_token = req.body.token
  let portfolioName = req.body.portfolioName

  let user = await userModel.findOne({ token: user_token })

  const doublePortfolio = user.portfolio.find(element => element.title === portfolioName)

  if (!doublePortfolio) {

    await userModel.updateOne(
      { token: user_token },
      {
        $push: {
          portfolio: {
            title: portfolioName,
            images: []
          }
        }
      })

    res.json({ upload: true })
  }
  else {

    res.json({ upload: false })
  }



});


//? SUPPRESSION
// Pour que l'utilisateur supprime une photo de ses iamges de profil
router.delete('/delete_profile_Image', async function (req, res, next) {

  let profileImageUrl = req.body.profileImageUrl
  let user_token = req.body.token

  await userModel.updateOne(
    { token: user_token },
    { $pull: { profile_photo: profileImageUrl } }
  );

  res.json({ status: "supprimé" })

})

/* Supprimer une photo dans le portfolio */
router.delete('/delete_portfolio_image', async function (req, res, next) {

  let portfolioImageUrl = req.body.portfolioImageUrl
  let user_token = req.body.token

  let portfolioIndex = req.body.portfolioIndex

  let user = await userModel.findOne({ token: user_token })

  let indexOfImage = user.portfolio[parseInt(portfolioIndex)].images.indexOf(portfolioImageUrl)
  user.portfolio[parseInt(portfolioIndex)].images.splice(parseInt(indexOfImage), 1)

  await userModel.updateOne(
    { token: user_token },
    { portfolio: user.portfolio })

  res.json({ status: "supprimé" })

  let deleteresult = await userModel.updateOne(
    { token: user_token },
    {
      $pull: {
        portfolio: {
          title: portfolioTitle,
          images: portfolioImageUrl
        }
      }
    }
  );

})

/* Pour supprimer un portfolio */
router.delete('/delete_portfolio', async function (req, res, next) {


  let user_token = req.body.token
  let portfolioName = req.body.portfolioName

  await userModel.updateOne(
    { token: user_token },
    {
      $pull: {
        portfolio: {
          title: portfolioName
        }
      }
    })

  res.json({ deleteStatus: true })

})

//* ____________________________________ ANNONCES / RECHERCHE / FILTRE ________________________________

// Pour filtrer et chercher les castings correpondant au critères de l'artiste
router.post('/search_casting', async function (req, res, next) {

  let user = await userModel.findOne({ token: req.body.token });


  function getAge(dateString) {
    let ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  let userAge = getAge(user.date_of_birth);



  let matchingProjects = await projectModel.find(
    { gender: user.characteristics.gender, location: user.location, age_min: { $lt: userAge }, age_max: { $gt: userAge } }
  )

  let lolo = await projectModel.find(
   
  )

  console.log(lolo)

  // RAPPEL : RAJOUTER COLLABORATORS : USER.OCCUPATION DANS LES FILTRES

  res.json({ matchingProjects })

})

// Affichage des artistes correspondants aux critères du projet
router.post('/search_artist', async function (req, res, next) {

  let project = await projectModel.findById(req.body.id)
  console.log('PROJECT :', req.body.id);
  
  let matchingUsers = await userModel.find({ location: project.location, occupation: project.collaborators })
  console.log('MATCHING USERS :', matchingUsers.length);

  res.json({ matchingUsers })
})

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
