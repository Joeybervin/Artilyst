import React, { useState } from 'react';

// ^ Wanings messages
import { LogBox, ScrollView } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */

import { Input, CheckBox, Button } from "@rneui/base";
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SuivantBtn } from '../components/ButtonsStyles';


export default function PhotographCollaborateurScreen(props) {


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [gender, setGender] = useState('');
    const [ville, setVille] = useState('');
    const [ageMin, setAgeMin] = useState(0);
    const [ageMax, setAgeMax] = useState(0);


    /* VARIABLES */

    /* Les params */
    var ParamsProject1 = props.route.params;
    ParamsProject1['gender'] = Gender;
    ParamsProject1['location'] = ville;
    ParamsProject1['ageMin'] = ageMin;
    ParamsProject1['ageMax'] = ageMax;
    var Gender = gender;

    // * ___________________________ FUNCTIONS ___________________________
   
    const validSecondStep = () => {
        props.navigation.navigate('CategorieDuProjetScreen', ParamsProject1)
    }

    // * ___________________________ PAGE ___________________________

    return (
        <ScrollView style={{ backgroundColor: '#fff', }}>

            <View style={styles.container}>

                {/* Progress bar */}
                <View style={{
                    marginTop: 40, width: "80%", height: 10,
                    borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50,
                }}>


                    <View style={{
                        borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50,
                        width: "66%", height: 10,
                        backgroundColor: '#1ADBAC'
                    }}>
                    </View>
                </View>

                {/* Champ Collaborateur */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 40, marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Collaborateur du projet : </Text>
                    <Text>Photographe</Text>
                </View>

                {/* Choix du genre */}
                <View style={{ marginTop: 20, marginBottom: 10 }}>

                    <Text style={{ marginTop: 10, marginBottom: 8, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Genre</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>

                        <CheckBox
                            center
                            title="Femme"
                            onPress={() => setGender(gender == "Femme" ? "" : "Femme")}
                            checked={Gender == "Femme" ? true : false}
                        />
                        <CheckBox
                            center
                            title="Homme"
                            onPress={() => setGender(gender == "Homme" ? "" : "Homme")}
                            checked={Gender == "Homme" ? true : false}
                        />
                        <CheckBox
                            center
                            title="Autres"
                            onPress={() => setGender(gender == "Autres" ? "" : "Autres")}
                            checked={Gender == "Autres" ? true : false}
                        />
                    </View>
                </View>

                {/* Localisation */}
                <View style={{ width: '80%', marginTop: 20 }}>

                    <Text style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Localisation</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Ville</Text>
                        <Input
                            onChangeText={setVille} value={ville}
                        />
                    </View>

                    {/* Choix de la tranche d'âge */}
                    <Text style={{ marginTop: 25, marginBottom: 8, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Age</Text>
                    {/* Age minimum */}
                    <View style={{ alignItems: 'center' }} >
                        <Slider
                            animateTransitions
                            animationType="timing"
                            maximumTrackTintColor="#ccc"
                            maximumValue={100}
                            minimumTrackTintColor="#222"
                            minimumValue={18}
                            onSlidingComplete={() =>
                                console.log("onSlidingComplete()")
                            }
                            onSlidingStart={() =>
                                console.log("onSlidingStart()")
                            }
                            onValueChange={value => {
                                setAgeMin(value)
                                console.log("onValueChange()", value)
                            }
                            }
                            orientation="horizontal"
                            step={1}
                            style={{ width: "80%", height: 80 }}
                            thumbStyle={{ height: 20, width: 20 }}
                            thumbTintColor="#1ADBAC"
                            thumbTouchSize={{ width: 50, height: 40 }}
                            trackStyle={{ height: 10, borderRadius: 20 }}
                            value={0}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text >Age Minimum : </Text>
                            <Text style={{ color: '#1ADBAC' }}>
                                {ageMin} ans
                            </Text>

                        </View>

                    </View>

                    {/* Age maximum */}
                    <View style={{ alignItems: 'center' }} >
                        <Slider
                            animateTransitions
                            animationType="timing"
                            maximumTrackTintColor="#ccc"
                            maximumValue={100}
                            minimumTrackTintColor="#222"
                            minimumValue={18}
                            onSlidingComplete={() =>
                                console.log("onSlidingComplete()")
                            }
                            onSlidingStart={() =>
                                console.log("onSlidingStart()")
                            }
                            onValueChange={value => {
                                setAgeMax(value)
                                console.log("onValueChange()", value)
                            }
                            }
                            orientation="horizontal"
                            step={1}
                            style={{ width: "80%", height: 80 }}
                            thumbStyle={{ height: 20, width: 20 }}
                            thumbTintColor="#1ADBAC"
                            thumbTouchSize={{ width: 50, height: 40 }}
                            trackStyle={{ height: 10, borderRadius: 20 }}
                            value={100}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text >Age Maximum : </Text>
                            <Text style={{ color: '#1ADBAC' }}>{ageMax} ans</Text>
                        </View>
                    </View>

                </View>

                {/* SUIVANT / RETOUR */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 40 }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('CollaborateurDuProjetScreen')}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#232323' }}>Retour</Text>
                    </TouchableOpacity>

                    <SuivantBtn onPressHandler={() => validSecondStep()} />

                </View>

            </View>



        </ScrollView>



    )
};

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom : 100
    },

    inputContainerStyle: {
        width: 200,
        height: 10,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
    }

});



// * ___________________________ REDUX ___________________________
