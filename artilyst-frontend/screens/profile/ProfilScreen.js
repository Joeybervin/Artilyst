import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';
import { expoUrlJoey } from '../../ExpoUrl';

//^ Module de balise
import { Dimensions, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';
// ^ Carousel
import Swiper from 'react-native-swiper'

// ^Redux
import { connect } from 'react-redux';

import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from "expo-image-picker";


function ProfilScreen(props) {


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [user, setUser0] = useState(props.user)
    const [pickedImagePath, setPickedImagePath] = useState("")


    /* VARIABLES */
    let sheetRef = React.useRef(null);
    let fall = new Animated.Value(1);
    let data = new FormData();



    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */

    // Récupérer infos du profil utilisateur




    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        // const result = await ImagePicker.launchImageLibraryAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,

            aspect: [4, 3],
            quality: 1,
        });

        // Explore the result
   

        console.log(result.uri)
        setPickedImagePath(result.uri);

      
    }


    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        setPickedImagePath(result.uri);
        
        console.log(pickedImagePath)


        if (!result.cancelled) {

            if (pickedImagePath) {

          
            data.append(
                'image_uploaded', {
                uri: pickedImagePath,
                type: 'image/jpeg',
                name: user.token, // ! A CORRIGER
                
            });
            console.log( "DATA : ", data)

            let data_uploaded = await fetch(`http://${expoUrlJoey}/upload_photo_profil`,
             {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data; ',
                  },
                body: data , 
            })

            let result = await data_uploaded.json()
            props.addPictures(result.url, user)
            
            }
        }
    }

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Modifier vos photos</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
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

    const userPhotos = user.profile_photo.map((element, index) => {
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

    return (

        <ScrollView style={styles.container}>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[400, 0]}
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
                        name={user.profile_photo.lenght === 0 ? 'images' : "camera-outline"} color="#ffffff" size={30}
                        onPress={() => sheetRef.current.snapTo(0)} />
                </View>


                {/* -------- BOUTONS --------  */}
                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginBottom: 15, backgroundColor: '#33333341', width: "100%" }} >
                    <Button
                        title="Portfolio"
                        titleStyle={{ paddingHorizontal: 30 }}
                        buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                    />
                    <Button
                        title="Modifier profil"
                        titleStyle={{ paddingHorizontal: 25 }}
                        buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                        onPress={() => {
                            props.getAllUserInformations(user)
                            props.navigation.navigate('ProfileEditScreen')
                        }}
                    />
                </View>


                {/* -------- INFORMATIONS --------  */}
                <View style={styles.firstInformations} >
                    <Text h5 style={{ fontWeight: "bold", marginRight: 35, fontSize: 20 }}>{user.name}
                        <Ionicons name={genderIcon(user.gender)} size={19} color='black' />
                    </Text>
                    <View style={styles.location}>
                        <Ionicons name={'location-sharp'} size={24} color='black' />
                        <Text h5 style={{ fontSize: 20, marginLeft: 10 }}>{user.city}</Text>
                    </View>
                </View>


                {/* -------- CATEGORIE --------  */}
                <View style={styles.occupationContainer}>
                    <Text style={styles.occupationText}>{user.occupation}</Text>
                </View>

                {/* -------- ABOUT --------  */}
                <View style={{ marginBottom: 25 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>À propos de moi :</Text>
                    <Text>{user.description}</Text>
                </View>


                {/* -------- USER CARACTERISTICS --------  */}
                <View style={styles.caracteristicsContainer}>
                    <Text>couleur des yeux : {user.user_caracteristics.eyes}</Text>
                    <Text>Ethnie : {user.user_caracteristics.ethnie}</Text>

                    <Text>Corpulence : {user.user_caracteristics.corpulence}</Text>
                    <Text>Taille : {user.user_caracteristics.height}cm  Poids : {user.user_caracteristics.weight}kg</Text>
                    {/* Mensuration */}
                    <Text>Mensurations :</Text>
                    <Text>taille : {user.user_caracteristics.measurments.waist} cm  -  poitrine : {user.user_caracteristics.measurments.bust} cm</Text>
                    <Text></Text>

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
        height: 400,
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
        getAllUserInformations: function (user) {
            dispatch({ type: 'addInfosToUser', user })
        },
        addPictures: function (photoUrl, user) {
            dispatch({ type: 'addPictures', photoUrl : photoUrl, user : user })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilScreen);


