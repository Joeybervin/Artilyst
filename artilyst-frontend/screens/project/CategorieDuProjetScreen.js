import React, { useState } from 'react';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View, ScrollView } from 'react-native';
import {  Text } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';
import { SuivantBtn } from '../components/ButtonsComponent';


export default function CategorieDuProjetScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    const [category, setCategory] = useState('')
    var [ isPress, setIsPress ] = useState(false); // BOLEAN : changement de couleur du boutton au clique


    /* Params */
    var ParamsProject2 = props.route.params;
    ParamsProject2['category'] = category;

    // * ___________________________ FUNCTIONS ___________________________
    
    const addCategory = (catego) => {
        setCategory(catego)
    }


// * ___________________________ PAGE ___________________________
    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>

            <View style={styles.container}>

                {/* Progress bar */}
                <View style={{ marginTop: 40, marginBottom: 40, borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50, width: "80%", height: 10 }}>
                    <View style={{ borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50, width: "85%", height: 10, backgroundColor: '#1ADBAC' }}></View>
                </View>

                <Text style={{ marginTop: 3, marginBottom: 25, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> Catégorie du projet </Text>


                <View dir="row" align="center" spacing={4}>

                    {/* création textile */}
                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Création Textile")}
                    >
                        <Text style={styles.cardTitle}>Création textile</Text>
                    </TouchableOpacity>

                     {/* défilé */}
                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Défilé")}
                    >
                        <Text style={styles.cardTitle}>Défilé</Text>
                    </TouchableOpacity>

                    {/* evenement / vernissage */}
                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Evènement/Vernissage")}
                    >
                        <Text style={styles.cardTitle}>Evènement/vernissage</Text>
                    </TouchableOpacity>

                    {/* court métrage */}
                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Court Métrage")}
                    >
                        <Text style={styles.cardTitle}>Court métrage</Text>
                    </TouchableOpacity>

                    {/* long métrage */}
                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Long Métrage")}
                    >
                        <Text style={styles.cardTitle}>Long métrage</Text>
                    </TouchableOpacity>

                    {/* série */}
                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Série")}
                    >
                        <Text style={styles.cardTitle}>Série</Text>
                    </TouchableOpacity>

                    {/* spot publicitaire */}
                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Spot Publicitaire ")}
                    >
                        <Text style={styles.cardTitle}>Spot publicitaire</Text>
                    </TouchableOpacity>

                    {/* shooting */}
                    <TouchableOpacity
                        style={isPress ? styles.smallCardsPressed : styles.smallCards}
                        onPress={() => {
                            addCategory("Shooting")
                            setIsPress(true)}}
                    >
                        <Text style={isPress ? styles.cardTitlePressed : styles.cardTitle}>Shooting</Text>
                    </TouchableOpacity>

                  

                </View>


                {/* RETOUR / SUIVANT */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40 }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('PhotographeCollaborateurScreen')}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#232323' }}>Retour</Text>
                    </TouchableOpacity>
                  
                    <SuivantBtn onPressHandler={() => props.navigation.navigate('CreationAnnonceScreen', ParamsProject2)} />
                   

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