import React from 'react';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@rneui/base';

/* import { Text } from '@rneui/base'; */

export default function ConnectionScreen(props) {

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

            <Text onPress={() => {props.navigation.navigate('PagesStacks')
            props.getUserInformations({user_token : "i0-7QTBGTbbi81PmAZq_sh-e8C_qvPKT"})}}>ConnectionScreen</Text>

            <Button
                title="Se connecter"
                onPress={() => props.navigation.navigate('ConnectionFormScreen')}
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
