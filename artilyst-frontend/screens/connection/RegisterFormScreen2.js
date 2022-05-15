import React, { useState } from 'react';

// & import des urls de chacune
import {expoUrlJoey} from '../url';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Button, Text, Divider } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^Redux
import { connect } from 'react-redux';

function RegisterFormScreen2(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________


    /* VARIABLES D'ÉTAT  */

    const [userInfos, setUserInfos] = useState(props.route.params)// récupération des données entrées par l'utilisateur sur la screen précédente avec les paramètres
    const [userOccupation, setUserOccupation] = useState("")
    const [login, setLogin] = useState(false)
    /* VARIABLES */

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    /* Pour ajouter le métier de l'utilisateur au données qui seront envoyées à la base de données  */
    const addUserOccupation = (userOccupation) => {
        setUserOccupation(userOccupation)
        userInfos['occupation'] = userOccupation
    }

    /* fonction pour sauvegarder un utilisateur dans la base de données */
    const saveNewUser = async () => {
        const rawResponse = await fetch(`http://${expoUrlJoey}/sign-up`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userInfos : userInfos}),
        })

        let response = await rawResponse.json() // Object : Réponse du back-end

        /* Si l'utilisateur n'existe pas */
        if (response.new_user === true) {
            setLogin(true)
            props.navigation.navigate('PagesStacks') // redirection vers le profil
            props.addnewUser({user_token : response.token}) // J'ajoute les informations dans mon store
        }
        else {
            console.lopg("Ce compte existe déjà")
        }
        
    }
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */


    // * ___________________________ PAGE ___________________________

    return (
        <View style={styles.container}>


            <Text>Sign-up</Text>

            <View dir="row" align="center" spacing={4}>

                <Button
                    buttonStyle={{ backgroundColor: '#229EE6' }}
                    title="Comédien/ne"
                    onPress={() => addUserOccupation("Comédien/ne")}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#B36FDB' }}
                    title="Modèle"
                    onPress={() => addUserOccupation("Modèle")}
                />
                <Button
                    buttonStyle={{ backgroundColor: '#F3DC5C' }}
                    title="Photographe"
                    onPress={() => addUserOccupation("Photographe")}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#D8568C' }}
                    title="Styliste"
                    onPress={() => addUserOccupation("Styliste")}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#3711A1' }}
                    title="Réalisateur/ice vidéaste"
                    onPress={() => addUserOccupation("Réalisateur/ice vidéaste")}
                />

            </View>

            <Divider
                style={{ width: "100%", margin: 20 }}
                color="black"
                width={1}
            />

            <Button
                buttonStyle={{ backgroundColor: '#508CB4' }}
                title="recruteur"

                onPress={() => addUserOccupation("recruteur")}
            />

            <View style={{ flexDirection: 'row', marginTop: 50 }}>

                <Button
                    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                    title="retour"
                    onPress={() => props.navigation.navigate('RegisterFormScreen1', userInfos)}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#3BA58B', margin: 5 }}
                    title="Créer un compte"
                    onPress={() => saveNewUser()}
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
    }
});

// * ___________________________ REDUX ___________________________
function mapDispatchToProps(dispatch) {
    return {
        addnewUser: function (user) {
            dispatch({ type: 'addUser', user })

        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(RegisterFormScreen2);

