
import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';

//^ Module de balise
import { Dimensions, StyleSheet, View,  ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Image,Text, Button } from '@rneui/base';

// ^ Redux
import { connect } from 'react-redux';

let { width : screenWidth , height : screenHeight } = Dimensions.get('screen')


function GalleryScreen(props) {

    const  params  = props.route.params;
    const [user, setUser] = useState(props.user)
    let AllUserPhotos;



    if (props.user.profile_photo.length === 0 ) {
        return (
            <Text>No photo</Text>
        )
    }
    else {
     
        console.log("GALLERY : ",user.profile_photo)
        AllUserPhotos = props.user.profile_photo.map((element, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => {props.navigation.navigate('PictureZoomScreen', {imageUrl : element})}}>
                    <Image
                    style={{ width: screenWidth / 3 - 4, height: screenHeight / 3, margin : 2, borderRadius : 4}}
                
                    source={{uri : element}}
                    PlaceholderContent="image"
                    />
            </TouchableOpacity>
            )
        })
    }
    
    

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    // * ___________________________ PAGE ___________________________


    return (

        <ScrollView style={{flex : 1}}>
            <View style={{alignItems : "center",}}>

                {/* Soit le mot "Gallery" s'affichera soit le nom du portofolio choisit */}
                < Text style={{fontSize : 25, marginVertical : 40}}>{params === undefined ? "Gallery : " : "Portofolio : Le nom du portofolio" }</Text>
                <View style={{dipslay : "flex",flexDirection : 'row', flexWrap : "wrap",}}>

                    {/* Soit nous voyons les photo de profile soit les photos d' un portofolio en particulier*/}
                        {params === undefined ? AllUserPhotos : [] }



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
        deletePicture: function (photoUrl, user) {
            dispatch({ type: 'deletepicture', photoUrl , user })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GalleryScreen);