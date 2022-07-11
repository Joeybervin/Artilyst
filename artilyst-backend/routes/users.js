var express = require('express');
var router = express.Router();

// ^ Models
var userModel = require('../models/user');
var projectModel = require('../models/project');

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
  console.log("TOKEN IN THE USER ROUTER : ",token)
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

//* ____________________________________ PHOTOS / GALLERY ________________________________

//* AJOUT *//
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


//* SUPPRESSION *//
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

//* ____________________________________ PROJET ________________________________

// Creer un projet 
router.post('/CreateProject', async function (req, res, next) {

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


module.exports = router;
