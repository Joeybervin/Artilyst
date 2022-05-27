import React, { useState } from 'react';



// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Divider } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';
import { PostulerBtnLight, PostulerBtn, SuivantBtn } from '../components/ButtonsStyles';


export default function CategorieDuProjetScreen(props) {

    //****************variable d'etat **************/
    const [category, setCategory] = useState('')

    //*********** Récuperation des params de l'ecran précédent ************/
    var ParamsProject2 = props.route.params;
    console.log('params2', ParamsProject2)

    //*****************Functions**********************/
    ParamsProject2['category'] = category;
    const addCategory = (catego) => {
        setCategory(catego)
        props.navigation.navigate('CreationAnnonceScreen', ParamsProject2)
    }



    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>

            <View style={styles.container}>

                {/* Progress bar */}
                <View style={{ marginTop: 40, marginBottom: 40, borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50, width: "80%", height: 10 }}>
                    <View style={{ borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50, width: "85%", height: 10, backgroundColor: '#1ADBAC' }}></View>
                </View>

                <Text style={{ marginTop: 3, marginBottom: 25, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> Catégorie du projet </Text>


                <View dir="row" align="center" spacing={4}>

                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Création Textile")}
                    >
                        <Text style={styles.cardTitle}>Création textile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Défilé")}
                    >
                        <Text style={styles.cardTitle}>Défilé</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Evènement/Vernissage")}
                    >
                        <Text style={styles.cardTitle}>Evènement/vernissage</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Court Métrage")}
                    >
                        <Text style={styles.cardTitle}>Court métrage</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Long Métrage")}
                    >
                        <Text style={styles.cardTitle}>Long métrage</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Série")}
                    >
                        <Text style={styles.cardTitle}>Série</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Spot Publicitaire ")}
                    >
                        <Text style={styles.cardTitle}>Spot publicitaire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.smallCards}
                        onPress={() => addCategory("Shooting")}
                    >
                        <Text style={styles.cardTitle}>Shooting</Text>
                    </TouchableOpacity>

                    {/* Old buttons
                    <View>
                        <Button
                            buttonStyle={{ backgroundColor: '#1ADBAC' }}
                            title="Création Textile"
                            onPress={() => addCategory("Création Textile")}

                        />

                        <Button
                            buttonStyle={{ backgroundColor: '#16B88F' }}
                            title="Défilé"
                            onPress={() => addCategory("Défilé")}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: '#109171' }}
                            title="Evènement/Vernissage"
                            onPress={() => addCategory("Evènement/Vernissage")}
                        />

                        <Button
                            buttonStyle={{ backgroundColor: '#0B664F' }}
                            title="Court Métrage"
                            onPress={() => addCategory("Court Métrage")}
                        />

                        <Button

                            buttonStyle={{ backgroundColor: '#074233' }}
                            title="Long Métrage"
                            onPress={() => addCategory("Long Métrage")}
                        />

                        <Button

                            buttonStyle={{ backgroundColor: '#074233' }}
                            title="Série"
                            onPress={() => addCategory("Série")}
                        />

                        <Button

                            buttonStyle={{ backgroundColor: '#074233' }}
                            title="Spot Publicitaire "
                            onPress={() => addCategory("Spot Publicitaire ")}
                        />

                        <Button

                            buttonStyle={{ backgroundColor: '#074233' }}
                            title="Shooting"
                            onPress={() => addCategory("Shooting")}
                        />
                    </View> */}

                </View>


                {/* RETOUR / SUIVANT */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40 }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('PhotographeCollaborateurScreen')}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#232323' }}>Retour</Text>
                    </TouchableOpacity>
                    {/* <Button
                        buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                        title="retour"
                        onPress={() => props.navigation.navigate('PhotographeCollaborateurScreen')}
                    /> */}

                    <SuivantBtn onPressHandler={() => console.log("projet créé")} />
                    {/* <Button
                        buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                        title="Créer mon projet"
                        onPress={() => console.log("projet créer")}
                    /> */}

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