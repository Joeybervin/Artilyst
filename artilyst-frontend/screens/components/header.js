import React from 'react';

//^ Module de balise
import { StyleSheet, Text,  View } from 'react-native';
/* import { Text } from '@rneui/base'; */

export default function Header() {

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
        <View style={styles.header}>
        
            <Text style={styles.headerText}>ARTILYST</Text>

        </View>

    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    header: {
        width: "100%" ,
        height: "100%" ,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText : {
        fontWeight: 'bold',
        letterSpacing :  1
    }
});

// * ___________________________ REDUX ___________________________
