
import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';

//^ Module de balise
import { Dimensions, StyleSheet, View,  ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Image,Text, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^ Redux
import { connect } from 'react-redux';

let { width : screenWidth , height : screenHeight } = Dimensions.get('screen')


function PortfoliosScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    const  params  = props.route.params;

    // * ___________________________ PAGE ___________________________
    return (
        <ScrollView style={styles.container}>
            <View>
                    <Text>PortfoliosScreen</Text>
                    
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


export default connect(
    mapStateToProps,
    null
)(PortfoliosScreen);