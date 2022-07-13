var express = require('express');
var router = express.Router();
const faker = require("@faker-js/faker");

// ^ Models
var userModel = require('../models/user');
var projectModel = require('../models/project');

router.post('/databaseSeedUsers', async function (req, res, next) {

  let data = req.body.data
  let tokensList = [];

  console.log("data");

  
console.log("tokensList : " , tokensList);

res.json( {response : true})
  
  });

router.post('/databaseSeedCastings', async function (req, res, next) {

  let data = req.body.data;
  let projectsIdLlist = [];

  console.log(data);

  for (let i = 0; i < data.length; i++) {

    let newProjects = new projectModel({

  title: data[i].title,
  owner : data[i].owner, // token : de l'utilisateur qui la créé
  description : data[i].description,
  collaborators : data[i].collaborators,
  insert_date : data[i].insert_date, 
  project_dates : { 
      start_date : data[i].project_dates.start_date,
      end_date : data[i].project_dates.end_date,
  }, 
  category : data[i].category,
  remuneration : data[i].remuneration,
  photos : data[i].collaborators_characteristics.photos,
  users_selected : data[i].collaborators_characteristics.users_selected,
  location : data[i].location,

  collaborators_characteristics : {
      age_min: data[i].collaborators_characteristics.age_min,
      age_max: data[i].collaborators_characteristics.age_max,

      gender: data[i].collaborators_characteristics.gender, 

      ethnicGroup: data[i].collaborators_characteristics.ethnicGroup,
      hair: data[i].collaborators_characteristics.hair, 
      eyes: data[i].collaborators_characteristics.eyes,

      height: {
          min : data[i].collaborators_characteristics.height.min,
          max : data[i].collaborators_characteristics.height.max,
      }, 
      weight: {
          min : data[i].collaborators_characteristics.weight.min,
          max : data[i].collaborators_characteristics.weight.max,
      }, 
      corpulence: {
          min : data[i].collaborators_characteristics.corpulence.min,
          max : data[i].collaborators_characteristics.corpulence.max,
      },
      measurements: { 
          waist: {
              min : data[i].collaborators_characteristics.measurements.waist.min,
              max : data[i].collaborators_characteristics.measurements.waist.max,
          }, 
          bust: {
              min : data[i].collaborators_characteristics.measurements.bust.min,
              max : data[i].collaborators_characteristics.measurements.bust.max,
          }, 
          hips: {
              min : data[i].collaborators_characteristics.measurements.hips.min,
              max : data[i].collaborators_characteristics.measurements.hips.max,
          } },
      },
      test : data[i].test,
    } )

    await newProjects.save() // enregistrement dans la base de données

    projectsIdLlist.push(newProjects._id)

}

console.log("projectsIdLlist : " , projectsIdLlist);

res.json( {response : true})
  
  });

  

module.exports = router;
