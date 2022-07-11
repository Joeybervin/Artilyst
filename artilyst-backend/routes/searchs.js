var express = require('express');
var router = express.Router();

// ^ Models
var userModel = require('../models/user');
var projectModel = require('../models/project');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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
  
    // let lolo = await projectModel.find()
  
    // console.log(lolo)
  
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

module.exports = router;
