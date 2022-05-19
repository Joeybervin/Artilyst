
import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';


//^ Module de balise
import { Dimensions, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';


// ^Redux
import { connect } from 'react-redux';


import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from 'expo-image-picker-multiple';


function AllMyPictures(props) {
    
    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    // * ___________________________ PAGE ___________________________


    return (
            <ScrollView style={styles.mainContainer}>
                <Text>ProfilScreen</Text>

                <ImageBrowser
                    max={20}
                    onChange={(num, onSubmit)  => {
                        
                    }}
                    callback={(callback) => {

                    }}
                    />

            </ScrollView>

    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});

// * ___________________________ REDUX ___________________________
function mapStateToProps(state) {
    return { user: state.user }
}


export default connect(
    mapStateToProps,
    null
)(AllMyPictures);

