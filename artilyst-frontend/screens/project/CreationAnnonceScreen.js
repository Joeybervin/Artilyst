import React, { useState } from 'react';
import {connect} from 'react-redux';

// & import des urls de chacune
import {expoUrlRaf} from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox, Button, Switch } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text,  View, TextInput } from 'react-native';
/* import { Text } from '@rneui/base'; */

function CreationAnnonceScreen(props) {

    //*********** Varibales d'etat **********/
    const [title, setTitle]=useState('')
    const [description, setDescription]=useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    //********** Récuperation params */
    var ParamsProject3=props.route.params;
    ParamsProject3['title']=title;
    ParamsProject3['description']=description;
    ParamsProject3['remuneration']=isEnabled;  
    ParamsProject3['token']=props.userDisplay.user_token;     
    var projectInfos=ParamsProject3;
    
    console.log('params3',projectInfos)
    console.log('user',props.userDisplay.user_token)

    /* fonction pour sauvegarder un utilisateur dans la base de données */
    const projectSave = async () => {
        
        
        const rawResponse = await fetch(`http://${expoUrlRaf}/project`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({projectInfos : projectInfos}),
        })

        let response = await rawResponse.json() 
        props.navigation.navigate('Annonces')
    
    }// Object : Réponse du back-end


    return (
        <View style={styles.container}>
        <View><Text>création de mon annonce de projet </Text></View>
        <View><Text>Collaborateur : {ParamsProject3.occupation}  </Text></View>
        <View><Text>Catégorie : {ParamsProject3.category} </Text></View>
     
     <View><Text>Descriptif</Text></View>

     <TextInput
                style={styles.input}
                placeholder=" Titre ex : Recherche photographe" 
                type ="text"
                onChangeText={setTitle}
                value={title}
                
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
                onChangeText={setDescription}
                value={description}
            />   



<View style={{ flex: 1, flexDirection: 'row', justifyConten:'space-between', alignItems: "center" }}>



    
  <Text>Je rémunère</Text>
  
  <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
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
    onPress={() => projectSave()}

    
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

// * ___________________________ REDUX __________________________
function mapStateToProps(state) {
    return { userDisplay: state.user}
   }  
   export default connect(mapStateToProps, null)(CreationAnnonceScreen);
   