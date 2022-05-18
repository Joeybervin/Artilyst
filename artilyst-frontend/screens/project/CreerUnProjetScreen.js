import React from 'react';

// ^ Wanings messages
import { LogBox, Button } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet,  View , ScrollView} from 'react-native';
import { Text, Divider } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

export default function CreerUnProjetScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    /* VARIABLES */
    const isFocus= useIsFocused();
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

        <View style={{ marginTop: 30 }}  >

            {/* <Text>Creer un projet </Text> */}
            <Button title="Creer Projet " onPress={() => props.navigation.navigate('CollaborateurDuProjetScreen')} />

            <View style={{ borderRadius : 7,  alignItems: "center", justifyContent: "center", borderColor: 'black', borderWidth: 0.5, width: 200, height: 30, marginTop: 30 }} >
              <Ionicons
                style={styles.icon}
                color={isFocus ? '#1ADBAC' : 'black'}
                name="search"
                size={20}
              />

            </View>
            
      
        </View>


        <Divider
          style={{ width: "100%", margin: 20 }}
          color="#d3d3d3"
          insetType="middle"
          width={1}
          orientation="horizontal"
        />

        <View>
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
