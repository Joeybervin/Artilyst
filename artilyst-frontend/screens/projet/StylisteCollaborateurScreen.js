import React from 'react';
import Slider from '@react-native-community/slider';

// ^ Wanings messages
import { LogBox, Button, TextInput } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */

import { Input, CheckBox, Icon } from "@rneui/themed";



export default function StylisteCollaborateurScreen(props) {


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
                <Text>Styliste  </Text>
            </View>

            <Text>Genre</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                <CheckBox
                    center
                    title="Femme"
               
                />
                <CheckBox
                    center
                    title="Homme"
               
                />
                <CheckBox
                    center
                    title="Autres"
                
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

            <Text> Age</Text>
            <View>


                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="black"
                />
                <Text> Spétialisation </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>


                <Button
                    buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                    title="Femme"

                />


                <Button
                    buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                    title="Homme"

                />
                <Button
                    buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                    title="Enfant"

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
        width: 200,
        height: 40,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
    },





});




