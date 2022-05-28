import React from 'react';

// ^ Wanings messages
import { LogBox, Button, TextInput, Dimensions } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, Text, View, Slider } from 'react-native';
/* import { Text } from '@rneui/base'; */

import { Input, CheckBox, Icon, Avatar } from "@rneui/themed";

import { PostulerBtnLight, ContinuerLaRechercheBtn, EnvoyerUnMessageBtn } from '../components/ButtonsStyles';
import { ScrollView } from 'react-native-gesture-handler';



export default function RealisateurCollaborateurScreen(props) {

    let { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

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
        <ScrollView style={{ backgroundColor: '#fff' }} >
            <View style={styles.container}>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* Texte */}
                    <Text h2 style={{ marginBottom: 20, marginTop: 30, fontSize: 30, fontWeight: 'bold' }}  >C'est un match !</Text>
                    <Text style={{ fontSize: 16 }} >Commencez à collaborer</Text>

                    {/* Photos */}
                    <View style={{ flexDirection: 'row', width: "90%", justifyContent: 'space-around', marginTop: screenWidth / 6 }}>

                        <Avatar
                        
                            size={'xlarge'}
                            rounded
                            source={{ uri: "https://images.unsplash.com/photo-1552678629-51462114963c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387" }}

                        />
                        <Avatar
                            size={'xlarge'}
                            rounded
                            source={{ uri: "https://images.unsplash.com/photo-1496115965489-21be7e6e59a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" }}
                        />
                    </View>

                    {/* -------- BOUTONS --------  */}
                    <View style={{ justifyContent: "space-between", alignItems: "center", height: 125, marginTop: screenWidth / 7 }} >


                        <EnvoyerUnMessageBtn onPressHandler={() => {
                            // setOverlayVisibility(false)
                            props.navigation.navigate('MessagesScreen')
                        }} />
                        <ContinuerLaRechercheBtn onPressHandler={() => setOverlayVisibility(false)} />

                    </View>
                </View>

        


                {/* <Button
                    color='#1ADBAC'
                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                    title="Aller dans messagerie" />

                <Button
                    color='#1ADBAC'
                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                    title="retour" /> */}







            </View>
        </ScrollView>







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
