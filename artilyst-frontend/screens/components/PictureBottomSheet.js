import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';

import { expoUrlRaf } from '../../ExpoUrl';


//^ Module de balise
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { Text } from '@rneui/base';
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from "expo-image-picker";



export default function PictureBottomSheet(props) {
        // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */

    const [user, setUser] = useState(props.user) 

    /* VARIABLES */
    let sheetRef = React.useRef(null);
    let fall = new Animated.Value(1);
    let data = new FormData();

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
                accessPrivileges : "all"
            });
    
            if (!MediaLibraryResult.cancelled) {
    
                sheetRef.current.snapTo(1) // Pou abaisser le BottomSheet
    
                if (MediaLibraryResult.uri) {
    
                setOverlayVisibility(true)
    
                data.append(
                    'image_uploaded', {
                    uri: MediaLibraryResult.uri,
                    type: 'image/jpeg',
                    name: user.token, // ! A CORRIGER
                    
                });
            
                
    
                let data_uploaded = await fetch(`http://${expoUrlRaf}/upload_image_profil`,
                {
                    method: 'post',
                    body: data , 
                })
                let result = await data_uploaded.json()
    
                props.addPictures(result.url, user)
               
    
                if (result) {
                    setOverlayVisibility(false)
                }
    
                let copyUserInfos = {...props.user}
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
    
                data.append(
                    'image_uploaded', {
                    uri: resultCamera.uri,
                    type: 'image/jpeg',
                    name: user.token, // ! A CORRIGER
                    
                });
     
                
                
                let data_uploaded = await fetch(`http://${expoUrlRaf}/upload_image_profil`,
                 {
                    method: 'post',
                    body: data , 
                })
    
                let result = await data_uploaded.json()
                props.addPictures(result.url, user)
                if (result) {
                    setOverlayVisibility(false)
                }
                
                let copyUserInfos = {...props.user}
                setUser(copyUserInfos)
                
                }
            }
        }
    
        /* Pour rediriger vers la gallery */ // ! A REVOIR
        const goToGallery = () => {
            props.navigation.navigate("GalleryScreen")
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


    return (

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
    containerRaf: {
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
