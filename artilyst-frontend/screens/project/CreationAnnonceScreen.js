import Animated from 'react-native-reanimated';
import React, { useState } from 'react';
import { connect } from 'react-redux';

// & import des urls de chacune
import { expoUrlBertin } from '../../ExpoUrl';

// ^ Wanings messages

LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { LogBox, Switch, StyleSheet, View, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
/* import { Text } from '@rneui/base'; */
import { Text, Button } from '@rneui/base';
import { Overlay } from "@rneui/themed";
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from "expo-image-picker";

function CreationAnnonceScreen(props) {

    //*********** Varibales d'etat **********/
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    /* VARIABLES D'ÉTAT  */

    const [user, setUser] = useState(props.user)



    /* VARIABLES */

    //********** Récuperation params */
    var ParamsProject3 = props.route.params;
    ParamsProject3['title'] = title;
    ParamsProject3['description'] = description;
    ParamsProject3['remuneration'] = isEnabled;
    ParamsProject3['token'] = props.userDisplay.token;
    var projectInfos = ParamsProject3;

    console.log('params3', projectInfos)
    //console.log('props.userDisplay',props.userDisplay)

    /* fonction pour sauvegarder un utilisateur dans la base de données */
    const projectSave = async () => {


        const rawResponse = await fetch(`http://${expoUrlBertin}/project`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectInfos: projectInfos }),
        })

        let response = await rawResponse.json()
        props.OnaddList(projectInfos, response)

        // console.log("response",response)
        props.navigation.navigate('ArtisteCorrespondantScreen')


    }// Object : Réponse du back-end


    return (


        <View style={styles.mainContainer}>
            <View><Text>création de mon annonce de projet </Text></View>
            <View><Text>Collaborateur : {ParamsProject3.occupation}  </Text></View>
            <View><Text>Catégorie : {ParamsProject3.category} </Text></View>

            <View><Text>Descriptif</Text></View>

            <TextInput
                style={styles.input}
                placeholder=" Titre ex : Recherche photographe"
                type="text"
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
                type="text"
                onChangeText={setDescription}
                value={description}
            />



            <View style={{ flexDirection: 'row', justifyConten: 'space-between', alignItems: "center" }}>

                <Text>Je rémunère</Text>

                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />

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

{/* <Button
    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
    title="Lancer"
    onPress={() => props.navigation.navigate('ArtisteCorrespondantScreen')}
/> */}



     
            

        </View>
            </View >
            <View style={{ flexDirection: 'row', justifyConten: 'space-between', alignItems: "center", marginTop: 10 }}>
                <Button title="add picture" onPress={() => sheetRef.current.snapTo(0)} />

            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>

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
        flex: 1

    },
    mainContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: "center",
    },

    swipperContainer: {
        width: "100%",
        height: 350,
        marginBottom: 15
    },

});

// * ___________________________ REDUX __________________________

function mapDispatchToProps(dispatch) {
    return {
        OnaddList: function (Projet, id) {
            dispatch({ type: 'addProject', Projet, id })
        }
    }
}


function mapStateToProps(state) {
    return { userDisplay: state.user }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreationAnnonceScreen);
