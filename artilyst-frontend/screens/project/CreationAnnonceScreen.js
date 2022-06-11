import Animated from 'react-native-reanimated';
import React, { useState } from 'react';
import { connect } from 'react-redux';

// & import des urls de chacune
import { expoUrlJoey } from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox, Switch } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
/* import { Text } from '@rneui/base'; */
import { Text } from '@rneui/base';
import { Divider } from "@rneui/themed";
import { FullButton} from '../components/ButtonsComponent';
import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';


function CreationAnnonceScreen(props) {

    // * ___________________________ VARIABLES & VARIBLES D'ÉTAT ___________________________
    /* variables d'état */
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    /* variables */
    var ParamsProject3 = props.route.params;
    ParamsProject3['title'] = title;
    ParamsProject3['description'] = description;
    ParamsProject3['remuneration'] = isEnabled;
    ParamsProject3['token'] = props.userDisplay.token;
        var projectInfos = ParamsProject3;


    // * ___________________________ FUNCTIONS ___________________________

    /* fonction pour sauvegarder un utilisateur dans la base de données */
    const projectSave = async () => {

        const rawResponse = await fetch(`http://${expoUrlJoey}/project`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectInfos: projectInfos }),
        })

        let response = await rawResponse.json()
        
        props.addProject(projectInfos, response)

        if (response) {
            props.navigation.navigate('ArtisteCorrespondantScreen', {id : response})
        }
        


    }// OBJECT : Réponse du back-end


    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.mainContainer}>

                <View style={{ marginTop: 15, marginBottom: 25, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, margin: 2 }}>Collaborateur : {ParamsProject3.occupation}  </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, margin: 2 }}>Catégorie : {ParamsProject3.category} </Text>
                </View>

                <Text style={{
                    marginTop: 15, marginBottom: 20,
                    fontWeight: 'bold', fontSize: 23, textAlign: 'center'
                }}
                >Décrivez votre projet</Text>
                <TextInput
                    style={styles.input}
                    placeholder=" Titre de votre projet, ex : Recherche..."
                    type="text"
                    onChangeText={setTitle}
                    value={title}
                />
                <TextInput
                     multiline = {true}
                     numberOfLines = {25}
                    style={{
                        borderWidth: 1,
                        height: 170,
                        width: "85%",
                        margin: 25,
                        padding: 12,
                        borderColor: 'grey'
                    }}
                    placeholder=" Décrivez votre projet, ex : Modele recherche photographe pour book professionnel"
                    type="text"
                    onChangeText={setDescription}
                    value={description}
                />


                {/* Switch rémunération */}
                <View style={{ flexDirection: 'row', justifyContet: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginRight: 10 }}>Je rémunère</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: '#29997D' }}
                        thumbColor={isEnabled ? '#1ADBAC' : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View >

                {/* Bouton Ajout Photo */}
                <TouchableOpacity
                    style={styles.smallCards}
                    onPress={() => props.navigation.navigate('')}
                >
                    <Text style={styles.cardTitle}>Ajouter une photo +</Text>
                </TouchableOpacity>

               

                <Divider
                    style={{ width: "60%", margin: 20 }}
                    color="#d3d3d3"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />

                {/* BUTTONS */}
                {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40 }}>

                    

                    <LancerRechercheBtn onPressHandler={() => projectSave()} />
                    

                    <TouchableOpacity onPress={() => props.navigation.navigate('CategorieDuProjetScreen')}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#232323' }}>Retour</Text>
                    </TouchableOpacity>
                   
                </View> */}

                <View style={{ flexDirection: 'row', marginTop: 50 ,  marginBottom: 40 }}>
                    <FullButton title='retour' 
                    buttonTextColor={'#ffffff'} buttonColor={'#000000'} 
                    onPress={() => props.navigation.goBack()}
                    />

                    <FullButton title='créer'
                    onPressHandler={() => projectSave()}
                    />
                </View>
            </View>
        </ScrollView>

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
        alignItems: 'center',
        marginBottom : 100
    },

    swipperContainer: {
        width: "100%",
        height: 350,
        marginBottom: 15
    },
    smallCards: {
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0,
        width: "60%",
        height: 40,
        marginTop: 15,
        marginBottom: 20,
        padding: 6,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1, shadowRadius: 2
    },

    // -- GLOBAL STYLE ----------
    pageBackground: {
        ...pageBackground
    },
    title: {
        ...title
    },
    subTitle: {
        ...subTitle
    },
    textRegular: {
        ...textRegular
    },
    cardTitle: {
        ...cardTitle
    },
    cardText: {
        ...cardText
    }

});

// * ___________________________ REDUX __________________________

function mapDispatchToProps(dispatch) {
    return {
        addProject: function (Projet, id) {
            dispatch({ type: 'addProject', Projet, id })
        }
    }
}


function mapStateToProps(state) {
    return { userDisplay: state.user }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreationAnnonceScreen);
