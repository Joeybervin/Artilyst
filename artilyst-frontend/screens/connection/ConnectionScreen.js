import React, { useEffect, useState } from 'react';
import { expoUrlJoey } from '../../ExpoUrl';

// Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);
// balise
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/base';
import Svg, { Path } from "react-native-svg"
// componsants
import { BigOutlineButtonLieanerGradient } from '../components/ButtonsComponent';
// style
import {title} from '../components/GlobalStyles';

// modules de stockage
import { connect } from 'react-redux';
//import AsyncStorage from '@react-native-async-storage/async-storage';

import { faker } from '@faker-js/faker';
function ConnectionScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [userData, setUserData] = useState({})
    /* VARIABLES */
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    useEffect(() => {
        /* AsyncStorage.getItem("user", function (error, token) {
            if (token) {
                const rawResponse = fetch(`http://${expoUrlJoey}/user_profile`, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `token=${token}`
            })
            let response = rawResponse.json();
            let responseCopy = { ...response }
            props.getUserInformations(responseCopy)
            props.navigation.navigate('PagesStacks')
            
            }
            else {
              console.log('Pas encore dans le local storage')
            }
          }); */
        async function loadData() {
            
            const rawResponse = await fetch(`http://${expoUrlJoey}/users/user_profile`, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `token=WTBNc1Uk9qyA6QGRhlhyIqXbJygw3bdZ`
            })
            let response = await rawResponse.json();
            let responseCopy = { ...response }
            setUserData(responseCopy)
            console.log(userData)
            

        }
        loadData();
    }, []);

    // * ___________________________ FUNCTIONS ___________________________

    /* Pour créer une fausse base de sonnées */
    async function fakeData() {

    const data = []
    
    for (let i = 0; i < 5 ; i++) {

        let name = faker.name.firstName('female');
        const clientId = "bmUwkCOfegLGk9HGqY9rRvUV20OPwFaaiasWlXYYDuI";

        const url = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + clientId;


        let newData = {
            name : faker.name.findName(`${name}`),
            email :  name,
            password :  "$2y$10$xMD/f9Nuhz3Qh8LilG4xqOs5dozUjPDhGJqz9fVvDzk79iwzCUIu6",
            occupation : "modèle",
            description: faker.lorem.lines(),
            cv : faker.lorem.paragraphs(2),
            profile_photo : [`${faker.image.imageUrl(undefined, undefined, 'woman', true )}`],
            portfolio :  [
            {
            title : faker.random.word(),
            images : [faker.image.imageUrl(undefined, undefined, 'model', true )]
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
                weight: faker.mersenne.rand(40, 100), 
                corpulence: faker.helpers.arrayElement(["athnétique","enrobé/e","curvy","fin/e","maigre","musclé/e","moyen/ne","bodybuildé/e"]),
                measurements: { 
                    waist: faker.mersenne.rand(120, 40), 
                    bust: faker.mersenne.rand(130, 65), 
                    hips: faker.mersenne.rand(150, 40) },
            },
            location : faker.helpers.arrayElement(["Paris","Lille","Marseille","Bordeaux","Lyon"]),
            token : faker.datatype.uuid(),
            siren : null,
        } 

        data.push(newData)
    }

    console.log(data.length)
    console.log(data)
        

    }

    /* Component pour afficher le logo */
    const SvgComponent = (props) => (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 323.4 533.2"
            width={70}
            height={70}
            style={{
                enableBackground: "new 0 0 323.4 533.2",

            }}
            xmlSpace="preserve"
            {...props}
        >
            <Path
                d="m216 417.2-135.2 116H0L102.3 0h113.3l107.8 533.2h-84.8l-22.6-116zM201.9 341l-43.7-238.7L115.6 341h86.3z"
                style={{
                    fill: "#000",
                }}
            />
        </Svg>
    )

    // * ___________________________ PAGE ___________________________
    return (
        <View style={styles.container}>

            <SvgComponent />
            <Text h1 style={styles.title} onPress={() => fakeData()}>SAVE NEW USERS</Text>
            <Text style={styles.title}>Bienvenue sur Artilyst.</Text>
            
            <BigOutlineButtonLieanerGradient title={"Application"} 
                onPressHandler={() => {
                    props.getUserInformations(userData)
                    props.navigation.navigate('PagesStacks')
                    //props.navigation.navigate('ConnectionFormScreen')
                }} />
                 <BigOutlineButtonLieanerGradient title={"Se connecter"} 
                onPressHandler={() => {
                    props.navigation.navigate('ConnectionFormScreen')
                }} />

            <BigOutlineButtonLieanerGradient title={"Créer un compte"}
                onPressHandler={() => props.navigation.navigate('RegisterFormScreen1')}
            />

            <Text>Premier pas ? Venez ddécouvrir l'application</Text>
        
        </View>
    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // -- GLOBAL STYLE ----------
    title: {
        ...title
    }


});

// * ___________________________ REDUX ___________________________
function mapDispatchToProps(dispatch) {
    return {
        getUserInformations: function (user) {
            dispatch({ type: 'userConnection', user })

        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ConnectionScreen);