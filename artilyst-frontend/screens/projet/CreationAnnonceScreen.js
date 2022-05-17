import React from 'react';

// ^ Wanings messages
import { LogBox, Button, Switch } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text,  View, TextInput } from 'react-native';
/* import { Text } from '@rneui/base'; */

export default function CreationAnnonceScreen(props) {


    return (
        <View style={styles.container}>
        <View><Text>création de mon annonce de projet </Text></View>
        <View><Text>Collaborateur : Photographe  </Text></View>
        <View><Text>Catégorie : Shooting-Photo </Text></View>
     
     <View><Text>Descriptif   </Text></View>

     <TextInput
                style={styles.input}
                placeholder=" Titre ex : Recherche photographe" 
                type ="text"
                
            />   

<TextInput
                style={{
                    borderWidth: 1,
                    
                    height: 150,
                    width: 250,
                  }}
                placeholder=" Décrivez votre projet 
                ex Modele recherche photographe pour book professionnel" 
                type ="text"
            />   



<View style={{ flex: 1, flexDirection: 'row', justifyConten:'space-between', alignItems: "center" }}>



    
  <Text>Je rémunère</Text>
  
   <Switch
   
    />
  </View >

     <View style={{ flex: 1, flexDirection: 'row', justifyConten:'space-between', alignItems: "center" }}>
         <Text> Ajouter photo </Text>
        <Button title="+" onPress={() => props.navigation.navigate('')} />
     

     </View>

     <View style={{ flexDirection: 'row', marginTop: 50 }}>

<Button
    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
    title="retour"
    onPress={() => props.navigation.navigate('CategorieDuProjetScreen')}
/>
<Button
    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
    title="Lancer la recherche "
    onPress={() => props.navigation.navigate('C')}
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
        width:250,
        height: 30,
        // margin: 12,
        borderWidth: 1,
        // padding: 10,
      },

});

// * ___________________________ REDUX ___________________________
