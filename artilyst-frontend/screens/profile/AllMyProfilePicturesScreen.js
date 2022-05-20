
import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';


//^ Module de balise
import { Dimensions, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';


// ^Redux
import { connect } from 'react-redux';


function AllMyProfilePicturesScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    // * ___________________________ PAGE ___________________________


    return (

        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>

                <View style={{ marginTop: 30, width: "90%" }}   >
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Creer un nouveau projet </Text>

                    <Button
                        raised
                        type="solid"
                        containerStyle={{ borderWidth: 2, borderRadius: 10, borderColor: 'transparent', width: "40%", marginTop: 30, }}
                        buttonStyle={{ borderRadius: 8, height: 140, backgroundColor: '#1ADBAC' }}
                        onPress={() => { props.navigation.navigate('CollaborateurDuProjetScreen') }}
                    >
                        <Ionicons
                            style={styles.icon}
                            color='white'
                            name="add"
                            size={50}
                            onPress={() => { props.navigation.navigate('CollaborateurDuProjetScreen') }}
                        />
                    </Button>
                </View>


                <Divider
                    style={{ width: "100%", margin: 20 }}
                    color="#d3d3d3"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />

                <View style={{ width: "100%" }}>

                    <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 25, width: "90%", marginLeft: 20 }}>Mes projets </Text>


                    {allUserPorjects}


                </View>
            </View>
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
)(AllMyProfilePicturesScreen);

