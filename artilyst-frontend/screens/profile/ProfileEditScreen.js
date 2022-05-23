import React, { useState, useEffect } from 'react';

// & import des urls de chacune
import { expoUrlJoey } from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

// ^ Module de balise
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button } from '@rneui/base';
import { Input, CheckBox, Slider, Divider } from "@rneui/themed";

//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^ Redux
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import * as Location from 'expo-location';


function ProfileEditScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */


    const user = props.user
    const [name, setName] = useState(user.name === "" ? "" : user.name);// Ville
    const [city, setCity] = useState(user.city === "" ? "" : user.city);// Ville
    const [description, setDescription] = useState(user.description === "" ? "" : user.description);// Description perso
    const [cv, setCv] = useState(user.cv === "" ? "" : user.cv);// Expérience professionnelles
    const [gender, setGender] = useState(user.gender === "" ? "" : user.gender);// Gender
    const [ethnicGroup, setEthnicGroup] = useState(user.ethnicGroup === "" ? "" : user.ethnicGroup);// Ethnic group
    const [hair, setHair] = useState(user.hair === "" ? "" : user.hair);// Hair
    const [eyes, setEyes] = useState(user.eyes === "" ? "" : user.eyes);// Eyes
    const [height, setHeight] = useState(user.height === "" ? 0 : user.height);// Slider taille
    const [weight, setWeight] = useState(user.weight === "" ? 0 : user.weight);// Slider poids
    // Mensurations
    const [waistSize, setWaistSize] = useState(user.waistSize === "" ? 0 : user.waistSize); // waist
    const [bustSize, setBustSize] = useState(user.bustSize === "" ? 0 : user.bustSize); // bust
    const [hipMeasurement, setHipMeasurement] = useState(user.hipMeasurement === "" ? 0 : user.hipMeasurement); // hips
    const [corpulence, setCorpulence] = useState(user.corpulence === "" ? "" : user.corpulence);// Corpulence 

    /* Pour la géolocalisation */
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    /* VARIABLES */

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* useEffect(() => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                'Le système de géolocalisation est désactivez',
                'Veuillez le réactivez, afin de continuer',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }
    }, []); */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    // Update du profil dans la bdd
    async function updateUserProfile() {

        let user_new_informations = {token: user.token, city: city, description: description, cv: cv, name : name,
            
                gender: gender, ethnicGroup: ethnicGroup, hair: hair, eyes: eyes, height: height, weight: weight, corpulence: corpulence,
                 waistSize: waistSize, bustSize: bustSize, hipMeasurement: hipMeasurement 
            }

        const rawResponse = await fetch(`http://${expoUrlJoey}/update_user_profile`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user_new_informations})
        })

        let response = await rawResponse.json()

        console.log(response)
    }

    const geolocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync();

      

        if (location) {
            const latitude = location.coords.latitude
            const longitude = location.coords.longitude
            let response = await Location.reverseGeocodeAsync({
                latitude ,
                longitude
            });

            console.log(response)
            setCity(response[0].city)
        
    }
}

// * ___________________________ AFFICHAGES SUR LA PAGE ___________________________


// * ___________________________ PAGE ___________________________
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >
        <ScrollView>
            <View style={{width : "100%", justifyContent: 'center', alignItems : 'center', alignItem : 'center'}}>

                <Text style={{marginBottom : 35, marginTop : 50, fontSize : 25, fontWeight : "bold"}}>Modifier son profil : </Text>

                <View style={{ flex: 1, justifyContent: 'center', marginTop : 30}}>
                
                {/* NAME */}
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                    <Text>Nom : </Text>
                    <Input
                    style={{width : "100%"}}
                        placeholder="Nom qui s'affichera sur votre profil"
                        onChangeText={setName}
                        value={name}
                    />
                </View>
                {/* VILLE */}
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                    <Text>Ville : </Text>
                    <Input
                        placeholder='Ma ville'
                        onChangeText={setCity}
                        value={city}
                        rightIcon={
                            <Ionicons onPress={() => geolocation()} name={"locate"} size={28} color="black" />
                        }
                    />
                </View>

                {/* DESCRIPTION */}
                <Text style={{marginBottom : 10, marginTop : 15, fontSize : 16,}}>À propos de moi : </Text>
                <TextInput
                    style={styles.input}
                    multiline = {true}
                    numberOfLines = {10}
                    placeholder="Ma description"
                    onChangeText={setDescription}
                    value={user.description === "" ? description : user.description}
                />

                <Text style={{marginBottom : 10, marginTop : 25, fontSize : 16,}}>CV et lien</Text>
                <TextInput
                    style={styles.input}
                    multiline = {true}
                    numberOfLines = {10}
                    placeholder="Ma formation, mes expériences..."
                    onChangeText={setCv}
                    value={cv.city === "" ? cv : user.cv}
                />

                {/* SELECTION DU GENRE */}
                <Text style={{marginBottom : 10, marginTop : 25, fontSize : 16,}}>Genre</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Femme"
                        onPress={() => { setGender(gender === "femme" ? "" : "femme") }}
                        checked={gender === "femme" ? true : false}

                    />
                    <CheckBox
                        center
                        title="Homme"
                        onPress={() => { setGender(gender === "homme" ? "" : "homme") }}
                        checked={gender === "homme" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Autre"
                        onPress={() => {
                            setGender(gender === "autre" ? "" : "autre")
                        }}
                        checked={gender === "autre" ? true : false}
                    />
                </View>

                {/* ___________________________________________________________________________________________________________________ */}

                <Divider
                    style={{ width: "80%", margin: 20 }}
                    color="#d3d3d3"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />

                {/* ___________________________________________________________________________________________________________________ */}

                {/* ETHNIE */}
                <Text style={{marginBottom : 10, marginTop : 25, fontSize : 16,}}>Ethnie</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Afro"
                        onPress={() => {
                            setEthnicGroup(ethnicGroup === "afro" ? "" : "afro")
                        }}
                        checked={ethnicGroup === "afro" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Asiatique"
                        onPress={() => {
                            setEthnicGroup(ethnicGroup === "asiatique" ? "" : "asiatique")
                        }}
                        checked={ethnicGroup === "asiatique" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Caucasien/ne"
                        onPress={() => {
                            setEthnicGroup(ethnicGroup === "caucasien/ne" ? "" : "caucasien/ne")
                        }}
                        checked={ethnicGroup === "caucasien/ne" ? true : false}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Hispanique"
                        onPress={() => {
                            setEthnicGroup(ethnicGroup === "hispanique" ? "" : "hispanique")
                        }}
                        checked={ethnicGroup === "hispanique" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Indien/ne"
                        onPress={() => {
                            setEthnicGroup(ethnicGroup === "indien/ne" ? "" : "indien/ne")
                        }}
                        checked={ethnicGroup === "indien/ne" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Oriental/e"
                        onPress={() => {
                            setEthnicGroup(ethnicGroup === "oriental/e" ? "" : "oriental/e")
                        }}
                        checked={ethnicGroup === "oriental/e" ? true : false}
                    />
                </View>

                {/* ___________________________________________________________________________________________________________________ */}

                <Divider
                    style={{ width: "80%", margin: 20 }}
                    color="#d3d3d3"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />

                {/* ___________________________________________________________________________________________________________________ */}

                {/* CHEVEUX */}
                <Text style={{marginBottom : 10, marginTop : 25, fontSize : 16,}}>Cheveux</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Blond"
                        onPress={() => {
                            setHair(hair === "blond" ? "" : "blond")
                        }}
                        checked={hair === "blond" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Brun"
                        onPress={() => {
                            setHair(hair === "brun" ? "" : "brun")
                        }}
                        checked={hair === "brun" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Noir"
                        onPress={() => {
                            setHair(hair === "noir" ? "" : "noir")
                        }}
                        checked={hair === "noir" ? true : false}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Gris"
                        onPress={() => {
                            setHair(hair === "gris" ? "" : "gris")
                        }}
                        checked={hair === "gris" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Blanc"
                        onPress={() => {
                            setHair(hair === "blanc" ? "" : "blanc")
                        }}
                        checked={hair === "blanc" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Chatain"
                        onPress={() => {
                            setHair(hair === "chatain" ? "" : "chatain")
                        }}
                        checked={hair === "chatain" ? true : false}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Roux"
                        onPress={() => {
                            setHair(hair === "roux" ? "" : "roux")
                        }}
                        checked={hair === "roux" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Couleur"
                        onPress={() => {
                            setHair(hair === "couleur" ? "" : "couleur")
                        }}
                        checked={hair === "couleur" ? true : false}
                    />
                </View>

                {/* ___________________________________________________________________________________________________________________ */}

                <Divider
                    style={{ width: "80%", margin: 20 }}
                    color="#d3d3d3"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />

                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- YEUX -------- */}
                <Text style={{marginBottom : 10, marginTop : 25, fontSize : 16,}}>Yeux</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Bleu"
                        onPress={() => {
                            setEyes(eyes === "bleu" ? "" : "bleu")
                        }}
                        checked={eyes === "bleu" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Gris"
                        onPress={() => {
                            setEyes(eyes === "gris" ? "" : "gris")
                        }}
                        checked={eyes === "gris" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Marron"
                        onPress={() => {
                            setEyes(eyes === "marron" ? "" : "marron")
                        }}
                        checked={eyes === "marron" ? true : false}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Noir"
                        onPress={() => {
                            setEyes(eyes === "noir" ? "" : "noir")
                        }}
                        checked={eyes === "noir" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Vairon"
                        onPress={() => {
                            setEyes(eyes === "vairon" ? "" : "vairon")
                        }}
                        checked={eyes === "vairon" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Vert"
                        onPress={() => {
                            setEyes(eyes === "vert" ? "" : "vert")
                        }}
                        checked={eyes === "vert" ? true : false}
                    />
                </View>

                {/* ___________________________________________________________________________________________________________________ */}

                <Divider
                    style={{ width: "80%", margin: 20 }}
                    color="#A1A1A1"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />

                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- TAILLE -------- */}
                <Text style={{marginBottom : 10, marginTop : 25, fontSize : 16,}}>Taille</Text>
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
                <Text style={{marginBottom : 10, marginTop : 25, fontSize : 16,}}>Poids</Text>
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

                <Divider
                    style={{ width: "80%", margin: 20 }}
                    color="#d3d3d3"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />

                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- MENSURATIONS -------- */}
                <Text style={{marginBottom : 25, marginTop : 25, fontSize : 16,}}>Mensurations</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Taille</Text>
                        <TextInput
                            style={styles.inputSmall}
                            placeholder="50 cm"
                            keyboardType="numeric"
                            onChangeText={setWaistSize}
                            value={waistSize}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Poitrine</Text>
                        <TextInput
                            style={styles.inputSmall}
                            placeholder="50 cm"
                            keyboardType="numeric"
                            onChangeText={setBustSize}
                            value={bustSize}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Hanches</Text>
                        <TextInput
                            style={styles.inputSmall}
                            placeholder="50 cm"
                            keyboardType="numeric"
                            onChangeText={setHipMeasurement}
                            value={hipMeasurement}
                        />
                    </View>
                </View>

                <Divider
                    style={{ width: "80%", margin: 20 }}
                    color="#d3d3d3"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />

                {/* ___________________________________________________________________________________________________________________ */}

                {/* -------- CORPULENCE -------- */}
                <Text style={{marginBottom : 10, marginTop : 25, fontSize : 16,}}>Corpulence</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Athlétique"
                        onPress={() => {
                            setCorpulence(corpulence === "athlétique" ? "" : "athlétique")
                        }}
                        checked={corpulence === "athlétique" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Bodybuildé/e"
                        onPress={() => {
                            setCorpulence(corpulence === "bodybuildé/e" ? "" : "bodybuildé/e")
                        }}
                        checked={corpulence === "bodybuildé/e" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Curvy"
                        onPress={() => {
                            setCorpulence(corpulence === "curvy" ? "" : "curvy")
                        }}
                        checked={corpulence === "curvy" ? true : false}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Enrobé/e"
                        onPress={() => {
                            setCorpulence(corpulence === "enrobé/e" ? "" : "enrobé/e")
                        }}
                        checked={corpulence === "enrobé/e" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Fin/e"
                        onPress={() => {
                            setCorpulence(corpulence === "fin/e" ? "" : "fin/e")
                        }}
                        checked={corpulence === "fin/e" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Maigre"
                        onPress={() => {
                            setCorpulence(corpulence === "maigre" ? "" : "maigre")
                        }}
                        checked={corpulence === "maigre" ? true : false}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                    <CheckBox
                        center
                        title="Musclé/e"
                        onPress={() => {
                            setCorpulence(corpulence === "musclé/e" ? "" : "musclé/e")
                        }}
                        checked={corpulence === "musclé/e" ? true : false}
                    />
                    <CheckBox
                        center
                        title="Moyen/ne"
                        onPress={() => {
                            setCorpulence(corpulence === "moyen/ne" ? "" : "moyen/ne")
                        }}
                        checked={corpulence === "moyen/ne" ? true : false}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginVertical: 100, backgroundColor: '#33333341'}} >
                    <Button
                        title="annuler"
                        titleStyle={{ paddingHorizontal: 30 }}
                        buttonStyle={{ borderRadius: 8, backgroundColor: "#000000", color: "black" }}
                        onPress={() => {
                            props.navigation.goBack()
                        }}
                    />
                    <Button
                        title="enregistrer"
                        titleStyle={{ paddingHorizontal: 25 }}
                        buttonStyle={{ borderRadius: 8, backgroundColor: "#1ADBAC", color: "black" }}
                        onPress={() => {
                            updateUserProfile()
                            props.navigation.navigate('ProfileScreen')
                        }}
                    />
                </View>

            </View>
            </View>
        </ScrollView >
    </KeyboardAvoidingView >
);
   

}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    container: {
       
    },
    input: {
        maxWidth: '90%',
        height: 100,
        margin: 12,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
    },
    inputSmall: {
        width: '85%',
        height: 45,
        margin: 12,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
    }
});

// * ___________________________ REDUX ___________________________
function mapStateToProps(state) {
    return { user: state.user }
}
function mapDispatchToProps(dispatch) {
    return {
        updateUserInformation: function (user) {
            dispatch({ type: 'updateUserInformation', user })

        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditScreen);
