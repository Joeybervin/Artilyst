
import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';

// & import des urls de chacune
import {expoUrlJoey} from '../../../ExpoUrl';


//^ Module de balise
import { Dimensions, StyleSheet, View,  ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Image,Text, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^ Redux
import { connect } from 'react-redux';

let { width : screenWidth , height : screenHeight } = Dimensions.get('screen')


function pictureZoomScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________

    /* Variables d'état */
    /* variables */
    const [user, setUser] = useState(props.user)
    const  params  = props.route.params;

    const deletePicture = async () => {
        
        


        const rawResponse = await fetch(`http://${expoUrlJoey}/delete_profile_picture`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `imageUrl=${params.imageUrl}&token=${user.token}`,
        })

        props.deletePictureReducer(params.imageUrl, user) // suppression dans le store
        props.navigation.navigate('GalleryScreen') // retour vers la gallery
        // let copyUserInfos = {...props.user}
        // setUser(copyUserInfos)
        let response = await rawResponse.json() // Object : Réponse du back-end

    }

    // * ___________________________ PAGE ___________________________
    return (
        
            <View  style={{height : "90%", width : screenWidth, backgroundColor : "#000000"}}>
                    <ImageBackground
                    resizeMode="contain"
                    source={{uri : params.imageUrl}}
                    style={{height : '100%', width : "100%"}}
                    
                    />

            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", width: "100%" , backgroundColor : "#000000", height: 100}} >
                    <Button
                        title="retour"
                        titleStyle={{ paddingHorizontal: 30 }}
                        buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                        onPress={() => { props.navigation.goBack() }} // Pou retourner à la gallery
                    />
                    <Button
                        title="Supprimer"
                        titleStyle={{ paddingHorizontal: 25 }}
                        buttonStyle={{ borderRadius: 8, backgroundColor: "#FF1E1E", color: "black" }}
                        onPress={() => {
                            deletePicture() // suppression de la base de données
                        }}
                    />
                </View>
                    
            </View>
         

 
    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

// * ___________________________ REDUX ___________________________

function mapStateToProps(state) {
    return { user: state.user }
}

function mapDispatchToProps(dispatch) {
    return {
        deletePictureReducer: function (photoUrl, user) {
            dispatch({ type: 'deletePicture', photoUrl , user })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(pictureZoomScreen);