import React, { useState } from 'react';

// & import des urls de chacune
import { expoUrlJoey } from '../../ExpoUrl';

// wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

// framwework
import { StyleSheet, View } from 'react-native';
// librairies
import { Text, Divider } from '@rneui/base';
import * as Badges from '../components/BadgesComponent'
import { FullButton} from '../components/ButtonsComponent';
// style
import { title } from '../components/GlobalStyles';
// stockage
import { connect } from 'react-redux';




function RegisterFormScreen2(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________

    /* VARIABLES D'ÉTAT  */
    const userInfos = props.route.params // récupération des données entrées par l'utilisateur sur la screen précédente avec les paramètres
    const [userOccupation, setUserOccupation] = useState("")
    const [userOccupationSelected, setUserOccupationSelected] = useState(false) // vérifie si l'utilisateur à bien clické sur un bouton
    const [messageError, setMessageError] = useState("")

    /* VARAIBLES */
    let domaines = ["comédien/ne","modèle", "photographe","styliste","réalisateur/ice vidéaste","option"]

    // * ___________________________ FUNCTIONS ___________________________

    const addUserOccupation = (userOccupation) => { // ajoute le métier aux données envoyées en BDD 
        setUserOccupation(userOccupation)
        userInfos['occupation'] = userOccupation // Ajout du choix à l'objet qui sera transmis à la base de données
        setMessageError(null)
        setUserOccupationSelected(true) // Rend le button "créer un compte" cliquable
        
    }

    const signUpUser = async () => { // sauvegarder un utilisateur dans la base de données

        if (userOccupationSelected) { // l'utilisateur ne peut se connecter que s'il selectionne un domaine
            const rawResponse = await fetch(`http://${expoUrlJoey}/sign-up`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userInfos: userInfos }),
            })
    
            let response = await rawResponse.json() // OBJECT : Réponse du back-end
    
            /* Si l'utilisateur n'existe pas */
            if (response.new_user === true) {
                props.getUserInformations(response.user) // OBJECT : J'ajoute les informations dans mon store
                props.navigation.navigate('PagesStacks') // redirection vers les Annonces
    
            }
            else {
                setMessageError("Ce compte existe déjà dans notre base de données")
            }

        }
        else {
            setMessageError("Vous devez selectionner un domaine")
        }
       

    }

    // * ___________________________ PAGE ___________________________

    return (
        <View style={styles.container}>

            <Text style={{ marginBottom: 40, fontWeight: 'bold', fontSize : 25 }}>Choisissez votre domaine</Text>

            {/* domaines */}

            {userOccupation !== "" ? <Text style={{ marginBottom: 40 }}>domaine : {userOccupation}</Text> : null}

            <View style={{flexDirection : "column", width : "80%", alignText : "center"}}>

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

            <View style={{ flexDirection: 'row', marginTop: 15 }}>

            <FullButton title='retour' 
            buttonTextColor={'#ffffff'} buttonColor={'#000000'} 
            onPressHandler={() => props.navigation.navigate('RegisterFormScreen1', userInfos)}
            />

            <FullButton title='créer un compte'
            onPressHandler={() => signUpUser()}
            />
                
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
    // -- GLOBAL STYLE ----------
    title: {
        ...title
    },
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

