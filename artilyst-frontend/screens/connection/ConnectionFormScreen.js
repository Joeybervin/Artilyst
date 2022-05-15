import React, { useState } from 'react';

// & import des urls de chacune
import {expoUrlJoey} from '../../ExpoUrl';


// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet,  View } from 'react-native';
import { Text, Input, Button } from '@rneui/base';

// ^Redux
import { connect } from 'react-redux';

function ConnectionFormScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false)
    /* VARIABLES */
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    const signInUser = async () => {
        const rawResponse = await fetch(`http://${expoUrlJoey}/sign-in`, {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${email}&password=${password}`,
        })

        let response = await rawResponse.json() // Object : Réponse du back-end

        /* Si l'utilisateur n'existe pas */
        if (response.already_member === true) {
            setLogin(true)
            props.navigation.navigate('PagesStacks') // redirection vers le profil
            props.getUser({user_token : response.token}) // J'ajoute les informations dans mon store
        }
        else {
            console.log("Ce compte existe déjà")
        }
    }
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */


    // * ___________________________ PAGE ___________________________
    
    return (
        <View style={styles.container}>
        
            <Text>ConnectionFormScreen</Text>

             {/* Email */}
            <Input
                placeholder='Email'
                onChangeText={setEmail} value={email}
            />

            {/* Mot de passe */}
            <Input
                placeholder="Password"
                onChangeText={setPassword} value={password}
                secureTextEntry={true} // Pour cacher le mot de passe
            />

            <Button
                buttonStyle={{ backgroundColor: '#3BA58B', margin: 5 }}
                title="Connexion"
                onPress={() => signInUser()}
            />

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
        getUser: function (user) {
            dispatch({ type: 'userConnection', user })

        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ConnectionFormScreen);
