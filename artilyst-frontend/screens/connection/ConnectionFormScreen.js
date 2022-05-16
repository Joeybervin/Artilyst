import React, { useState } from 'react';

// & import des urls de chacune
import {expoUrlJoey} from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet,  View} from 'react-native';
import { Text, Input, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons'; 

// ^ React navigation
import { Link } from '@react-navigation/native';

// ^Redux
import { connect } from 'react-redux';

function ConnectionFormScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [email, setEmail] = useState(""); // champs de l'email
    const [emailError, setEmailError] = useState(""); // message d'erreur de l'email
    const [password, setPassword] = useState("");// champs du mot de passe
    const [passwordError, setPasswordError] = useState(""); // message d'erreur du mot de passe

    const [passwordVisibility, setPasswordVisibility] = useState(true); // Changement de la visibilité du mot de passe

    const [login, setLogin] = useState(false); // condition pour envoyer la donné au back-end
    const [newMemberMessage, setNewMemberMessage] = useState("") // renvoie d'un message si la base de données n'a pas trouvé l'utilisateur
    
    /* VARIABLES */
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    /* Check des erreurs possible à la submission du formulaire de connexion*/
    const handleSubmit = () => {
        var emailValid = false;
        if(email.length == 0){
            setEmailError("Ce champs est obligatoire");
        }      
        else if(email.indexOf(' ') >= 0){        
            setEmailError('Un email ne peut contenit d\'espaces');                          
        }    
        else{
            setEmailError("")
            emailValid = true
        }
    
        var passwordValid = false;
        if(password.length == 0){
            setPasswordError("Ce champs est obligatoire");
        }       
        else if(password.indexOf(' ') >= 0){        
            setPasswordError('Un email ne peut contenit d\'espaces');                          
        }    
        else{
            setPasswordError("")
            passwordValid = true
        }        
    
        if(emailValid && passwordValid){     
            setEmail("");
            setPassword("");
            setLogin(true)
        }        
    
    }

    /* Appuie sur le boutton connexion : envoie des données à la database */
    const signInUser = async () => {

        handleSubmit() // Boolean :  Vérifications des inputs

        /* Je n'envoie les données que si mes input sont bon */
        if (login) {
        const rawResponse = await fetch(`http://${expoUrlJoey}/sign-in`, {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${email}&password=${password}`,
        })

        let response = await rawResponse.json() // Object : Réponse du back-end

        /* Si l'utilisateur n'existe pas */
        if (response.already_member === true) {
            props.navigation.navigate('PagesStacks') // redirection vers toutes les annonces
            props.getUserInformations({user_token : response.token}) // J'ajoute les informations dans mon store
        }
        else {
            /* MARCHE PAS */
            setNewMemberMessage("Ce compte n'existe pas dans notre base de données")
        }
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
                errorMessage={emailError}
            />

            {/* Mot de passe */}
            <Input
                placeholder="Password (min 6 caractères)"
                onChangeText={setPassword} value={password}
                rightIcon={<Ionicons name={passwordVisibility ? 'eye-outline' : 'eye-off-outline'} size={24} color='black' onPress={() => setPasswordVisibility(passwordVisibility ? false : true) } />}
                secureTextEntry={passwordVisibility} // Pour cacher ou ontrer le mot de passe
                errorMessage={passwordError}

            />

            {/* Message d'erreur compte inexistant dans la base de données */}
            <Text>{newMemberMessage}</Text>

            {/* Bouton => envoyé */}
            <Button
                buttonStyle={{ backgroundColor: '#3BA58B', margin: 5 }}
                title="Connexion"
                onPress={() => signInUser()}
            />
            <Link to={'/RegisterFormScreen1'}>Pas encore membre ? Créer un compte</Link>

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
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ConnectionFormScreen);
