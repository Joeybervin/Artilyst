import React, { useState } from 'react';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button, Overlay } from '@rneui/base';
//^ module bonus
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker';

import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';




export default function RegisterFormScreen1(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________

    /* VARIABLES */
    const params = props.route.params; // OBJECT : paramètre que l'on récupère si => navigation.goBack()
    let age = 0 // Définition de l'age de l'utilisateur 
    let birthdayDateValid = false; // BOOLEAN
    let emailValid = false; // BOOLEAN
    let passwordValid = false; // BOOLEAN
    let firstStepLogin = false // boolean :  condition pour envoyer la donné au back-end 


    /* VARIABLES D'ÉTAT  */
    const [email, setEmail] = useState(params === undefined ? "" : props.route.params.email); // STRING : email de mon formulaire
    const [emailError, setEmailError] = useState(""); // message d'erreur de l'email

    const [name, setName] = useState(params === undefined ? "" : props.route.params.name); // STRING : name de mon formualire
    const [nameError, setNameError] = useState(""); // message d'erreur du mot de passe

    const [password, setPassword] = useState(""); // STRING : mot de passe de mon formaulaire
    const [passwordError, setPasswordError] = useState(""); // message d'erreur du mot de passe
    const [passwordVisibility, setPasswordVisibility] = useState(true); // BOOLEAN : définit la visibilité de mon mot de passe

    const [ovelayVisibility, setOvelayVisibility] = useState(false);

    const [birthdayDateView, setBirthdayDateView] = useState("JJ/MM/AAAA"); // DATE : date de mon formulaire
    const [birthdayDate, setBirthdayDate] = useState(params === undefined ? new Date() : props.route.params.birthday_date); // DATE : date de mon formulaire
    const [birthdayDateError, setBirthdayDateError] = useState(""); // message d'erreur du mot de passe

    // * ___________________________ FUNCTIONS ___________________________

    /* Pour afficher la date dans le bon format */
    const getTheDateFormat = (date) => {
        if (date === "JJ/MM/AAAA") {
            return "JJ/MM/AAAA"
        } else {
            let day, month, year;
            let today = date
            day = today.getDate();
            month = today.getMonth() + 1; // take care of the month's number here ⚠️
            year = today.getFullYear();

            if (day < 10) {
                day = '0' + day;
            }

            if (month < 10) {
                month = '0' + month;
            }
            return `${day}/${month}/${year}`

        }

    }

    /* Check des erreurs possibles à la submission du formulaire de connexion*/
    const handleSubmit = () => {

        let today = new Date() // Je récupère la date d'aujourd'hui
        if (birthdayDate !== undefined || birthdayDate !== today || birthdayDate !== "JJ/MM/AAAA") {
            let birthDate = new Date(birthdayDate)
            let ageDiff = today.getTime() - birthDate.getTime() // je calcule la différence entre la date d'aujourd'hui et celle envoyé
            var ageDate = new Date(ageDiff) // je met le résulta obtenue sous forme d'une date
            age = Math.abs(ageDate.getFullYear() - 1970) // je calcule le nombre d'année de différence avec 1970
        }

        if (age === 0) {
            setBirthdayDateError("Ce champs est obligatoire");
        }
        else if (age < 18) {
            setBirthdayDateError("Il faut être majeur pour s'inscrire")
        }
        else if (age > 120) {
            setBirthdayDateError("Toujours en vie ? Félicitations !")
        }
        else {
            birthdayDateValid = true;
        }



        if (email === undefined) {
            setEmailError("Ce champs est obligatoire");
        }
        else if (email.length === 0) {
            setEmailError("Ce champs est obligatoire");
        }
        else if (email.length < 2) {
            setEmailError("Attention , champs invalide !");
        }
        else if (email.indexOf(' ') >= 0) {
            setEmailError('Un email ne peut contenit d\'espaces');
        }
        else {
            emailValid = true
        }


        if (password === undefined) {
            setPasswordError("Ce champs est obligatoire");
        }
        else if (password.length == 0) {
            setPasswordError("Ce champs est obligatoire");
        }
        else if (password.length < 2) {
            setPasswordError("Attention , champs invalide !");
        }
        else if (password.indexOf(' ') >= 0) {
            setPasswordError('Un mot de passe ne peut contenit d\'espaces');
        }
        else {
            setPasswordError("")
            passwordValid = true
        }

        var nameValid = false;
        if (name === undefined) {
            setNameError("Ce champs est obligatoire");
        }
        else if (name.length < 2) {
            setNameError("Ce champs est obligatoire");
        }
        else {
            nameValid = true
        }

        if (emailValid && passwordValid && nameValid && birthdayDateValid) {
            firstStepLogin = true

        }

    }

    /* Pour envoyer dans les paramètres les données remplie dans ce formaulaire  ==> OBJECT */
    const validFirstStep = () => {
        handleSubmit()
        if (firstStepLogin) {
            props.navigation.navigate('RegisterFormScreen2',
                { name: name, email: email, password: password, birthday_date: String(birthdayDate), occupation: params === undefined ? "" : params.occupation })
        }
    }

    // * ___________________________ PAGE ___________________________
    /* Étape 1/2 de l'inscription : email + mot de passe + date de naissance (18ans +) */

    return (
        <View style={styles.maincontainer}>

            <View style={styles.container}>
                <Text style={styles.title}>Création de votre compte</Text>

                {/* Email */}
                <Input
                    placeholder='Email'
                    onChangeText={setEmail} value={email}
                    errorMessage={emailError}
                    style={{ marginTop: 25 }}
                />

                {/* Mot de passe */}
                <Input
                    placeholder="Mot de passe"
                    onChangeText={setPassword} value={password}
                    rightIcon={<Ionicons name={passwordVisibility ? 'eye-outline' : 'eye-off-outline'} size={24} color='black' onPress={() => setPasswordVisibility(passwordVisibility ? false : true)} />}
                    secureTextEntry={passwordVisibility} // Pour cacher ou ontrer le mot de passe
                    errorMessage={passwordError}
                />

                {/* Nom : affiché sur le profil */}
                <Input
                    placeholder="Name "
                    onChangeText={setName} value={name}
                    errorMessage={nameError}
                />

                {/* Date de naissance */}
                <View style={{ marginTop: 25, marginBottom: 25, alignItems:'center', width : '100%' }}>
                    <Text style={{ marginBottom: 15, fontWeight: 'bold' }}>Date de naissance</Text>

                    <Button type="outline" title={birthdayDateView} onPress={() => { setOvelayVisibility(true) }}
                        buttonStyle={{ borderColor: '#000000', width: '70%', justifyContent:'center' }}
                        titleStyle={{ color: 'black', width : '100%' }}
                    />

                    <Overlay overlayStyle={{ width: "90%", justifyContent: "center", backgroundColor: "white" }} isVisible={ovelayVisibility} >
                        <DatePicker
                            mode="calendar"
                            style={{ width: "100%", borderRadius: 10 }}
                            options={{
                                textHeaderColor: '#333333',
                                textDefaultColor: '#000000',
                                selectedTextColor: '#fff',
                                mainColor: '#1ADBAC',
                                textSecondaryColor: '#44A38B',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}

                            onSelectedChange={date => {
                                setBirthdayDate(date)
                                let dateselected = getTheDateFormat(new Date(date))

                                setBirthdayDateView(dateselected)

                            }}


                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                            <Button title="supprimer" buttonStyle={{ backgroundColor: '#000000', width: 150 }} onPress={() => {
                                setBirthdayDateView("JJ/MM/AAAA")
                                setOvelayVisibility(false)
                            }} />
                            <Button title="ok" buttonStyle={{ backgroundColor: '#1ADBAC', width: 150 }} onPress={() => setOvelayVisibility(false)} />

                        </View>

                    </Overlay>

                </View>


                <Text>{birthdayDateError}</Text>

                <View style={{ flexDirection: 'row', marginTop: 50, alignItems: 'center' }}>

                    {/* Navigation pour retourner en arrière*/}
                    <Ionicons name="chevron-back-outline" size={45} color="black" onPress={() => props.navigation.navigate('ConnectionScreen')} />

                    <Text style={{ marginHorizontal: 50 }}>1 / 2</Text>

                    {/* Navigation sur la page suivante + envoie des données remplie sur la partie 1/2 */}
                    <Ionicons name="chevron-forward-outline" size={45} color="black" onPress={() => validFirstStep()}
                    />

                </View>

            </View>
        </View>
    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width : '90%'
    },
    inputDate: {
        width: '35%',
        borderColor: '#cacaca',
        borderWidth: 1,
        marginBottom: 20,
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
