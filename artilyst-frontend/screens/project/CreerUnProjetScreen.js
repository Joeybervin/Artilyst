import React from 'react';

// ^ Wanings messages
import { LogBox, Button } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text,  View , ScrollView} from 'react-native';
/* import { Text } from '@rneui/base'; */

export default function CreerUnProjetScreen(props) {

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
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        <View  style={{marginTop : 50}}>
            <Text>Creer un projet </Text></View>
     
        <Button title="Nouveau PRojet " onPress={() => props.navigation.navigate('CollaborateurDuProjetScreen')} />
     

        <View style={{
        width: 250,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginTop : 10,
        borderRadius: 5,
      }}  > 
      <Text> projet 1 - titre projet  </Text>
      
      <Button  title="relancher recherche " 
      onPress={() => props.navigation.navigate('ArtisteCorrespondantScreen')}
      style={{ width: 100,height: 30, marginTop : 1}}
        /> 

      <Button  title="supprimer  " /> 
        </View>


        <View style={{
        width: 250,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginTop : 10,
        borderRadius: 5,
      }}  > 
      <Text> projet 1 - titre projet  </Text>
      
      <Button  title="relancher recherche " 
      onPress={() => props.navigation.navigate('ArtisteCorrespondantScreen')}
      style={{ width: 100,height: 30, marginTop : 1}}
        /> 

      <Button  title="supprimer  " /> 
        </View>

        <View style={{
        width: 250,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginTop : 10,
        borderRadius: 5,
      }}  > 
      <Text> projet 1 - titre projet  </Text>
      
      <Button  title="relancher recherche " 
      onPress={() => props.navigation.navigate('ArtisteCorrespondantScreen')}
      style={{ width: 100,height: 30, marginTop : 1}}
        /> 

      <Button  title="supprimer  " /> 
        </View>
        <View style={{
        width: 250,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginTop : 10,
        borderRadius: 5,
      }}  > 
      <Text> projet 1 - titre projet  </Text>
      
      <Button  title="relancher recherche " 
      onPress={() => props.navigation.navigate('ArtisteCorrespondantScreen')}
      style={{ width: 100,height: 30, marginTop : 1}}
        /> 

      <Button  title="supprimer  " /> 
        </View>


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
    }
});

// * ___________________________ REDUX ___________________________
