import React, { useState } from 'react';

// Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

// framework
import { StyleSheet, View, ScrollView } from 'react-native';
// librairies
import {  Text } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FullButton} from '../components/ButtonsComponent';
import * as Badges from '../components/BadgesComponent'

// style
import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';



export default function ProjectCreationScreen3(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    const [category, setCategory] = useState('')
    let [ isPress, setIsPress ] = useState(false); // BOLEAN : changement de couleur du boutton au clique


    /* VARIABLES */
    const categories = ["Création textile", "Défilé", "Évènement / Vernissage", "Court métrage", "Long métrage", "Série", "Spot publicitaire", "Shooting"]

    /* Params */
    let ParamsProject2 = props.route.params;
    ParamsProject2['category'] = category;

    // * ___________________________ FUNCTIONS ___________________________
    

// * ___________________________ PAGE ___________________________
    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>

            <View style={styles.container}>

                {/* Progress bar */}
                <View style={{ marginTop: 40, marginBottom: 40, borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50, width: "80%", height: 10 }}>
                    <View style={{ borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50, width: "85%", height: 10, backgroundColor: '#1ADBAC' }}></View>
                </View>

                <Text style={{ marginTop: 3, marginBottom: 5, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> Catégorie du projet : </Text>
                <Text style={{ marginBottom: 25, fontSize: 10, textAlign: 'center' }}> catégorie du projet : {categories}</Text>
                {/* CATÉGORIES */}
                
                <View style={{flexDirection : "column", width : "80%", alignText : "center"}}>

                    <Badges.SmallBadgesPlus
                        data={categories}
                        onPressHandler={(value) => {
                            setCategory(value)
                        }}
                    />
                </View>


                {/* BUTTONS */}
              {/*   <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40 }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('PhotographeCollaborateurScreen')}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#232323' }}>Retour</Text>
                    </TouchableOpacity>
                  
                    <SuivantBtn onPressHandler={() => props.navigation.navigate('ProjectCreationScreen4', ParamsProject2)} />
                   

                </View> */}

                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                    <FullButton title='retour' 
                    buttonTextColor={'#ffffff'} buttonColor={'#000000'} 
                    onPressHandler={() => props.navigation.goBack()}
                    />

                    <FullButton title='créer un compte'
                    onPressHandler={() => props.navigation.navigate('ProjectCreationScreen4', ParamsProject2)}
                    />
                
                </View>

            </View>

        </ScrollView>


    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom : 100
    },
    smallCardsPressed: {
        alignItems: 'center',
        backgroundColor: '#668FFF',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0,
        width: "100%",
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        padding: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    smallCards: {
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0,
        width: "100%",
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        padding: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    cardTitlePressed : {
       
        ...cardTitle,
         color : "#fff",
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