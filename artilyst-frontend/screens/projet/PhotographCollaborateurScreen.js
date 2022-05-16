import React from 'react';

// ^ Wanings messages
import { LogBox, Button, TextInput } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text,  View, Slider  } from 'react-native';
/* import { Text } from '@rneui/base'; */

import { Input, CheckBox, Icon } from "@rneui/themed";



export default function CollaborateurDuProjetScreen(props) {
  

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
            <Text>Collaborateur du projet  </Text>
        </View>
        
        <View>
            <Text>Photographe </Text>
        </View>
        
         <Text>Genre</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
           
                   
            <CheckBox
                        center
                        title="Femme"
                    //checked={check1}
                    //onPress={() => setCheck1(!check1)}
                    />
            <CheckBox
                        center
                        title="Homme"
                    //checked={check1}
                    //onPress={() => setCheck1(!check1)}
                    />
            <CheckBox
                        center
                        title="Autres"
                    //checked={check1}
                    //onPress={() => setCheck1(!check1)}
                    />
            </View>
        
        <View>
            <Text> Ville</Text>

            <TextInput
            style={styles.input}
      
            placeholder="ville"
            keyboardType="text"
            />
            </View>
    
       
        <View> 
        
         <Text> Age</Text>
         <TextInput
            style={styles.input}
      
            placeholder="age"
            keyboardType="numeric"
            />
             
        </View>
     
       

        <View style={{ flexDirection: 'row', marginTop: 50 }}>

                <Button
                    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                    title="retour"
                    onPress={() => props.navigation.navigate('CollaborateurDuProjetScreen')}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                    title="valider"
                    onPress={() => props.navigation.navigate('CategorieDuProjetScreen')}
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
    
    input: {
        width:200,
        height: 40,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
      },




    
});



// * ___________________________ REDUX ___________________________
