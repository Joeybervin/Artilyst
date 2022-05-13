import React from 'react';

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@rneui/base';

/* import { Text } from '@rneui/base'; */

export default function ConnexionScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    /* VARIABLES */
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */


    // * ___________________________ PAGE ___________________________

    return (
        <View style={styles.container}>

            <Text>ConnexionScreen</Text>

            <Button
                title="Se connecter"
                onPress={() => props.navigation.navigate('ConnexionFormScreen')}
                containerStyle={{ margin: 5 }}
            />

            <Button
                title="Créer un compte"
                onPress={() => props.navigation.navigate('RegisterFormScreen1')}
                containerStyle={{ margin: 5 }}
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
