var express = require('express');
var router = express.Router();
const faker = require("@faker-js/faker");

// ^ Models
var userModel = require('../models/user');
var projectModel = require('../models/project');

router.post('/databaseSeedUser', async function (req, res, next) {

  let name = faker.name.firstName('female');

  console.log(name);

  for (let i = 0; i < 5; i++) {

  let name = faker.name.firstName('female');

  var newUsers = new userModel({
    name : faker.name.findName(`${name}`),
    email :  name,
    password :  "$2y$10$xMD/f9Nuhz3Qh8LilG4xqOs5dozUjPDhGJqz9fVvDzk79iwzCUIu6",
    occupation : "modèle",
    description: faker.lorem.lines(),
    cv : faker.lorem.paragraphs(),
    profile_photo : [`${faker.image.people()}`],
    portfolio :  [
      {
      title : faker.random.word(),
      images : [faker.image.imageUrl(undefined, undefined, 'model girl', true )]
      }
    ],
    projects_selected :  [] , // Object => id du projet + match en booleen
    projects_created : [],
    insert_date: faker.datatype.datetime(1893456000000) ,
    date_of_birth :  faker.date.birthdate({ min: 18, max: 40, mode: 'age' }),
    characteristics : {
        gender: faker.name.gender(true), 
        ethnicGroup: faker.helpers.arrayElement(["afro","asiatique","caucasien/ne","hispanique","indien/ne","oriental/e"]),
        hair: faker.helpers.arrayElement(["blond/e","brun/e","noir","gris","blanc","roux","chatain","couleur"]), 
        eyes: faker.helpers.arrayElement(["bleu","marron","vairon","vert","noir","gris","autre"]), 
        height: faker.datatype.number({ min: 1, max: 2, precision: 0.01 }), 
        weight: faker.mersenne.rand(40, 200), 
        corpulence: faker.helpers.arrayElement(["athnétique","enrobé/e","curvy","fin/e","maigre","musclé/e","moyen/ne","bodybuildé/e"]),
        measurements: { 
            waist: faker.mersenne.rand(120, 40), 
            bust: faker.mersenne.rand(130, 65), 
            hips: faker.mersenne.rand(150, 40) },
      },
    location : faker.helpers.arrayElement(["Paris","Lille","Marseille","Bordeaux","Lyon"]),
    token : faker.datatype.uuid(),
    siren : null,
  } )

  await newUsers.save() // enregistrement dans la base de données

}

res.json( {response : true})
  
  });

  

module.exports = router;
