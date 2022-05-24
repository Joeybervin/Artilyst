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
import { useIsFocused } from '@react-navigation/native';


function ProfileScreen(props) {


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */

    const [user, setUser] = useState(props.user)
    const [overlayVisibility, setOverlayVisibility] = useState(false); // Pour le chargement de l'image


    /* VARIABLES */
    const params  = props.route.params;
    const isFocused = useIsFocused();
    let userProfileImages;
    let sheetRef = React.useRef(null);
    let fall = new Animated.Value(1);
    let data = new FormData();

    if (!isFocused) { // ! A REVOIR
        params.user = "current"
    }

    if (params.user === "current") console.log("current")
    if (params.user !== "current") console.log("other")

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
                <Text style={styles.panelTitle}>Modifier vos photos</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={goToGallery}>
                <Text style={styles.panelButtonTitle}>Gallery photos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={showImagePicker}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => sheetRef.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    /* Pour afficher l'icon de "genre" des utilisateurs */
    const genderIcon = (gender) => { //pour montrer le logo correspondant au sexe de l'utilisateur
        if (gender === 'femme') {
            return "female-outline"
        }
        else if (gender === 'male') {
            return "male-outline"
        } else {
            return "male-female-outline"
        }
    }

    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */
    
    if (user.profile_photo.length > 0) {
        userProfileImages = props.user.profile_photo
    }
    else {
        console.log("LAAAAAAA")
        userProfileImages = ["https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg"]
    }


    const userPhotos = userProfileImages.map((element, index) => {
        console.log(element)
        return (
            <View key={index} style={{ width: "100%", height: "100%", borderRadius: 10, alignItems: "center" }}>
                <Image
                    style={{ width: Dimensions.get('screen').width - 20, resizeMode: 'cover', height: 350, borderRadius: 25, }}
                    key={index}
                    source={{ uri: element }}
                />
            </View>
        )
    })



    // * ___________________________ PAGE ___________________________



    if (user.occupation === "recruteur" && params.user === "current") {

        let editProdilleButton = <Button
        title="Modifier profil"
        titleStyle={{ paddingHorizontal: 25 }}
        buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
        onPress={() => {
            props.navigation.navigate('ProfileEditScreen')
        }}
    />

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
                    snapPoints={[500, 0]}
                    renderContent={renderInner}
                    renderHeader={renderHeader}
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
                            <Text h5 style={{ fontSize: 20, marginLeft: 10 }}>{user.city ? user.city : "non renseigné"}</Text>
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
    
    
                    {/* -------- USER CARACTERISTICS --------  */}
    
                </View>
            </ScrollView>
        );
    }
    else {

        let currentUserButtons = (
            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginBottom: 15, backgroundColor: '#33333341', width: "100%" }} >
                <Button
                    title="Portfolio"
                    titleStyle={{ paddingHorizontal: 30 }}
                    buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                    onPress={() => {
                        props.navigation.navigate('PortfoliosScreen', {user : "current"})
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

            </View>)
        
        
        let anotherUserButtons = (
            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginBottom: 15, backgroundColor: '#33333341', width: "100%" }} >
                        
                <Button
                    title="Portfolio"
                    titleStyle={{ paddingHorizontal: 30 }}
                    buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                    onPress={() => {
                        props.navigation.navigate('PortfoliosScreen', {user : params.user})
                    }}
                />

            <Button
                title="engager"
                titleStyle={{ paddingHorizontal: 25 }}
                buttonStyle={{ borderRadius: 8, backgroundColor: "#1ADBAC", color: "black" }}
                onPress={() => {console.log("ROUTE DE MUSTAFA !!! ")}}
            />

                        
        </View>
        
        
)
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
                    snapPoints={[500, 0]}
                    renderContent={renderInner}
                    renderHeader={renderHeader}
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

                    {params.token ===  user.token ? currentUserButtons : anotherUserButtons }
                    


                    {/* -------- INFORMATIONS --------  */}
                    <View style={styles.firstInformations} >
                        <Text h5 style={{ fontWeight: "bold", marginRight: 35, fontSize: 20 }}>{user.name}
                            <Ionicons name={genderIcon(user.gender ? user.gender : "male-female-outline")} size={19} color='black' />
                        </Text>
                        <View style={styles.location}>
                            <Ionicons name={'location-sharp'} size={24} color='black' />
                            <Text h5 style={{ fontSize: 20, marginLeft: 10 }}>{user.city ? user.city : "non renseigné"}</Text>
                        </View>
                    </View>


                    {/* -------- CATEGORIE --------  */}
                    <View style={styles.occupationContainer}>
                        <Text style={styles.occupationText}>{user.occupation ? user.occupation : "non renseigné"}</Text>
                    </View>

                    {/* -------- ABOUT --------  */}
                    <View style={{ marginBottom: 25 }}>
                        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>À propos de moi :</Text>
                        <Text>{user.description !== undefined ? user.description : "non renseigné"}</Text>
                    </View>


                    {/* -------- USER CARACTERISTICS --------  */}


                    <View style={styles.caracteristicsContainer}>

                        <Text>Groupe ethnique : {user.characteristics.ethnicGroup === null ? "non renseigné" : user.characteristics.ethnicGroup}</Text>


                        <Text>couleur des yeux : {user.characteristics.eyes === null ? "non renseigné" : user.characteristics.eyes}</Text>
                        <Text>couleur des cheveux : {user.characteristics.hair === null ? "non renseigné" : user.characteristics.hair}</Text>



                        <Text>Corpulence : {user.characteristics.corpulence !== null ? user.characteristics.corpulence : "non renseigné"}</Text>

                        <Text>Taille : {user.characteristics.height !== null ? user.characteristics.height : "--"} cm  Poids : {user.characteristics.weight !== null ? user.characteristics.weight : "--"} kg</Text>
                        {/* Mensuration */}

                        <Text>Mensurations :</Text>
                        <Text>taille : {user.characteristics.measurements.waist !== null ? user.characteristics.measurements.waist : "--"} cm  -  poitrine : {user.characteristics.measurements.bust !== null ? user.characteristics.measurements.bust : "--"} cm -  hanche : {user.characteristics.measurements.hips !== null ? user.characteristics.measurements.hips : "--"} cm</Text>


                    </View>




                </View>
            </ScrollView>
        );
    }
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
    containerJoey: {
        marginHorizontal: 10
    },
    swipperContainer: {
        width: "100%",
        height: 350,
        marginBottom: 15
    },
    wrapper: {},
    firstInformations: {
        flexDirection: 'row',
    },
    location: {
        flexDirection: 'row',
        marginLeft: 10
    },
    occupationContainer: {
        backgroundColor: '#6E6E6E',
        borderRadius: 5,
        width: "70%",
        alignItems: 'center',
        marginTop: 35,
        marginBottom: 25
    },
    occupationText: {
        color: "white"
    },
    caracteristicsContainer: {
        lineHeiight: 2
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
        height: 500,
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
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
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
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
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


