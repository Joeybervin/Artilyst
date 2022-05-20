import React, { useState, useEffect } from 'react';

// & import des urls de chacune
import { expoUrlMustafa } from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

// ^ Module de balise
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Text, Button } from '@rneui/base';
import { Input, CheckBox, Slider, Divider } from "@rneui/themed";

// ^ Redux
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
// import { forceTouchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';


function ProfileEditScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */


    const  [userData, setUserData] = useState({})
    // Ville
    const [city, setCity] = useState('');
    // Description perso
    const [description, setDescription] = useState('');
    // Expérience professionnelles
    const [cv, setCv] = useState('');
    // Gender
    let genderDatabase = {}
    const [gender, setGender] = useState("");
    
    // Ethnic group
    const [ethnicGroup, setEthnicGroup] = useState("");
    // Hair
    const [hair, setHair] = useState("");
    // Eyes
    const [eyes, setEyes] = useState("");
    // Slider taille
    const [height, setHeight] = useState(0);
    // Slider poids
    const [weight, setWeight] = useState(0);
    // Mensurations
    const [waistSize, setWaistSize] = useState(0);
    const [bustSize, setBustSize] = useState(0);
    const [hipMeasurement, setHipMeasurement] = useState(0);
    // Corpulence 
    const [corpulence, setCorpulence] = useState("");

  


    /* VARIABLES */

    let informations = props.user; // le token de l'user stocker dans le store


    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    // Update du profil dans la bdd
    async function updateUserProfile() {
        const rawResponse = await fetch(`http://${expoUrlMustafa}/update_user_profile`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_token: informations.user_token, city: city, description: description, cv: cv,
                user_characteristics: {
                    gender: gender, ethnicGroup: ethnicGroup, hair: hair, eyes: eyes, height: height, weight: weight, corpulence: corpulence,
                    measurements: { waistSize: waistSize, bustSize: bustSize, hipMeasurement: hipMeasurement }
                }
            })
        })
    }

    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________


    // * ___________________________ PAGE ___________________________
            return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView>
                
                <View style={styles.container}>

                    {/* SELECTION DE LA VILLE */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                        <Text>Ville : </Text>
                        <Input
                            placeholder='Ma ville'
                            onChangeText={setCity}
                            value={userData.city === "" ? city : userData.city}
                        />
                    </View>

                    {/* DESCRIPTION */}
                    <Text>À propos de moi</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ma description"
                        onChangeText={setDescription}
                        value={userData.description === "" ? description : userData.description}
                    />

                    <Text>CV et lien</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ma formation, mes expériences..."
                        onChangeText={setCv}
                        value={cv.city === "" ? cv : userData.cv}
                    />

                    {/* SELECTION DU GENRE */}
                    <Text>Genre</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                        <CheckBox
                            center
                            title="Femme"
                            onPress={() => { setGender(gender === "femme" ? "" : "femme") }}
                            checked={userData.gender === "femme" ? true : false}

                        />
                        <CheckBox
                            center
                            title="Homme"
                            onPress={() => { setGender(gender === "homme" ? "" : "homme") }}
                            checked={userData.gender === "homme" ? true : false}
                        />
                        <CheckBox
                            center
                            title="Autre"
                            onPress={() => {
                                setGender(gender === "autre" ? "" : "autre")
                            }}
                            checked={userData.gender === "autre" ? true : false}
                        />
                    </View>

                    <Divider
                        style={{ width: "80%", margin: 20 }}
                        color="#d3d3d3"
                        insetType="middle"
                        width={1}
                        orientation="horizontal"
                    />

                    {/* ETHNIE */}
                    <Text>Ethnie</Text>
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

                    <Divider
                        style={{ width: "80%", margin: 20 }}
                        color="#d3d3d3"
                        insetType="middle"
                        width={1}
                        orientation="horizontal"
                    />

                    {/* CHEVEUX */}
                    <Text>Cheveux</Text>
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

                    <Divider
                        style={{ width: "80%", margin: 20 }}
                        color="#d3d3d3"
                        insetType="middle"
                        width={1}
                        orientation="horizontal"
                    />

                    {/* -------- YEUX -------- */}
                    <Text>Yeux</Text>
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

                    <Divider
                        style={{ width: "80%", margin: 20 }}
                        color="#d3d3d3"
                        insetType="middle"
                        width={1}
                        orientation="horizontal"
                    />

                    {/* -------- TAILLE -------- */}
                    <Text>Taille</Text>
                    <View>
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
                            thumbTintColor="#0c0"
                            thumbTouchSize={{ width: 40, height: 40 }}
                            trackStyle={{ height: 10, borderRadius: 20 }}
                            value={150}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text >100 cm</Text>
                            <Text style={{ color: 'green' }}>
                                {height} cm
                            </Text>
                            <Text>250 cm</Text>
                        </View>
                    </View>

                    <Text>Valeur</Text>


                    {/* -------- POIDS -------- */}
                    <Text>Poids</Text>
                    <View>
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
                                setWeight(value)
                                console.log("onValueChange()", value)
                            }}
                            orientation="horizontal"
                            step={1}
                            style={{ width: "80%", height: 80 }}
                            thumbStyle={{ height: 20, width: 20 }}
                            thumbTintColor="#0c0"
                            thumbTouchSize={{ width: 40, height: 40 }}
                            trackStyle={{ height: 10, borderRadius: 20 }}
                            value={150}
                        />

                    </View>

                    <Text>Valeur</Text>

                    <Divider
                        style={{ width: "80%", margin: 20 }}
                        color="#d3d3d3"
                        insetType="middle"
                        width={1}
                        orientation="horizontal"
                    />

                    {/* -------- MENSURATIONS -------- */}
                    <Text>Mensurations</Text>
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

                    {/* -------- CORPULENCE -------- */}
                    <Text>Corpulence</Text>
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

                    <Button containerStyle={{marginBottom : 100}} onPress={() => updateUserProfile()}>Enregistrer</Button>

                </View>

            </ScrollView >
        </KeyboardAvoidingView >
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
        maxWidth: '90%',
        height: 100,
        margin: 12,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
    },
    inputSmall: {
        width: '80%',
        height: 30,
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

export default connect(
    mapStateToProps,
    null
)(ProfileEditScreen);
