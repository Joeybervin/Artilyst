
import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';
import { expoUrlRaf } from '../../ExpoUrl';

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
    const [userData, setUserData] = useState({})

    /* VARIABLES */
    let sheetRef = React.useRef(null);
    var cameraRef = useRef(null);
    let fall = new Animated.Value(1);
    let informations = props.user;

    const data = [
        "https://images.unsplash.com/photo-1633205719979-e47958ff6d93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1623345805780-8f01f714e65f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    ];
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */

    // Récupérer infos du profil utilisateur
    useEffect(() => {
        async function loadData() {
            const rawResponse = await fetch(`http:${expoUrlRaf}/user_profile`, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `token=${informations.user_token}`
            })
            let response = await rawResponse.json();

            setUserData(response.user_account);
            console.log(response.user_account)

        }
        loadData();
    }, []);

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
        console.log(result);
    
        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this appp to access your camera!");
          return;
        }
    
        const result = await ImagePicker.launchCameraAsync();
    
        // Explore the result
        console.log(result);
    
        if (!result.cancelled) {
          setPickedImagePath(result.uri);
          console.log(result.uri);
        }
    }

    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */

    let myimages = userData.profile_photo.map((element, index) => {
        return (

            <Image
                key={index}
                source={{ uri: element }}
                style={styles.image}
            />
        )
    })

    // * ___________________________ PAGE ___________________________

    const renderInner = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
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
     ) ;
    return (
        <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>


<BottomSheet
        ref={sheetRef}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callBackNode={fall}
        enabledContentGestureInteraction={true}
        // borderRadius={10}
        // renderContent={renderContent}
      />


            <ScrollView style={styles.containerJoey}>
                <Text>ProfilScreen</Text>


                {/* -------- CARROUSEL D'IMAGES --------  */}
                <View style={styles.swipperContainer}>
                    <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="white" dotColor='rgba(0,0,0,.6)' showsHorizontalScrollIndicator={true}>
                        {myimages}
                    </Swiper>
                </View>

                {/* -------- BOUTONS --------  */}
                <View style={styles.profileButtons} >
                <Button
                        title="+ photo"
                        buttonStyle={{backgroundColor : '#1BAC87', width : 100}}
                        containerStyle={styles.buttonContainer}
                        onPress={() => sheetRef.current.snapTo(0)}
                    />
                    <Button
                        title="Portfolio"
                        buttonStyle={styles.button}
                        containerStyle={styles.buttonContainer}
                    />
                    <Button
                        title="Modifier profil"
                        buttonStyle={styles.button}
                        containerStyle={styles.bouttonContainer}
                        onPress={() => {
                            props.getAllUserInformations(userData)
                            props.navigation.navigate('ProfileEditScreen')
                        }}
                    />
                </View>

                {/* -------- INFORMATIONS --------  */}
                <View style={styles.firstInformations} >
                    <Text h5 style={{ fontWeight: "bold", marginRight: 25, fontSize: 20 }}>{userData.name}</Text>
                    <View style={styles.location}>
                        <Ionicons name={'location-sharp'} size={24} color='black' />
                        <Text h5 style={{ fontSize: 20, marginLeft: 10 }}>{userData.city}</Text>
                    </View>
                </View>

                {/* -------- CATEGORIE --------  */}
                <View style={styles.occupationContainer}>
                    <Text style={styles.occupationText}>{userData.occupation}</Text>
                </View>

                {/* -------- ABOUT --------  */}
                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutTitle}>À propos de moi :</Text>
                    <Text>{userData.description}</Text>
                </View>

                {/* -------- USER CARACTERISTICS --------  */}
                <View style={styles.caracteristicsContainer}>

                    <Text>{userData.gender}</Text>
                    {/* <Text>{userData.user_caracteristics.height}</Text>
                    <Text>{userData.user_caracteristics.weight}</Text>

                    <Text>sexe : {userData.gender}</Text>
                  {/*   <Text>{userData.user_caracteristics.height}</Text>
                    <Text>poids : {userData.weight}</Text>

                    <Text>{userData.user_caracteristics.corpulence}</Text> */}
                </View>

            

            <Text>User token : {informations.user_token}</Text>
        </View>
</ScrollView>
    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
    },
    containerJoey: {
        marginHorizontal: 10
    },
    swipperContainer: {
        height: 350,
        marginBottom: 15
    },
    image: {
        width: Dimensions.get('screen').width - 20,
        resizeMode: 'cover',
        height: 350,
        borderRadius: 25,
    },
    wrapper: {},
    profileButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15
    },
    button: {
        borderRadius: 8,
        backgroundColor: "black"
    },
    buttonContainer: {
        height: 50,
        width: 150,
    },
    firstInformations: {
        flexDirection: 'row',
        marginLeft: 25
    },
    location: {
        flexDirection: 'row',
        marginLeft: 10
    },
    occupationContainer: {
        backgroundColor: '#333333',
        borderRadius: 50,
        width: "50%",
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 25,
        marginLeft: "auto",
        marginRight: "auto"
    },
    occupationText: {
        color: "white"
    },
    aboutContainer: {
        marginBottom: 25,
        marginLeft: 5,
    },
    aboutTitle: {
        fontWeight: "bold"
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
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
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
        getAllUserInformations: function (userData) {
            dispatch({ type: 'addInfosToUser', userData })

        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilScreen);


