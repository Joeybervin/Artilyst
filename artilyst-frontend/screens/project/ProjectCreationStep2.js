import React, { useState } from 'react';

// ^ Wanings messages
import { LogBox, ScrollView } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

// framework
import { StyleSheet,TextInput, Text, View, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
// librairies
import { Ionicons } from '@expo/vector-icons';
import {  Overlay, Divider } from "@rneui/themed";
import { Input, CheckBox } from "@rneui/base";
import Slider from '@react-native-community/slider';
import { FullButton} from '../components/ButtonsComponent';

import * as Location from 'expo-location';


export default function ProjectCreationStep2(props) {


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [ageMin, setAgeMin] = useState(0);
    const [ageMax, setAgeMax] = useState(0);
    const [overlayVisibility, setOverlayVisibility] = useState(false);

    const [ethnicGroup, setEthnicGroup] = useState("");// Ethnic group
    const [hair, setHair] = useState("");// Hair
    const [eyes, setEyes] = useState("");// Eyes
    const [height, setHeight] = useState('');// Slider taille
    const [weight, setWeight] = useState('');// Slider poids
    // Mensurations
    const [waist, setWaist] = useState(''); // waist
    const [bust, setBust] = useState(''); // bust
    const [hips, setHips] = useState(''); // hips
    const [corpulence, setCorpulence] = useState('');// Corpulence 

    const specialization = [false, false, false];// Corpulence 


    const ethniesList = ["afro","asiatique","caucasien/ne","hispanique","indien/ne","oriental/e"]
    const hairColorList = ["blond/e","brun/e","noir","gris","blanc","roux","chatain","couleur"]
    const eyesColorList = ["bleu","marron","vairon","vert","noir","gris","autre"]
    const corpulenceTypeList = ["athnétique","enrobé/e","curvy","fin/e","maigre","musclé/e","moyen/ne","bodybuildé/e"]
    const genderList = ["femme","homme","autre"]
    const stylistSpecializationList = ["femme","homme","autre"]
    /* VARIABLES */

    /* Les params */
    const params = props.route.params;
    console.log(params)
    params['gender'] = Gender;
    params['location'] = location;
    params['ageMin'] = ageMin;
    params['ageMax'] = ageMax;
    var Gender = gender;

    // * ___________________________ FUNCTIONS ___________________________
   
    const geolocation = async () => {// trouver la localisation de l'utilisateur
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        setOverlayVisibility(true)
        let location = await Location.getCurrentPositionAsync();
        
        if (location) {
            const latitude = location.coords.latitude
            const longitude = location.coords.longitude
            let response = await Location.reverseGeocodeAsync({
                latitude ,
                longitude
            });

            if (response) {
                
                if (response[0].location === undefined){ 
                    setOverlayVisibility(false)
                    setLocation("??")
                }
                else {
                    setOverlayVisibility(false)
                    setLocation(response[0].location)
                }
               
            }

            
    }
    }


    // * ___________________________ AFFICHAGE PAGE ___________________________

    const ethniescCheckBoxGroup = ethniesList.map((element, index) => {
        return (
            <CheckBox
            key={index}
            center
            checkedColor='#000000'
            title={element}
            onPress={() => {
                setEthnicGroup(ethnicGroup === element ? "" : element)
            }}
            checked={ethnicGroup === element ? true : false}
        />
        )
    })
    const haircCheckBoxGroup = hairColorList.map((element, index) => {
        return (
            <CheckBox
            key={index}
            center
            checkedColor='#000000'
            title={element}
            onPress={() => {
                setHair(hair === element ? "" : element)
            }}
            checked={hair === element ? true : false}
        />
        )
    })
    const eyesCheckBoxGroup = eyesColorList.map((element, index) => {
        return (
            <CheckBox
            key={index}
            center
            checkedColor='#000000'
            title={element}
            onPress={() => {
                setEyes(eyes === element ? "" : element)
            }}
            checked={eyes === element ? true : false}
        />
        )
    })
    const corpulenceCheckBoxGroup = corpulenceTypeList.map((element, index) => {
        return (
            <CheckBox
            key={index}
            center
            checkedColor='#000000'
            title={element}
            onPress={() => {
                setCorpulence(corpulence === element ? "" : element)
            }}
            checked={corpulence === element ? true : false}
        />
        )
    })
    const genderCheckBoxGroup = genderList.map((element, index) => {
        return (
            <CheckBox
            key={index}
            center
            checkedColor='#000000'
            title={element}
            onPress={() => {
                setGender(gender === element ? "" : element)
            }}
            checked={gender === element ? true : false}
        />
        )
    })
    const stylistSpecializationCheckBoxGroup = stylistSpecializationList.map((element, index) => {
   
        return (
            <CheckBox
            key={index}
            center
            checkedColor='#000000'
            title={element}
            onPress={() => {
                specialization[index] === element ? specialization[index] = false : specialization[index] = element
                console.log(specialization)
                
            }}
            checked={!specialization[index] == element}
        />
        )
    })

    /* Renseignements complémentaires en fonction du domaines */
    const formAdditionelFields = () => {
        return (
            <View >
                {/* -------- ETHNIE -------- */}
                <Text style={styles.fieldTitle}>Ethnie</Text>
                <View style={{ flexDirection: 'row',flexWrap : 'wrap', justifyContent: 'space-around' }}>
                    {ethniescCheckBoxGroup}
                </View>

                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- CHEVEUX -------- */}
                <Text style={styles.fieldTitle}>Cheveux</Text>
                <View style={{ flexDirection: 'row', flexWrap : "wrap", justifyContent: 'space-evenly'}}>
                    {haircCheckBoxGroup}
                </View>


                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- YEUX -------- */}
                <Text style={styles.fieldTitle}>Yeux</Text>
                <View style={{ flexDirection: 'row',flexWrap : 'wrap', justifyContent: 'space-around' }}>
                    {eyesCheckBoxGroup}
                </View>

                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- TAILLE -------- */}
                <Text style={styles.fieldTitle}>Taille</Text>
                <View style={{alignItems : "center"}}>
                    <Slider
                        animateTransitions
                        animationType="timing"
                        maximumTrackTintColor="#ccc"
                        maximumValue={250}
                        minimumTrackTintColor="#222"
                        minimumValue={100}
                        onSlidingComplete={() =>
                            console.log("onSlidingComplete()")
                        }
                        onSlidingStart={() =>
                            console.log("onSlidingStart()")
                        }
                        onValueChange={value => {
                            setHeight(value)
                            console.log("onValueChange()", value)
                        }
                        }
                        orientation="horizontal"
                        step={1}
                        style={{ width: "80%", height: 80 }}
                        thumbStyle={{ height: 20, width: 20 }}
                        thumbTintColor="#1ADBAC"
                        thumbTouchSize={{ width: 40, height: 40 }}
                        trackStyle={{ height: 10, borderRadius: 20 }}
                        value={150}
                    />
                
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                        <Text >100</Text>
                        <Text style={{ color: 'green' }}> taille :  {height} cm</Text>
                        <Text>250</Text>
                    </View>
            
                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- POIDS -------- */}
                <Text style={styles.fieldTitle}>Poids</Text>
                <View style={{alignItems : "center"}}>
                    <Slider
                        animateTransitions
                        animationType="timing"
                        maximumTrackTintColor="#ccc"
                        maximumValue={200}
                        minimumTrackTintColor="#222"
                        minimumValue={40}
                        onSlidingComplete={() =>
                            console.log("onSlidingComplete()")
                        }
                        onSlidingStart={() =>
                            console.log("onSlidingStart()")
                        }
                        onValueChange={value => {
                            setWeight(value)
                            console.log("onValueChange()", value)
                        }}
                        orientation="horizontal"
                        step={1}
                        style={{ width: "80%", height: 70 }}
                        thumbStyle={{ height: 20, width: 20 }}
                        thumbTintColor="#1ADBAC"
                        thumbTouchSize={{ width: 30, height: 30 }}
                        trackStyle={{ height: 10, borderRadius: 20 }}
                        value={150}
                    />

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text >40</Text>
                    <Text style={{ color: 'green' }}> poids :  {weight} kg</Text>
                    <Text>200</Text>
                </View>

                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- MENSURATIONS -------- */}
                <Text style={styles.fieldTitle}>Mensurations</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 30}}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Taille</Text>
                        <TextInput
                            style={styles.inputSmall}
                            placeholder="50 cm"
                            keyboardType="numeric"
                            onChangeText={setWaist}
                            value={waist}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Poitrine</Text>
                        <TextInput
                            style={styles.inputSmall}
                            placeholder="50 cm"
                            keyboardType="numeric"
                            onChangeText={setBust}
                            value={bust}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Hanches</Text>
                        <TextInput
                            style={styles.inputSmall}
                            placeholder="50 cm"
                            keyboardType="numeric"
                            onChangeText={setHips}
                            value={hips}
                        />
                    </View>
                </View>

                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- CORPULENCE -------- */}
                <Text style={styles.fieldTitle}>Corpulence</Text>
                <View style={{ flexDirection: 'row',flexWrap : 'wrap', justifyContent: 'space-around', width: '90%' }}>
                    {corpulenceCheckBoxGroup}
                </View>

            </View>
        )}

    const stylistFormAdditionelFields = () => {
        return(
            <View >
                {/* -------- SPECIALISATION DU STYLIST -------- */}
                <Text style={styles.fieldTitle}>Spécialisation</Text>
                <View style={{ flexDirection: 'row',flexWrap : 'wrap', justifyContent: 'space-around' }}>
                    {stylistSpecializationCheckBoxGroup}
                </View>
            </View>
        )}

    // * ___________________________ PAGE ___________________________

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer} >
            <ScrollView >

                <Overlay isVisible={overlayVisibility} >
                    <ActivityIndicator size="large" color="#000000" />
                    <Text>Nous cherchons votre localisasion ...</Text>
                </Overlay>

                <View style={styles.container} >

                    {/* BARRE DE PROGRES */}
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

                    {/* COLLABORATOR*/}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 40, marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Collaborateur du projet : </Text>
                        <Text>{params.occupation}</Text>
                    </View>

                    {/* ___________________________________________________________________________________________________________________ */}

                    {/* -------- GENRE -------- */}
                    <View style={{ marginTop: 20, marginBottom: 10 }}>

                        <Text style={{ marginTop: 10, marginBottom: 8, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Genre</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                            {genderCheckBoxGroup}
                        </View>
                    </View>

                    {/* ___________________________________________________________________________________________________________________ */}

                    {/* -------- LIEUX -------- */}
                    <View style={{ width: '80%', marginTop: 20 }}>

                        <Text style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Lieux</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%'  }}>
                        <Text>Ville : </Text>
                        <Input
                            onChangeText={setLocation}
                            value={location}
                            rightIcon={
                                <Ionicons onPress={() => geolocation()} name={"locate"} size={28} color="black" />
                            }
                        />
                        </View>

                        {/* ___________________________________________________________________________________________________________________ */}

                        {/* -------- AGE -------- */}
                        <Text style={styles.fieldTitle}>Age</Text>
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

                     {/* ___________________________________________________________________________________________________________________ */}
                    
                    {/* -------- STILYSTE SPPÉCIALISATION -------- */}
                    {params.occupation === "styliste" ? stylistFormAdditionelFields() : null}

                    {/* ___________________________________________________________________________________________________________________ */}
                    
                    {/* -------- CHAMPS SUPPLÉMENTAIRES -------- */}
                    {params.occupation === "modèle" ? formAdditionelFields() : null}

                    {/* ___________________________________________________________________________________________________________________ */}



                    {/* BUTTONS */}
                    <View style={{ flexDirection: 'row', marginTop: 50 ,  marginBottom: 40 }}>
                        <FullButton title='retour' 
                        buttonTextColor={'#ffffff'} buttonColor={'#000000'} 
                        onPressHandler={() => props.navigation.goBack()}
                        />

                        <FullButton title='suivant'
                        onPressHandler={() => props.navigation.navigate('CategorieDuProjetScreen', params)}
                        />
                    </View>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>


    )
};

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    container: {
        width : '100%',
        backgroudColor : '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom : 100
    },
    fieldTitle : { 
        marginTop: 30, 
        marginBottom: 10,
        fontWeight: 'bold', 
        fontSize: 20, 
        textAlign: 'center' 
    },
    
    inputContainerStyle: {
        width: 200,
        height: 10,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
    }, 
     input: {
        height: 200,
        margin: 12,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
    },
    inputSmall: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
    },
    mainContainer: {
        backgroundColor: '#ffffff',
        
    },

});



// * ___________________________ REDUX ___________________________
