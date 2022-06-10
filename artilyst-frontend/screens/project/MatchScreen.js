import React from 'react';

// ^ Wanings messages
import { LogBox, Button } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */





export default function RealisateurCollaborateurScreen(props) {


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



            <View>
                <Text> C' est un Match</Text>
                <Text> Vous pouvez disctuer dans la messagerie </Text>
            </View>


            <Button  
                        color='#1ADBAC' 
                        buttonStyle={{ backgroundcolor : '#1ADBAC'  }}
                        title="Aller dans messagerie" />
                    
                    <Button  
                        color='#1ADBAC' 
                        buttonStyle={{ backgroundcolor : '#1ADBAC'  }}
                        title="retour" />
                    
                    
         

         
           

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

    input: {
        width: 200,
        height: 40,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
    },





});



// * ___________________________ REDUX ___________________________
