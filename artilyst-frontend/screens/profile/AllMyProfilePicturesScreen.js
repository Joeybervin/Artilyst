
import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';

//^ Module de balise
import { Dimensions, StyleSheet, View,  ScrollView, TouchableOpacity, Divider } from 'react-native';
import { Image,Text, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^Redux
import { connect } from 'react-redux';


function AllMyProfilePicturesScreen(props) {

  
    
const AllUserPhotos = props.user.profile_photo.map((element, index) => {
    console.log("eleemnt : ",element)
    return (
        <Image
        key={index}
        containerStyle={{ width: 200, height: 200, }}
        resizeMode="contain"
        source={{uri : element}}
        style={{ borderRadius: 10, marginRight: 10 }}
        PlaceholderContent="ff"
    />
    )
})

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    // * ___________________________ PAGE ___________________________


    return (

        <ScrollView style={styles.container}>
            < Text>Gallery</Text>
            <View style={styles.container}>
                {AllUserPhotos}
<View>
                <Image
        containerStyle={{ width: 200, height: 200, }}
        resizeMode="contain"
        source={{uri : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920"}}
        style={{ borderRadius: 10, marginRight: 10 }}
        PlaceholderContent="ff"
    />
    </View>
    < Text>Gallery</Text>
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
)(AllMyProfilePicturesScreen);