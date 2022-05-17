import React from 'react';

// ^ Wanings messages
import { LogBox, Button, TextInput } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text,  View } from 'react-native';
/* import { Text } from '@rneui/base'; */

export default function CollaborateurDuProjetScreen(props) {

   
    
    return (


        
        
        <View style={styles.container}>

<Text> Date de début / Date de fin</Text>

<View style={{ flexDirection: 'row', marginTop:0 }}>

<TextInput
                style={styles.input}
                placeholder="date" 
                title="date de début"
            />   

<TextInput
                style={styles.input}
                placeholder="date" 
            />  



</View>
            
             
    
<View style={{ marginTop:20 }}><Text>Collaborateur du projet  </Text></View>
        <View style={{ marginTop:20 }}><Text>De qui avez vous besoin  </Text></View>


<View dir="row" align="center" spacing={4}>

<Button
    buttonStyle={{ backgroundColor: '#1ADBAC' }}
    title="Comedien.ne"
    onPress={() => props.navigation.navigate('ComedienCollaborateurScreen')}

/>

<Button
    buttonStyle={{ backgroundColor: '#16B88F' }}
    title="Modèle"
    onPress={() => props.navigation.navigate('ModeleCollaborteurScreen')}
/>
<Button
    buttonStyle={{ backgroundColor: '#109171' }}
    title="Photographe"
    onPress={() => props.navigation.navigate('PhotographCollaborateurScreen')}
                />


<Button
    buttonStyle={{ backgroundColor: '#0B664F' }}
    title="Styliste"
    onPress={() => props.navigation.navigate('StylisteCollaborateurScreen')}
/>

<Button

    buttonStyle={{ backgroundColor: '#074233' }}
    title="Réalisateur.ice vidéos"
    onPress={() => props.navigation.navigate('RealisateurCollaborateurScreen')}
    
/>



</View>

           
<View style={{ flexDirection: 'row', marginTop: 50 }}>

<Button
    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
    title="retour"
    onPress={() => props.navigation.navigate('CreerUnProjetScreen')}
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
        width:100,
        height: 10,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
      },




    
});



// * ___________________________ REDUX ___________________________
