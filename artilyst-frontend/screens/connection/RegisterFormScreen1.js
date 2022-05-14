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
/* doc : https://www.npmjs.com/package/react-native-datefield */
import DateField from 'react-native-datefield';




export default function RegisterFormScreen1(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________

    /* VARIABLES */
    const  params  = props.route.params; // Je vais chercher si on m'a envoyé des paramètres
 
    /* VARIABLES D'ÉTAT  */
    const [email, setEmail] = useState(params === undefined ? "" : props.route.params.email);
    const [name, setName] = useState(params === undefined ? "" : props.route.params.name);
    const [password, setPassword] = useState("");
    const [date, setDate] = useState(params === undefined ? new Date() : props.route.params.date);
    
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */


    // * ___________________________ PAGE ___________________________
    /* Étape 1/2 de l'inscription : email + mot de passe + date de naissance (18ans +) */

    return (
        <View style={styles.container}>

            <Text onPress={() => props.navigation.navigate('RegisterFormScreen2')}>RegisterFormScreen1</Text>

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

            {/* Nom : affiché sur le profil */}
            <Input
                placeholder="name"
                onChangeText={setName} value={name}
            />

            {/* Date de naissance */}
            <DateField
                labelDate="JJ"
                labelMonth="MM"
                labelYear="AAAA"
                styleInput={styles.inputDate}
                onSubmit={(value) => setDate(value)}
            />

            {/* Navigation sur la page suivante + envoie des données remplie sur la partie 1/2 */}
            <Ionicons name="chevron-forward-outline" size={45} color="black" onPress={() => props.navigation.navigate('RegisterFormScreen2', {name : name , email : email, password : password, date : date, work: params === undefined ? "" : params.work})}
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
    },
    inputDate: {
        width: '35%',
        borderColor: '#cacaca',
        borderWidth: 1,
        marginBottom: 20,
      },
});

// * ___________________________ REDUX ___________________________
