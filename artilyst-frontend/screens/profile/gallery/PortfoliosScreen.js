
import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';

import {expoUrlJoey} from '../../../ExpoUrl';

//^ Module de balise
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { Input, Text, Button, Divider } from '@rneui/base';
import { Overlay } from "@rneui/themed";

//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^ Redux
import { connect } from 'react-redux';

let { width: screenWidth, height: screenHeight } = Dimensions.get('screen')



function PortfoliosScreen(props) {


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________

    const [user, setUser] = useState(props.user) // infos de l'utilisateur
    const [OverlayVisibility, setOverlayVisibility] = useState(false) // Affichage du formaulaire pour créer un portfolio
    const [title, setTitle] = useState("") // STRING : titre donné au nouveau portfolio
    const [titleMessageError, setTitleMessageError] = useState("") // Message d'erreur

    // * ___________________________ FUNCTIONS ___________________________

    const createPortfolio = async () => {
        if (title === "" || title === " " || title.length < 2) {
            setTitleMessageError("Champs invalide !")
        }
        else {
            const rawResponse = await fetch(`http://${expoUrlJoey}/upload_portfolio`, {
            method: 'PUT',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `portfolioName=${title}&token=${user.token}`,
        })

        let response = await rawResponse.json() // Object : Réponse du back-end
        console.log(response)
        if (response.upload === false) {
            setTitleMessageError("Un portfolio existe déjà avec ce nom !")
        }
        if (response.upload === true) {
            props.createPortfolio(title)
            setOverlayVisibility(false)
        }

        }
    }

    // * ___________________________ AFFICHAGES (CONDITIONS, MAP) ___________________________

    const allUserPortfolios = user.portfolio.map((element, index) => { // Tous les prjets de l'utilisateur

        let porfolioCover;
        if (element.images.length === 0 ) {
            porfolioCover =  "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg"
        }
        else  {
            porfolioCover = element.images[Math.floor(Math.random() * (element.images.length - 1))]
        }
        console.log(element.images.length)
        
        return (
            <TouchableOpacity  onPress={() => props.navigation.navigate("GalleryScreen", {portfolioIndex : index, profileImage : ""})} key={index}>
                <ImageBackground style={{width: screenWidth / 2 - 10, height: screenHeight / 5,margin : 5, borderRadius : 25 }} source={{uri : porfolioCover}}>

                <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", backgroundColor: "#0000008A", lineHeight : 75, marginTop : "auto"}}>{element.title}</Text>

                </ImageBackground>
            </TouchableOpacity>
        )
    })

    // * ___________________________ PAGE ___________________________
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>

                
            <Overlay
            isVisible={OverlayVisibility}
            onBackdropPress={!OverlayVisibility}
            overlayStyle={{width : screenWidth - 100, height : screenHeight - screenHeight / 1.5, borderRadius : 15, justifyContent : 'center', alignItem : 'center'}}
            >
                <Text style={{fontWeight : "bold", fontSize : 19, marginBottom : 25, alignSelf : 'flex-start'}}>Créer un nouveau portofolio</Text>

            {/* Nom du portofolio */}
            <Input
                placeholder='Nom de votre portfolio'
                onChangeText={setTitle} value={title}
                errorMessage={titleMessageError}
            />


            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginBottom: 10, backgroundColor: '#33333311', width: "100%" }} >
                    <Button
                        title="annuler"
                        titleStyle={{ paddingHorizontal: 20 }}
                        buttonStyle={{ borderRadius: 8, backgroundColor: "#D43131", color: "black" }}
                        onPress={() => setOverlayVisibility(false)}
                    />
                    <Button
                        title="créer"
                        titleStyle={{ paddingHorizontal: 25 }}
                        buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                        onPress={() => {
                            createPortfolio()
                            
                        }}
                    />
                </View>
           



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
function mapDispatchToProps(dispatch) {
    return {
        createPortfolio : function (title) {
            dispatch({ type : 'createPortfolio', title})
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfoliosScreen);