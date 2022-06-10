import React, { useState } from 'react';

// & import des urls de chacune
import { expoUrlJoey } from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Text, Divider } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as Badges from '../components/BadgesComponent'
//import * as Buttons from '../components/ButtonsComponent'

// ^Redux
import { connect } from 'react-redux';

import { GreenFullButton, BlackFullButton} from '../components/ButtonsComponent';
import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';

function RegisterFormScreen2(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________

    /* VARIABLES D'ÉTAT  */
    const userInfos = props.route.params // récupération des données entrées par l'utilisateur sur la screen précédente avec les paramètres
    const [userOccupation, setUserOccupation] = useState("")
    const [login, setLogin] = useState(false)
    let userOccupationSelected = false // vérifie si l'utilisateur à bien clické sur un bouton
    const [messageError, setMessageError] = useState("")

    /* VARAIBLES */
    let domaines = ["comédien/ne","Modèle", "Photographe","Styliste","Réalisateur/ice vidéaste","option"]

    // * ___________________________ FUNCTIONS ___________________________

    const addUserOccupation = (userOccupation) => { // ajoute le métier aux données envoyées en BDD 
        setUserOccupation(userOccupation)
        userInfos['occupation'] = userOccupation // Ajout du choix à l'objet qui sera transmis à la base de données
        userOccupationSelected = true // Rend le button "créer un compte" cliquable
    }

    const signUpUser = async () => { // sauvegarder un utilisateur dans la base de données
        const rawResponse = await fetch(`http://${expoUrlJoey}/sign-up`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInfos: userInfos }),
        })

        let response = await rawResponse.json() // OBJECT : Réponse du back-end

        /* Si l'utilisateur n'existe pas */
        if (response.new_user === true) {
            setLogin(true)
            props.getUserInformations(response.user) // OBJECT : J'ajoute les informations dans mon store
            props.navigation.navigate('PagesStacks') // redirection vers le Annonce

        }
        else {
            setMessageError("Ce compte existe déjà dans notre base de données")
        }

    }

    // * ___________________________ AFFICHAGE PAGE ___________________________



    // * ___________________________ PAGE ___________________________

    return (
        <View style={styles.container}>

            <Text style={{ marginBottom: 15, fontWeight: 'bold', fontSize : 25 }}>Choisissez votre domaine</Text>

            {/* Options des métiers à choisir */}

                <View dir="row" align="center" spacing={4}>
                <Badges.SmallBadgesPlus
                    data={domaines}
                    option={'recruteur'}
                    badgeColorOption={'#333333'}
                    badgeTextColorOption={'#ffffff'}
                    onPressHandler={(value) => {
                        addUserOccupation(value)
                    }}
                />
                </View>


            <Divider
                style={{ width: "70%", margin: 20 }}
                color="black"
                width={1}
            />

            


            
            {/* Message d'erreur si compte déjà existan */}
            <Text>{messageError}</Text>

            <View style={{ flexDirection: 'row', marginTop: 50 }}>
              

                <BlackFullButton title='retour' onPress={() => props.navigation.navigate('RegisterFormScreen1', userInfos)}/>

              {/*   <Button onPressHandler={() => signUpUser()}></Button> */}
              <GreenFullButton onPressHandler={() => signUpUser()} title='créeer un compte'/>
                

            </View>




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
    smallCards: {
        alignItems: 'center',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0,
        width: "100%",
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        padding: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    smallCardGrey : {
        backgroundColor: '#f4f4f4'
    },
    smallCardColor : {
       width : 200,
        backgroundColor: '#333333'
    },
    // -- GLOBAL STYLE ----------
    pageBackground: {
        ...pageBackground
    },
    title: {
        ...title
    },
    subTitle: {
        ...subTitle
    },
    textRegular: {
        ...textRegular
    },
    cardTitle: {
        ...cardTitle
    },
    cardText: {
        ...cardText
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
)(RegisterFormScreen2);

