import React, { useState } from 'react';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Text, Input } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons'; 

// ^ Module : date input
// ? doc : https://www.npmjs.com/package/react-native-datefield
import DateField from 'react-native-datefield';




export default function RegisterFormScreen1(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________

    /* VARIABLES */
    const  params  = props.route.params; // Object : Je vais chercher si on m'a envoyé des paramètres (en cas de retour depuis la deuxième pasge de mon formulaire)
 
    /* VARIABLES D'ÉTAT  */
    const [email, setEmail] = useState(params === undefined ? "" : props.route.params.email); // String : email de mon formulaire
    const [emailError, setEmailError] = useState(""); // message d'erreur de l'email

    const [name, setName] = useState(params === undefined ? "" : props.route.params.name); // String : name de mon formualire
    const [nameError, setNameError] = useState(""); // message d'erreur du mot de passe

    const [password, setPassword] = useState(""); // String : mot de passe de mon formaulaire
    const [passwordError, setPasswordError] = useState(""); // message d'erreur du mot de passe
    const [passwordVisibility, setPasswordVisibility] = useState(true); // Bolean : définit la visibilité de mon mot de passe

    const [birthdayDate, setBirthdayDate] = useState(params === undefined ? new Date() : props.route.params.birthday_date); // DATE : date de mon formulaire
    const [birthdayDateError, setBirthdayDateError] = useState(""); // message d'erreur du mot de passe
    let age = 0 // Définition de l'age de l'utilisateur 
    let firstStepLogin = false // Boolean :  condition pour envoyer la donné au back-end 
    
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________


    /* Check des erreurs possible à la submission du formulaire de connexion*/
    const handleSubmit = () => {

        let today = new Date() // Je récupère la date d'aujourd'hui
        if (birthdayDate !== undefined || birthdayDate !== today) {
            let birthDate = new Date(birthdayDate)
            let ageDiff = today.getTime() - birthDate.getTime() // je calcule la différence entre la date d'aujourd'hui et celle envoyé
            var ageDate = new Date(ageDiff)// je met le résulta obtenue sous forme d'une date
            age  = Math.abs(ageDate.getFullYear() - 1970) // je calcule le nombre d'année de différence avec 1970
        }


        var birthdayDateValid = false;

        if (age == 0) {
            setBirthdayDateError("Ce champs est obligatoire");
        }
        else if (age < 18 ) {
            setBirthdayDateError("Il faut être majeur pour s'inscrire")
        }
        else if (age > 120) {
            setBirthdayDateError("Toujours en vie ? Félicitations !")
        }
        else {
        
            birthdayDateValid = true;
        }

        var emailValid = false;

        if (email === undefined) {
            setEmailError("Ce champs est obligatoire");
        }
        else if (email.length === 0) {
            setEmailError("Ce champs est obligatoire");
        }        
        else if(email.length < 2){
            setEmailError("Attention , champs invalide !");
        }      
        else if(email.indexOf(' ') >= 0){        
            setEmailError('Un email ne peut contenit d\'espaces');                          
        }    
        else{
            setEmailError("")
            emailValid = true
        }
    
        var passwordValid = false;
        
        if (password === undefined) {
            setPasswordError("Ce champs est obligatoire");
        }
        else if (password.length == 0 ){
            setPasswordError("Ce champs est obligatoire");
        }        
        else if(password.length < 2){
            setPasswordError("Attention , champs invalide !");
        }      
        else if(password.indexOf(' ') >= 0){        
            setPasswordError('Un mot de passe ne peut contenit d\'espaces');                          
        }    
        else{
            setPasswordError("")
            passwordValid = true
        }        

        var nameValid = false;
        if (name === undefined) {
            setNameError("Ce champs est obligatoire");
        }
        else if(name.length < 2){
            setNameError("Ce champs est obligatoire");
        }        
        else{
            setNameError("")
            nameValid = true
        }        
    
        if(emailValid && passwordValid && nameValid && birthdayDateValid){     
            setEmail("");
            setPassword("");
            setName("");
            setBirthdayDate("");
            firstStepLogin = true
            
        }        
    
    }

    /* Pour envoyer dans les paramètres les données remplie dans ce formaulaire  ==> OBJECT */
    const validFirstStep = () =>  {
        handleSubmit()
        if (firstStepLogin) {
            console.log("PARAMS : ",{name : name , email : email, password : password, birthday_date : String(birthdayDate), occupation: params === undefined ? "" : params.occupation})
            props.navigation.navigate('RegisterFormScreen2',
            {name : name , email : email, password : password, birthday_date : String(birthdayDate), occupation: params === undefined ? "" : params.occupation})
        }
    }
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */


    // * ___________________________ PAGE ___________________________
    /* Étape 1/2 de l'inscription : email + mot de passe + date de naissance (18ans +) */

    return (
        <View style={styles.container}>

            <Text>RegisterFormScreen1</Text>

            {/* Email */}
            <Input
                placeholder='Email'
                onChangeText={setEmail} value={email}
                errorMessage={emailError}
            />

            {/* Mot de passe */}
            <Input
                placeholder="Password"
                onChangeText={setPassword} value={password}
                rightIcon={<Ionicons name={passwordVisibility ? 'eye-outline' : 'eye-off-outline'} size={24} color='black' onPress={() => setPasswordVisibility(passwordVisibility ? false : true) } />}
                secureTextEntry={passwordVisibility} // Pour cacher ou ontrer le mot de passe
                errorMessage={passwordError}
            />

            {/* Nom : affiché sur le profil */}
            <Input
                placeholder="name"
                onChangeText={setName} value={name}
                errorMessage={nameError}
            />

            {/* Date de naissance */}
            <DateField
                labelDate="JJ"
                labelMonth="MM"
                labelYear="AAAA"
                styleInput={styles.inputDate}
                
                onSubmit={(value) => setBirthdayDate(value)}
            />
            <Text>{birthdayDateError}</Text>

            <View style={{ flexDirection: 'row', marginTop: 50, alignItems: 'center'}}>

                {/* Navigation pour retourner en arrière*/}
                <Ionicons name="chevron-back-outline" size={45} color="black" onPress={() => props.navigation.navigate('ConnectionScreen')} />

                <Text style={{ marginHorizontal : 50}}>1 / 2</Text>

                {/* Navigation sur la page suivante + envoie des données remplie sur la partie 1/2 */}
                <Ionicons name="chevron-forward-outline" size={45} color="black" onPress={() => validFirstStep()}
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
    inputDate: {
        width: '35%',
        borderColor: '#cacaca',
        borderWidth: 1,
        marginBottom: 20,
      },
});

// * ___________________________ REDUX ___________________________
