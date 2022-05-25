import React, { useState } from 'react';

// & import des urls de chacune
import { expoUrlRaf } from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^ React navigation
import { Link } from '@react-navigation/native';

// ^Redux
import { connect } from 'react-redux';
import { ConnexionBtn } from '../components/ButtonsStyles';
import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';

function ConnectionFormScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [email, setEmail] = useState(""); // champs de l'email
    const [emailError, setEmailError] = useState(""); // message d'erreur de l'email

    const [password, setPassword] = useState("");// champs du mot de passe
    const [passwordError, setPasswordError] = useState(""); // message d'erreur du mot de passe
    const [passwordVisibility, setPasswordVisibility] = useState(true); // Changement de la visibilité du mot de passe

    const [newMemberMessage, setNewMemberMessage] = useState("") // renvoie d'un message si la base de données n'a pas trouvé l'utilisateur

    /* VARIABLES */
    var emailValid = false;
    var passwordValid = false;
    let login = false; // condition pour envoyer la donné au back-end

    // * ___________________________ FUNCTIONS ___________________________


    const handleSubmit = () => { // Check des erreurs possible à la submission du formulaire de connexion

        if (email.length == 0) {
            setEmailError("Ce champs est obligatoire");
        }
        else {
            setEmailError("")
            emailValid = true
        }

        if (password.length == 0) {
            setPasswordError("Ce champs est obligatoire");
        }
        else {
            setPasswordError("")
            passwordValid = true
        }

        if (emailValid && passwordValid) {
            setEmail("");
            setPassword("");
            login = true
        }

    }

    /* Appuie sur le boutton connexion : envoie des données à la database */
    const signInUser = async () => {

        handleSubmit() // BOOLEAN :  Vérifications des inputs ==> Je n'envoie les données que si mes input sont bons

        if (login) {
            const rawResponse = await fetch(`http://${expoUrlRaf}/sign-in`, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `email=${email}&password=${password}`,
            })

            let response = await rawResponse.json() // OBJECT : Réponse du back-end

            if (response.already_member === true) { // récupération de la données envoyé par le back-end

                props.getUserInformations(response.user) // J'ajoute les informations dans mon store
                props.navigation.navigate('PagesStacks') // redirection vers toutes les annonces

            }
            else {
                setNewMemberMessage("Ce compte n'existe pas dans notre base de données")
            }
        }
    }
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */

    // * ___________________________ PAGE ___________________________

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Connexion à votre compte</Text>
            {/* Email */}
            <Input
                placeholder='Email'
                onChangeText={setEmail} value={email}
                errorMessage={emailError}
                style={{marginTop: 20}}
            />

            {/* Mot de passe */}
            <Input
                placeholder="Mot de passe (min 6 caractères)"
                onChangeText={setPassword} value={password}
                rightIcon={<Ionicons name={passwordVisibility ? 'eye-outline' : 'eye-off-outline'} size={24} color='black' onPress={() => setPasswordVisibility(passwordVisibility ? false : true)} />}
                secureTextEntry={passwordVisibility} // Pour cacher ou ontrer le mot de passe
                errorMessage={passwordError}

            />

            {/* Message d'erreur compte inexistant dans la base de données */}
            <Text>{newMemberMessage}</Text>

            {/* Bouton => envoyé */}
            <ConnexionBtn onPressHandler={() => signInUser()} />

            {/* <Button
                buttonStyle={{ backgroundColor: '#3BA58B', margin: 5 }}
                title="Connexion"
                onPress={() => signInUser()}
            /> */}
            <Link style={{ marginTop: 25 }} to={'/RegisterFormScreen1'}>Pas encore membre ? Créer un compte</Link>

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
)(ConnectionFormScreen);
