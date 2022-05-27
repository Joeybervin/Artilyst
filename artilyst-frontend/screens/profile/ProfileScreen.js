import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';

import { expoUrlJoey } from '../../ExpoUrl';


//^ Module de balise
import { Dimensions, StyleSheet, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Button } from '@rneui/base';
import { Overlay } from "@rneui/themed";
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^ Carousel
import Swiper from 'react-native-swiper'

// ^Redux
import { connect } from 'react-redux';

import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from "expo-image-picker";

import {  subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';
import { PortfolioBtn, ModifierProfilBtn } from '../components/ButtonsStyles';


function ProfileScreen(props) {


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */

    const [user, setUser] = useState(props.user)
    const [overlayVisibility, setOverlayVisibility] = useState(false); // Pour le chargement de l'image

    

    /* VARIABLES */
    let sheetRef = React.useRef(null);
    let fall = new Animated.Value(1);
    let data = new FormData();

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    /* Pour ouvrir le dossier image/video de l'utilisateur et la rajouter (database + reducer  => profil) */
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        // const result = await ImagePicker.launchImageLibraryAsync();
        const MediaLibraryResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            accessPrivileges: "all"
        });

        if (!MediaLibraryResult.cancelled) {

            sheetRef.current.snapTo(1) // Pou abaisser le BottomSheet

            if (MediaLibraryResult.uri) {

                setOverlayVisibility(true)

                data.append("token", user.token) // J'envoie le token de l'utilisateur
                data.append(
                    'image_uploaded', {
                    uri: MediaLibraryResult.uri,
                    type: 'image/jpeg',
                    name: 'image_uploaded.jpeg',

                });


                let data_uploaded = await fetch(`http://${expoUrlJoey}/upload_image_profil`,
                    {
                        method: 'PUT',
                        body: data,
                    })
                let result = await data_uploaded.json()

                props.addPictures(result.url, user)


                if (result) {
                    setOverlayVisibility(false)
                }

                let copyUserInfos = { ...props.user }
                setUser(copyUserInfos)

            }
        }
    }

    /* Pour ouvrir la camera de l'utilisateur prendre une photo et la rajouter (database + reducer  => profil) */
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const resultCamera = await ImagePicker.launchCameraAsync();


        if (!resultCamera.cancelled) {

            sheetRef.current.snapTo(1) // Pou abaisser le BottomSheet

            if (resultCamera.uri) {

                setOverlayVisibility(true) // chargement de la photo

                data.append("token", user.token) // J'envoie le token de l'utilisateur
                data.append(
                    'image_uploaded', {
                    uri: resultCamera.uri,
                    type: 'image/jpeg',
                    name: 'image_uploaded.jpg',

                });



                let data_uploaded = await fetch(`http://${expoUrlJoey}/upload_image_profil`,
                    {
                        method: 'PUT',
                        body: data,
                    })


                let result = await data_uploaded.json()
                props.addPictures(result.url, user)
                if (result) {
                    setOverlayVisibility(false)
                }

                let copyUserInfos = { ...props.user }
                setUser(copyUserInfos)

            }
        }
    }

    /* Pour rediriger vers la gallery */
    const goToGallery = () => {
        props.navigation.navigate("GalleryScreen", { profileImage: "profileImage" })
    }

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Ajouter une photo</Text>
                <Text style={styles.panelSubtitle}>Choisissez votre photo de profil</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={goToGallery}>
                <Text style={styles.panelButtonTitle}>Galerie photos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
                <Text style={styles.panelButtonTitle}>Prendre une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={showImagePicker}>
                <Text style={styles.panelButtonTitle}>Ouvrir la bibliothèque</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButtonCancel}
                onPress={() => sheetRef.current.snapTo(1)}>
                <Text style={styles.panelButtonTitleCancel}>Annuler</Text>
            </TouchableOpacity>
        </View>
    );

    /* Pour afficher l'icon de "genre" des utilisateurs */
    const genderIcon = (gender) => { //pour montrer le logo correspondant au sexe de l'utilisateur
        if (gender === 'femme') {
            return "female-outline"
        }
        else if (gender === 'homme') {
            return "male-outline"
        } else {
            return "male-female-outline"
        }
    }

    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */

    let userProfileImages
    if (user.profile_photo.length > 0) {
        userProfileImages = props.user.profile_photo
    }
    else {
        userProfileImages = ["https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg"]
    }


    const userPhotos = userProfileImages.map((element, index) => {
        return (
            <View key={index} style={{ width: "100%", height: "100%", borderRadius: 10, alignItems: "center" }}>
                <Image
                    style={{ width: Dimensions.get('screen').width - 60, resizeMode: 'cover', height: 300, borderRadius: 20, }}
                    key={index}
                    source={{ uri: element }}
                />
            </View>
        )
    })

    console.log(user)


    // * ___________________________ PAGE ___________________________



    if (user.occupation === "recruteur") {
        return (
            <ScrollView style={styles.container}>

                <Overlay
                    isVisible={overlayVisibility}
                >
                    <ActivityIndicator size="large" color="#000000" />
                    <Text>Chargement de l'image</Text>

                </Overlay>

                <BottomSheet
                    ref={sheetRef}
                    snapPoints={[1050, 0]}
                    renderContent={renderInner}
                    initialSnap={1}
                    callBackNode={fall}
                    enabledContentGestureInteraction={true}
                    borderRadius={10}
                />


                <View style={styles.mainContainer}>

                    {/* -------- CARROUSEL D'IMAGES --------  */}
                    <View style={styles.swipperContainer}>
                        <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="white" dotColor='rgba(0,0,0,.6)' showsHorizontalScrollIndicator={true}>

                            {userPhotos}

                        </Swiper>
                        <Ionicons style={{ position: 'absolute', bottom: 5, right: 25, padding: 15, borderRadius: 50 }}
                            name={user.profile_photo.length === 0 ? 'images' : "camera-outline"} color="#ffffff" size={30}
                            onPress={() => sheetRef.current.snapTo(0)} />

                    </View>


                    {/* -------- BOUTONS --------  */}
                    <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginBottom: 15, backgroundColor: '#33333341', width: "100%" }} >
                        <Button
                            title="Portfolio"
                            titleStyle={{ paddingHorizontal: 30 }}
                            buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                            onPress={() => {
                                props.navigation.navigate('PortfoliosScreen')
                            }}
                        />
                        <Button
                            title="Modifier profil"
                            titleStyle={{ paddingHorizontal: 25 }}
                            buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                            onPress={() => {
                                props.navigation.navigate('ProfileEditScreen')
                            }}
                        />
                    </View>


                    {/* -------- INFORMATIONS --------  */}
                    <View style={styles.firstInformations} >
                        <Text h5 style={{ fontWeight: "bold", marginRight: 35, fontSize: 20 }}>{user.name}
                        </Text>
                        <View style={styles.location}>
                            <Ionicons name={'location-sharp'} size={24} color='black' />
                            <Text h5 style={{ fontSize: 20, marginLeft: 10 }}>{user.location ? user.location : "non renseigné"}</Text>
                        </View>
                    </View>


                    {/* -------- CATEGORIE --------  */}
                    <View style={styles.occupationContainer}>
                        <Text style={styles.occupationText}>{user.occupation ? user.occupation : "non renseigné"}</Text>
                    </View>

                    {/* -------- ABOUT --------  */}
                    <View style={{ marginBottom: 25 }}>
                        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>À propos :</Text>
                        <Text>{user.description !== undefined ? user.description : "non renseigné"}</Text>
                    </View>

                </View>
            </ScrollView>
        );
    }
    else {
        return (
            <ScrollView style={styles.container}>

                <Overlay
                    isVisible={overlayVisibility}
                >
                    <ActivityIndicator size="large" color="#000000" />
                    <Text>Chargement de l'image</Text>

                </Overlay>

                <BottomSheet
                    ref={sheetRef}
                    snapPoints={[1050, 0]}
                    renderContent={renderInner}
                    initialSnap={1}
                    callBackNode={fall}
                    enabledContentGestureInteraction={true}
                    borderRadius={10}
                />


                <View style={styles.mainContainer}>

                    {/* -------- CARROUSEL D'IMAGES --------  */}
                    <View style={styles.swipperContainer}>
                        <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="#1ADBAC" dotColor='white' showsHorizontalScrollIndicator={false}>

                            {userPhotos}

                        </Swiper>
                        <Ionicons style={{ position: 'absolute', bottom: 0, right: 35, padding: 15, borderRadius: 50 }}
                            name={user.profile_photo.length === 0 ? 'images' : "camera-outline"} color="#ffffff" size={40}
                            onPress={() => sheetRef.current.snapTo(0)} />

                    </View>


                    {/* -------- INFORMATIONS --------  */}
                    <View style={styles.firstInformations} >
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 5 , marginRight : 8}}>{user.name}</Text>
                        <Ionicons name={genderIcon(user.characteristics.gender ? user.characteristics.gender : "male-female-outline")} size={25} color='black' /> 
                    </View>
                    <View style={styles.location}>
                        <Ionicons style={{marginRight : 8}} name={'location-sharp'} size={18} color='black' />
                        <Text style={styles.textRegular}>{user.location ? user.location : "Non renseigné"}</Text>
                    </View>

                    {/* -------- CATEGORIE --------  */}
                    <View style={styles.occupationContainer}>
                        <Text style={styles.occupationText}>{user.occupation ? user.occupation : "Non renseigné"}</Text>
                    </View>


                    {/* -------- BOUTONS --------  */}
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", marginBottom: 10, width: "100%" }} >

                        <PortfolioBtn style={{borderWidth : 2, borderColor : 'black'}} onPressHandler={() => props.navigation.navigate('PortfoliosScreen')} />
                        <ModifierProfilBtn onPressHandler={() => props.navigation.navigate('ProfileEditScreen')} />

                    </View>


                    <View style={{ width : "90%", justifyContent: 'center', textAlign: 'center', marginVertical : 25 }}>
                        {/* -------- ABOUT --------  */}
                        <View style={{ marginBottom: 25 }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}>À propos</Text>
                            <Text>{user.description !== undefined ? user.description : "non renseigné"}</Text>
                        </View>

                         {/* -------- CV --------  */}
                         <View style={{ marginBottom: 25 }}>
                            <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}>Expériences pro</Text>
                            <Text>{user.cv !== undefined ? user.cv : "non renseigné"}</Text>
                        </View>

                        {/* -------- USER CARACTERISTICS --------  */}
                        <View >
                         <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}>Informations</Text>
                            <View style={{flexDirection : 'row', flexWrap : 'wrap'}}>
                                
                                <Text style={styles.badge}> 
                                    <Image source={require('../../assets/diversity.png')} style={{width : 25, height : 25,paddingRight : 10}}/>  {user.characteristics.ethnicGroup === null ? "non renseigné" : user.characteristics.ethnicGroup}
                                </Text>

                                {/* Eyes */}
                                <Text style={styles.badge}>
                                    <Image source={require('../../assets/eye.png')} style={{width : 25, height : 25,paddingRight : 10}}/>  {user.characteristics.eyes === null ? "non renseigné" : user.characteristics.eyes}
                                </Text>

                                {/* hair */}
                                <Text style={styles.badge}>
                                    <Image source={require('../../assets/hair.png')} style={{width : 25, height : 25,paddingRight : 10}}/>  {user.characteristics.hair === null ? "non renseigné" : user.characteristics.hair}
                                </Text>

                                {/* corpulence */}
                                <Text style={styles.badge}>
                                    <Image source={require('../../assets/body.png')} style={{width : 25, height : 25,paddingRight : 10}}/>  {user.characteristics.corpulence !== null ? user.characteristics.corpulence : "non renseigné"}
                                </Text>

                                {/* Taille */}
                                <Text style={styles.badge}>
                                    <Image source={require('../../assets/height.png')} style={{width : 25, height : 25,paddingRight : 10}}/>  {user.characteristics.height !== null ? user.characteristics.height : "--"} cm
                                </Text>

                                {/* Poids */}
                                <Text style={styles.badge}>
                                    <Image source={require('../../assets/weight.png')} style={{width : 25, height : 25,paddingRight : 10}}/>  {user.characteristics.weight !== null ? user.characteristics.weight : "--"} kg
                                </Text>

                                {/* Mensurations */}
                                <Text style={styles.badge}>
                                <Image source={require('../../assets/waist.png')} style={{width : 20, height : 20,paddingRight : 10}}/> {user.characteristics.measurements.waist !== null ? user.characteristics.measurements.waist : "--"} cm
                                </Text>

                                <Text style={styles.badge}>
                                    <Image source={require('../../assets/bust.png')} style={{width : 20, height : 20,paddingRight : 10}}/> {user.characteristics.measurements.bust !== null ? user.characteristics.measurements.bust : "--"} cm
                                </Text>


                                <Text style={styles.badge}>
                                    <Image source={require('../../assets/hips.png')} style={{width : 20, height : 20,paddingRight : 10}}/>  {user.characteristics.measurements.hips !== null ? user.characteristics.measurements.hips : "--"} cm
                                </Text>
                            </View>
                        </View>
                    </View>



                </View>
            </ScrollView >
        );
    }
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainContainer: {
        marginTop: 10,
        marginBottom: 115,
        justifyContent: 'center',
        alignItems: "center",
    },
    containerRaf: {
        marginHorizontal: 10
    },
    swipperContainer: {
        width: '100%',
        height: 300,
        marginBottom: 15
    },
    wrapper: {},

    firstInformations: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    location: {
        flexDirection: 'row',


    },
    occupationContainer: {
        borderRadius: 7,
        width: "30%",
        height: 30,
        backgroundColor: 'black',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 15
    },
    occupationText: {
        color: '#fff',
        fontSize: 16
    },
    caracteristicsContainer: {
        lineHeight: 10,
        textAlign: 'center'
    },
    badge : {
        margin: 8, 
        padding: 8,
        paddingHorizontal : 15, 
        borderRadius: 12, 
        color: 'white', 
        backgroundColor: '#C0C0C0F4', 
        fontWeight: 'bold',
        justifyContent : 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#1ADBAC',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        height: 1050,
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#1ADBAC',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonCancel :  {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        marginVertical: 7,
    },

    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },panelButtonTitleCancel : {
        fontSize: 17,
        fontWeight: 'bold',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },

    // -- GLOBAL STYLE ----------

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

// * ___________________________ REDUX ___________________________
function mapStateToProps(state) {
    return { user: state.user }
}

function mapDispatchToProps(dispatch) {
    return {
        addPictures: function (photoUrl, user) {
            dispatch({ type: 'addPictures', photoUrl, user })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileScreen);


