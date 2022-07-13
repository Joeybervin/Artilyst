import { expoUrlJoey } from './ExpoUrl';
import { faker } from '@faker-js/faker';

    /* Listes des choix possibles */
    const hairColorList = ["blond/e","brun/e","noir","gris","blanc","roux","chatain","couleur"]
    const eyesColorsList = ["bleu","marron","vairon","vert","noir","gris","autre"]
    const ethnicGroupList = ["afro","asiatique","caucasien/ne","hispanique","indien/ne","oriental/e"]
    const corpulenceList = ["athnétique","enrobé/e","curvy","fin/e","maigre","musclé/e","moyen/ne","bodybuildé/e"]

    const citiesList = ["Paris","Lille","Marseille","Bordeaux","Lyon"]
    const artistsSelectedTokenList = [];

    const getRandomImagesUnsplash = async (count,imageCategory) => {

        const clientIdUnsplash = "bmUwkCOfegLGk9HGqY9rRvUV20OPwFaaiasWlXYYDuI";

        const rawResponseUnsplash = await fetch(`https://api.unsplash.com/photos/random?count=${count}&query=${imageCategory}&client_id=${clientIdUnsplash}`, {});
        let unsplashResponse = await rawResponseUnsplash.json();
        let unsplashImages = [];
        for (let i = 0; i < unsplashResponse.length; i++) {
            unsplashImages.push(unsplashResponse[i].urls.raw)
        }

        return unsplashImages; // retourne un tableau d'images
    };
    
    const createPortfolioList = async (numberOfPortfolio, imageCategoryPorfolio) => {
        let portfolioList = [];
        for (let i = 0; i < numberOfPortfolio; i++) {
            portfolioList.push({
                title : faker.random.word(),
                images : await getRandomImagesUnsplash(3,imageCategoryPorfolio)
                })
            
        }
        return portfolioList;
    }

    export async  function createFakeUserData(gender,genderBoolean,occupation,imageCategoryProfil,numberOfPortfolio,imageCategoryPorfolio) {

        // gender = male / female
        // genderBoolean = true => F / false => M
        // occupation = ["comédien/ne","modèle", "photographe","styliste","réalisateur/ice vidéaste","recrutuer"]
        // imageCategoryProfil = nom de la catégorie d'images pour le profil
        // numberOfPortfolio = nombre de portfolio
        // imageCategoryPorfolio = nom de la catégorie d'images pour le portfolio

        
        let data = [];
        
        for (let i = 0; i < 1 ; i++) {

            let fakeUserData = {};
            const name = faker.name.firstName(`${gender}`);

            if (occupation === "recruteur") {
                fakeUserData = {
                    name : faker.company.companyName(),
                    email :  name,
                    password :  "$2y$10$xMD/f9Nuhz3Qh8LilG4xqOs5dozUjPDhGJqz9fVvDzk79iwzCUIu6",
                    occupation : occupation,
                    description: faker.company.bs(),
                    cv : null,
                    profile_photo : getRandomImagesUnsplash(1,imageCategoryProfil),
                    portfolio :  [
                    {
                    title : faker.random.word(),
                    images : getRandomImagesUnsplash(1,imageCategoryPorfolio)
                    }
                    ],
                    projects_selected :  null , // Object => id du projet + match en booleen
                    projects_created : [],
                    insert_date: faker.date.between('2018-01-01T00:00:00.000Z', '2021-01-01T00:00:00.000Z'),
                    date_of_birth :  faker.date.birthdate({ min: 18, max: 40, mode: 'age' }),
                    characteristics : null,
                    location : faker.helpers.arrayElement(citiesList),
                    token : faker.datatype.uuid(),
                    siren : faker.random.numeric(14),
                    test : true,
                }

                    
            } 
            else {
                fakeUserData = {
                    name : faker.name.findName(`${name}`),
                    email :  name,
                    password :  "$2b$10$m2sA3GCTyUjIqGt30/AImOGlxb1qZ3lqUonVc6.G08L/n5ztztB0u",
                    occupation : occupation,
                    description: faker.fake('Mannequin avec 2 ans d’expérience, j’ai déjà travaillé avec la grande marque {{company.companyName}}. Patiente et persévérante, je maîtrise parfaitement les techniques d’expression corporelle. Je suis disponible de suite pour étoffer votre équipe de mannequins.'),
                    cv : faker.fake("Novembre 2015 - présent - Mannequin de mode, {{company.companyName}}, Paris \n\t- Projets éditoriaux print : {{company.companyName}} magazine juin 2018, {{company.companyName}} avril 2017 fashion editorial pour {{company.companyName}}. \n\t- Campagnes et lookbooks : {{name.lastName}} {{name.firstName}}  Lookbook 2020, {{company.companyName}} campagne web 2019, {{company.companyName}} lookbook 2016… \n\t- Commercial : catalogue {{company.companyName}}.com, {{company.companyName}} catalogue France ({{company.companyName}}, {{company.companyName}}, {{company.companyName}}, {{company.companyName}}) \n\t- Juillet 2013 - octobre 2015 - Mannequin cabine, {{name.lastName}} {{name.firstName}} , Paris \n\t- Mannequin cabine taille 36 pour les collections de la marque de prêt-à-porter haut de gamme {{name.lastName}} {{name.firstName}}  \n\t- Réaliser les essayages des pièces sélectionnées en présences des équipes de création, bureau d'études, achat… \n\t- Partager tout ressenti et avis utile auprès des équipes concernant le bien aller du vêtement, son confort, son utilisation...\n\nLangues \nFrançais : Langue maternelle \n\t- Anglais : Professionnel (C2, TOEIC, score 790/990, 2019) \n\nRéférences \nRéférences disponibles sur demande"),
                    profile_photo : await getRandomImagesUnsplash(1,imageCategoryProfil),
                    portfolio :  await createPortfolioList(numberOfPortfolio,imageCategoryPorfolio),
                    projects_selected :  [] , // Object => id du projet + match en booleen
                    projects_created : [],
                    insert_date: faker.datatype.datetime(1893456000000) ,
                    date_of_birth :  faker.date.birthdate({ min: 18, max: 40, mode: 'age' }),
                    characteristics : {
                        gender: faker.name.gender(genderBoolean), 
                        ethnicGroup: faker.helpers.arrayElement(ethnicGroupList),
                        hair: faker.helpers.arrayElement(hairColorList), 
                        eyes: faker.helpers.arrayElement(eyesColorsList), 
                        height: faker.datatype.number({ min: 1, max: 2, precision: 0.01 }), 
                        weight: faker.mersenne.rand(40, 100), 
                        corpulence: faker.helpers.arrayElement(corpulenceList),
                        measurements: { 
                            waist: faker.mersenne.rand(120, 40), 
                            bust: faker.mersenne.rand(130, 65), 
                            hips: faker.mersenne.rand(150, 40) },
                    },
                    location : faker.helpers.arrayElement(citiesList),
                    token : faker.datatype.uuid(),
                    siren : null,
                    test : true,
                }

            }

            data.push(fakeUserData);

        }
        const rawResponse = await fetch(`http://${expoUrlJoey}/databaseSeeder/databaseSeedUsers`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data: data}),
        })
        let response = await rawResponse.json();
        console.log("response : ", response )
       

       
        
    }

    export async function createFakeCastingData(collaborators,category, genderBoolean, imageCategoryProfil)  {

        // genderBoolean = true => F / false => M
        // collaborators = ["comédien/ne","modèle", "photographe","styliste","réalisateur/ice vidéaste","recrutuer"]
        // category = ["Création textile", "Défilé", "Évènement / Vernissage", "Court métrage", "Long métrage", "Série", "Spot publicitaire", "Shooting"]

        let data = [];
        let height_min = faker.datatype.number({ min: 1, max: 2, precision: 0.01 });
        let weight_min = faker.datatype.number({ min: 40, max: 100}) ;
        let waist_min = faker.datatype.number({ min: 40, max: 120});
        let bust_min = faker.datatype.number({ min: 65, max: 130});
        let hips_min = faker.datatype.number({ min: 40, max: 150});
        

        for (let i = 0; i < 1 ; i++) {

            let fakeCastingsData = {

                title: "Recherche d' " + faker.helpers.arrayElement(["un","une"]) + " " + collaborators + " pour " + category.toLowerCase() ,
                owner : "", // A CHANGER
                description : faker.lorem.paragraphs(2),
                collaborators : collaborators,
                insert_date : faker.date.between('2021-01-01T00:00:00.000Z', '2022-07-13T00:00:00.000Z'), 
                project_dates : {
                    start_date : faker.date.between('2022-01-01T00:00:00.000Z', '2022-03-03T00:00:00.000Z'),
                    end_date : faker.date.between('2022-04-03T00:00:00.000Z', '2022-07-07T00:00:00.000Z')
                },
                category : category,
                remuneration : faker.datatype.boolean(),
                photos : await getRandomImagesUnsplash(3,imageCategoryProfil),
                users_selected : [],
                location : faker.helpers.arrayElement(citiesList),
                collaborators_characteristics : {
                    age_min: 18,
                    age_max: faker.datatype.number({ max: 40, min: 25 }),
                    gender: faker.name.gender(genderBoolean), 
                    ethnicGroup: faker.helpers.arrayElement([null , faker.helpers.arrayElements(ethnicGroupList, 2) ]), // MULTI LISTE
                    hair: faker.helpers.arrayElement([hairColorList , faker.helpers.arrayElements(hairColorList, 3)]), // MULTI LISTE
                    eyes: faker.helpers.arrayElement([null , faker.helpers.arrayElements(eyesColorsList, 3)]), // MULTI LISTE
                    height: faker.helpers.arrayElement([ {min : 1, max : 2} , {min : height_min , max : faker.datatype.number({ min: height_min, max: 2, precision: 0.01 })}]), // INTERVAL
                    weight: faker.helpers.arrayElement([{min : 40 , max : 100} , {min : weight_min , max : faker.datatype.number({ min: weight_min, max: 100})}]), // INTERVAL
                    corpulence: faker.helpers.arrayElement([null , faker.helpers.arrayElement(corpulenceList)]), // MULTI LISTE
                    measurements: { 
                        waist: faker.helpers.arrayElement([{min : 40 , max : 120} , {min : waist_min , max : faker.datatype.number({ min: waist_min, max: 120})}]), // INTERVAL
                        bust: faker.helpers.arrayElement([{min : 65 , max : 130} , {min : bust_min , max : faker.datatype.number({ min: bust_min, max: 130})}]), // INTERVAL
                        hips: faker.helpers.arrayElement([{min : 40 , max : 150} , {min : hips_min , max : faker.datatype.number({ min: hips_min, max: 150 })}])  // INTERVAL
                    },
                },
                test : true,
            }

            data.push(fakeCastingsData)
        }

        console.log("data",data)
        //return data

        
    }
