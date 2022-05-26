import React, { useState } from 'react';

// & import des urls de chacune
import {expoUrlJoey } from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Button, Text, Divider } from '@rneui/base';

// ^Redux
import { connect } from 'react-redux';

function RegisterFormScreen2(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________

    /* VARIABLES D'ÉTAT  */
    const [userInfos, setUserInfos] = useState(props.route.params)// récupération des données entrées par l'utilisateur sur la screen précédente avec les paramètres
    const [userOccupation, setUserOccupation] = useState("")
    const [login, setLogin] = useState(false)
    const [userOccupationClicked, setUserOccupationClicked]  = useState(true) // vérifie si l'utilisateur à bien clické sur un bouton
    const [messageError, setMessageError] = useState("")

    // * ___________________________ FUNCTIONS ___________________________

    const addUserOccupation = (userOccupation) => { // Pour ajouter le métier de l'utilisateur au données qui seront envoyées à la base de données  
        setUserOccupation(userOccupation)
        userInfos['occupation'] = userOccupation // Ajour=t du choix à l'objet qui sera transmis à la base de données
        setUserOccupationClicked(false) // Rend le button "créer un compte" cliquable
    }

    const signUpUser = async () => { // sauvegarder un utilisateur dans la base de données
        const rawResponse = await fetch(`http://${expoUrlJoey}/sign-up`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userInfos : userInfos}),
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

    // * ___________________________ PAGE ___________________________

    return (
        <View style={styles.container}>

            <Text>Sign-up</Text>

            {/* Options des métiers à choisir */}
            <View dir="row" align="center" spacing={4}>

                <Button
                    buttonStyle={{ backgroundColor: '#1ADBAC' }}
                    title="Comédien/ne"
                    onPress={() => addUserOccupation("comédien/ne")}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#16B88F' }}
                    title="Modèle"
                    onPress={() => addUserOccupation("modèle")}
                />
                <Button
                    buttonStyle={{ backgroundColor: '#109171' }}
                    title="Photographe"
                    onPress={() => addUserOccupation("photographe")}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#0B664F' }}
                    title="Styliste"
                    onPress={() => addUserOccupation("styliste")}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#074233' }}
                    title="Réalisateur/ice vidéaste"
                    onPress={() => addUserOccupation("réalisateur/ice vidéaste")}
                />

            </View>

            <Divider
                style={{ width: "100%", margin: 20 }}
                color="black"
                width={1}
            />

            {/* Bourrons pour les recruteur */}
            <Button
            containerStyle={{width : 210}}
                buttonStyle={{ backgroundColor: '#AD4DB9' }}
                title="Recruteur"

                onPress={() => addUserOccupation("recruteur")}
            />

            {/* Message d'erreur si compte déjà existan */}
            <Text>{ messageError }</Text>

            <View style={{ flexDirection: 'row', marginTop: 50 }}>

                <Button
                    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                    title="retour"
                    onPress={() => props.navigation.navigate('RegisterFormScreen1', userInfos)}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                    title="Créer un compte"
                    onPress={() => signUpUser()}
                    disabled={userOccupationClicked}
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
        getUserInformations: function (user) {
            dispatch({ type: 'userConnection', user })
        }
}}

export default connect(
    null,
    mapDispatchToProps
)(RegisterFormScreen2);

