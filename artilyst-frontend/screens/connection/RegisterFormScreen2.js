import React from 'react';

//^ Module de balise
import { StyleSheet, Text,  View } from 'react-native';
/* import { Text } from '@rneui/base'; */

export default function RegisterFormScreen2(props) {

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
        
            <Text onPress={() => props.navigation.navigate('#')}>RegisterFormScreen2</Text>

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
