
import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';

//^ Module de balise
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { Image, Text, Button, Divider } from '@rneui/base';
import { Overlay } from "@rneui/themed";

//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^ Redux
import { connect } from 'react-redux';

let { width: screenWidth, height: screenHeight } = Dimensions.get('screen')



function PortfoliosScreen(props) {

    const [user, setUser] = useState(props.user)
    const [OverlayVisibility, setOverlayVisibility] = useState(false)

    const allUserPortfolios = user.portfolio.map((element, index) => { // Tous les prjets de l'utilisateur
        return (
            <TouchableOpacity  onPress={() => props.navigation.navigate("GalleryScreen", {portfolioIndex : index, profileImage : ""})} key={index}>
                <ImageBackground style={{width: screenWidth / 2 - 10, height: screenHeight / 5,margin : 5, borderRadius : 25 }} source={{uri : element.images[Math.floor(Math.random() * (element.images.length - 1))]}}>

                <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", backgroundColor: "#0000008A", lineHeight : 75, marginTop : "auto"}}>{element.title}</Text>

                </ImageBackground>
            </TouchableOpacity>
        )
    })


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    const params = props.route.params;

    // * ___________________________ PAGE ___________________________
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>

                
            <Overlay
            isVisible={OverlayVisibility}
            >
                <ActivityIndicator size="large" color="#000000"/>
                <Text>Chargement de l'image</Text>

            </Overlay>

                <View style={{ marginTop: 30, width: "90%" }}   >
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Ajouter un nouveau portfolio</Text>

                    <Button
                        raised
                        type="solid"
                        containerStyle={{ borderWidth: 2, borderRadius: 10, borderColor: 'transparent', width: "40%", marginTop: 30, }}
                        buttonStyle={{ borderRadius: 8, height: 140, backgroundColor: '#1ADBAC' }}
                        onPress={() => { setOverlayVisibility(true) }}
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

                <View style={{ width: "100%"}}>

                    <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 25, width: "90%", marginLeft: 20 }}>Mes portfolios </Text>
                    <View style={{ width: "100%" ,dipslay : "flex",flexDirection : 'row', flexWrap : "wrap"}}>

                            {allUserPortfolios}


                    </View>

                    


                </View>
            </View>
        </ScrollView>

    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    scrollView : {
        flex: 1,
            backgroundColor: '#fff',
           
      },
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }
});

// * ___________________________ REDUX ___________________________

function mapStateToProps(state) {
    return { user: state.user }
}


export default connect(
    mapStateToProps,
    null
)(PortfoliosScreen);