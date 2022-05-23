
import Animated from 'react-native-reanimated';
import { expoUrlJoey } from '../../../ExpoUrl';

import React, { useRef, useState, useEffect } from 'react';

import PictureBottomSheet from '../../components/PictureBottomSheet'

//^ Module de balise
import { Dimensions, StyleSheet, View,  ScrollView, TouchableOpacity, ImageBackground , ActivityIndicator} from 'react-native';
import { Image,Text, Button } from '@rneui/base';
import { Overlay } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';

// ^ Redux
import { connect } from 'react-redux';

import BottomSheet from 'reanimated-bottom-sheet';

import * as ImagePicker from "expo-image-picker";

let { width : screenWidth , height : screenHeight } = Dimensions.get('screen')


function GalleryScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    
    const  params  = props.route.params;
    console.log("params",params)
    const [user, setUser] = useState(props.user)
    let AllUserProfileImages, AllPortfolioImages;
    let sheetRef = React.useRef(null);    
    let fall = new Animated.Value(1);
    let data = new FormData();
    const [indexRoute, setIndexRoute] = useState("")
    const [overlayVisibility, setOverlayVisibility] = useState(false); // Pour le chargement de l'image

    // * ___________________________ FUNCTIONS ___________________________
    // ! ___________________________ A REVOIR ___________________________

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

    const AddImage = async (route) => { // Pour définir la route à appeler
        if (route === "upload_image_profil") setIndexRoute("upload_image_profil")
        if (route === "upload_image_portfolio") setIndexRoute("upload_image_portfolio")
    }

    const showImagePicker = async () => { // Choisir une photo depuis sont téléphone
        // Deamande à l'utilisateur l'accès à sa gallery
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

    
        const MediaLibraryResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!MediaLibraryResult.cancelled) {

            sheetRef.current.snapTo(1) // Pou abaisser le BottomSheet

            if (MediaLibraryResult.uri) {

            setOverlayVisibility(true)

            data.append("token" , user.token ) // J'envoie le token de l'utilisateur
            if ( params.profileImage !== "profileImage") data.append("portofolioName" , props.user.portfolio[params.portfolioIndex].title ) 
            data.append(
                'image_uploaded', {
                uri: MediaLibraryResult.uri,
                type: 'image/jpeg',
                name: 'image_uploaded.jpg',
                
            });
        
            

            let data_uploaded = await fetch(`http://${expoUrlJoey}/${indexRoute}`,
            {
                method: 'PUT',
                body: data , 
            })
            let result = await data_uploaded.json()

            if ( params.profileImage === "profileImage") props.addPictures(result.url, user)
            if ( params.profileImage !== "profileImage") props.AddPorfolioImage(result.url, params.portfolioIndex, user) // suppression dans le store
           

            if (result) {
                setOverlayVisibility(false)
            }

            let copyUserInfos = {...props.user}
            setUser(copyUserInfos)
            
            
            }
        }

        
    }

    const openCamera = async () => { // Ajouter une photo depuis la caméra de l'appareil
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) { // Permission refusé par l'utilisateur
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const resultCamera = await ImagePicker.launchCameraAsync();
        
        if (!resultCamera.cancelled) {

            sheetRef.current.snapTo(1) // Pour abaisser le BottomSheet

            if (resultCamera.uri) {

           setOverlayVisibility(true) //  chargement de la photo

            data.append("token" , user.token ) // J'envoie le token de l'utilisateur
            if ( params.profileImage !== "profileImage") data.append("portofolioName" , props.user.portfolio[params.portfolioIndex].title ) 
         
            data.append(
                'image_uploaded', {
                uri: resultCamera.uri,
                type: 'image/jpeg',
                name: 'image_uploaded.jpeg',
            });

            let data_uploaded = await fetch(`http://${expoUrlJoey}/${indexRoute}`,
             {
                method: 'PUT',
                body: data , 
            })

            let result = await data_uploaded.json()

            if ( params.profileImage === "profileImage") props.addPictures(result.url, user)
            if ( params.profileImage !== "profileImage") props.AddPorfolioImage(result.url, params.portfolioIndex, user) // suppression dans le store

            if (result) {
                setOverlayVisibility(false)
            }
            
            let copyUserInfos = {...props.user}
            setUser(copyUserInfos)
            
            }
        }
    }
    
    // * ___________________________ AFFICHAGES DE LA PAGE ___________________________
    if (props.user.profile_photo.length === 0  ) {
        
        AllUserProfileImages = ["https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg"].map((element, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => {}}>
                    <Image
                    style={{ width: screenWidth / 3 - 4, height: screenHeight / 3, margin : 2, borderRadius : 4}}
                    resizeMode="contain"
                    source={{uri : element}}
                    PlaceholderContent="image"
                    />
                    
            </TouchableOpacity>
            )
        })
    }
    else {
        if (params.profileImage === "profileImage") {

            AllUserProfileImages = props.user.profile_photo.map((element, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('PictureZoomScreen', {profileImageUrl : element})}}>
                        <Image
                        style={{ width: screenWidth / 3 - 4, height: screenHeight / 3, margin : 2, borderRadius : 4}}
                    
                        source={{uri : element}}
                        PlaceholderContent="image"
                        />
                </TouchableOpacity>
                )
            })

        }
        else {

            if (props.user.portfolio[params.portfolioIndex].images.length === 0 ) {

                AllPortfolioImages = ["https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg"].map((element, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => {}}>
                            <Image
                            style={{ width: screenWidth / 3 - 4, height: screenHeight / 3, margin : 2, borderRadius : 4}}
                            resizeMode="contain"
                            source={{uri : element}}
                            PlaceholderContent="image"
                            />
                            
                    </TouchableOpacity>
                    )
                })
            }
            else {
                AllPortfolioImages = props.user.portfolio[params.portfolioIndex].images.map((element, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('PictureZoomScreen', {portfolioImageUrl : element, portfolioIndex : params.portfolioIndex })}}>
                            <Image
                            style={{ width: screenWidth / 3 - 4, height: screenHeight / 3, margin : 2, borderRadius : 4}}
                        
                            source={{uri : element}}
                            PlaceholderContent="image"
                            />
                    </TouchableOpacity>
                    )
                })
            }
                

        }
        
    }

    // * ___________________________ PAGE ___________________________

    return (


        <ScrollView ContainerStyle={{ flex : 1, backgroundColor : "#ffffff" }} style={{flex : 1}}>

            <Overlay isVisible={overlayVisibility} >
                <ActivityIndicator size="large" color="#000000"/>
                <Text>Chargement de l'image</Text>
            </Overlay>


              <BottomSheet // ! A REVOIR
                ref={sheetRef}
                snapPoints={[500, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callBackNode={fall}
                enabledContentGestureInteraction={true}
                borderRadius={10}
            />




            <View style={{alignItems : "center"}}>

                {/* Soit le mot "Gallery" s'affichera soit le nom du portofolio choisit */}
                < Text style={{fontSize : 25, marginVertical : 35}}>{params.profileImage === "profileImage" ? "Gallery : " : `Portofolio : ${props.user.portfolio[params.portfolioIndex].title}` }</Text>
                <View style={{dipslay : "flex",flexDirection : 'row', flexWrap : "wrap", paddingVertical : 25}}>

                    {/* Soit nous voyons les photo de profile soit les photos d' un portofolio en particulier*/}
                        {params.profileImage === "profileImage" ? AllUserProfileImages : AllPortfolioImages }

                    <Button
                    raised
                    type="solid"
                    containerStyle={{ borderWidth: 2, borderRadius: 10, borderColor: 'transparent', height: 70, width: "20%", marginLeft : 15 ,marginVertical : "auto"}}
                    buttonStyle={{ borderRadius: 8, height: 70, backgroundColor: '#333333' }}
                    onPress={() => { sheetRef.current.snapTo(0)
                        {params.profileImage === "profileImage" ? AddImage("upload_image_profil") : AddImage("upload_image_portfolio") } }}
                    >
                        <Text style={{color: "white"}}></Text>

                        <Ionicons
                            style={styles.icon}
                            color='white'
                            name="add"
                            size={40}
                        />
                    </Button>



                
            
            
            
            </View>


</View>

              
        </ScrollView>

    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
            dispatch({ type: 'addPictures', photoUrl , user })
        },
        AddPorfolioImage: function (portfolioImageUrl, portfolioIndex , user) {
            dispatch({ type: 'AddPorfolioImage', portfolioImageUrl , portfolioIndex,  user })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GalleryScreen);