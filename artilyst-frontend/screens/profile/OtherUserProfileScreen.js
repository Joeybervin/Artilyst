import Animated from 'react-native-reanimated';

import React, { useRef, useState, useEffect } from 'react';

import { expoUrlRaf } from '../../ExpoUrl';


//^ Module de balise
import { Dimensions, StyleSheet, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';

// ^ Carousel
import Swiper from 'react-native-swiper'

// ^Redux
import { connect } from 'react-redux';

function OtherUserProfileScreen(props) {


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */


    /* VARIABLES */
    const params  = props.route.params;
    const [user , setUser ] = useState([])
    const [getResponse , setGetResponse ] = useState(false)
    let userProfileImages;

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* Initilisation des données */
    useEffect(() => {
        // * Recruiter case
        const loadData = async () => {
            var rawResponse = await fetch(`http://${expoUrlRaf}/user_profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${params.userToken}`,
            })
            let response = rawResponse.json();
            console.log("RESPONSE DES AUTRES : ",response)
            setUser(response)
   
        }
        loadData()
    }, []);

    // * ___________________________ FUNCTIONS ___________________________

    /* Pour afficher l'icon de "genre" des utilisateurs */
    // const genderIcon = (gender) => { //pour montrer le logo correspondant au sexe de l'utilisateur
    //     if (gender === 'femme') {
    //         return "female-outline"
    //     }
    //     else if (gender === 'male') {
    //         return "male-outline"
    //     } else {
    //         return "male-female-outline"
    //     }
    // }

    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */


    
    // if (user.profile_photo.length > 0) {
    //     userProfileImages = user.profile_photo
    // }
    // else {
    //     userProfileImages = ["https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg"]
    // }


    // const userPhotos = userProfileImages.map((element, index) => {
    //     console.log(element)
    //     return (
    //         <View key={index} style={{ width: "100%", height: "100%", borderRadius: 10, alignItems: "center" }}>
    //             <Image
    //                 style={{ width: Dimensions.get('screen').width - 20, resizeMode: 'cover', height: 350, borderRadius: 25, }}
    //                 key={index}
    //                 source={{ uri: element }}
    //             />
    //         </View>
    //     )
    // })

    // * ___________________________ PAGE ___________________________


    if (user.occupation === "recruteur") {

        return (
            <ScrollView style={styles.container}>
    
                <View style={styles.mainContainer}>
    
                    {/* -------- CARROUSEL D'IMAGES --------  */}
                    <View style={styles.swipperContainer}>
                        <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="white" dotColor='rgba(0,0,0,.6)' showsHorizontalScrollIndicator={true}>
    
                            {userPhotos}
    
                        </Swiper>
    
                    </View>
    
    
                    {/* -------- BOUTONS --------  */}
                    <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginBottom: 15, backgroundColor: '#33333341', width: "100%" }} >
                        <Button
                            title="Portfolio"
                            titleStyle={{ paddingHorizontal: 30 }}
                            buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                            onPress={() => {
                                props.navigation.navigate('PortfoliosScreen', {user : user.token})
                            }}
                        />
                        <Button
                            title="voir Annonces"
                            titleStyle={{ paddingHorizontal: 25 }}
                            buttonStyle={{ borderRadius: 8, backgroundColor: "#1ADBAC", color: "black" }}
                            onPress={() => console.log("A VOIR !!!")} //props.navigation.navigate('PortfoliosScreen', {user : user.token}
                        />
                    </View>
    
    
                    {/* -------- INFORMATIONS --------  */}
                    <View style={styles.firstInformations} >
                        <Text h5 style={{ fontWeight: "bold", marginRight: 35, fontSize: 20 }}>{user.name}
                        </Text>
                        <View style={styles.location}>
                            <Ionicons name={'location-sharp'} size={24} color='black' />
                            <Text h5 style={{ fontSize: 20, marginLeft: 10 }}>{user.city ? user.city : "non renseigné"}</Text>
                        </View>
                    </View>
    
    
                    {/* -------- CATEGORIE --------  */}
                    <View style={styles.occupationContainer}>
                        <Text style={styles.occupationText}>{user.occupation ? user.occupation : "non renseigné"}</Text>
                    </View>
    
                    {/* -------- ABOUT --------  */}
                    <View style={{ marginBottom: 25 }}>
                        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>À propos :</Text>
                        <Text>{user.description !== undefined ? user.description : "non renseigné"}</Text>
                    </View>
    
    
                    {/* -------- USER CARACTERISTICS --------  */}
    
                </View>
            </ScrollView>
        );
    }
    else {

        return (
            <ScrollView style={styles.container}>

                <View style={styles.mainContainer}>

                    {/* -------- CARROUSEL D'IMAGES --------  
                    <View style={styles.swipperContainer}>
                        <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="white" dotColor='rgba(0,0,0,.6)' showsHorizontalScrollIndicator={true}>
                            {userPhotos}
                        </Swiper>
                    </View>*/}


                    {/* -------- BOUTONS --------  */}
                    <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginBottom: 15, backgroundColor: '#33333341', width: "100%" }} >
                        
                        <Button
                            title="Portfolio"
                            titleStyle={{ paddingHorizontal: 30 }}
                            buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                            onPress={() => {
                                props.navigation.navigate('PortfoliosScreen', {user : params.user})
                            }}
                        />
        
                    <Button
                        title="recruter"
                        titleStyle={{ paddingHorizontal: 25 }}
                        buttonStyle={{ borderRadius: 8, backgroundColor: "#1ADBAC", color: "black" }}
                        onPress={() => {console.log("ROUTE DE MUSTAFA !!! ")}}
                    />
        
                                
                </View>
                    


                    {/* -------- INFORMATIONS --------  */}
                    <View style={styles.firstInformations} >
                        <Text h5 style={{ fontWeight: "bold", marginRight: 35, fontSize: 20 }}>{user.name}
                            <Ionicons name={genderIcon(user.gender ? user.gender : "male-female-outline")} size={19} color='black' />
                        </Text>
                        <View style={styles.location}>
                            <Ionicons name={'location-sharp'} size={24} color='black' />
                            <Text h5 style={{ fontSize: 20, marginLeft: 10 }}>{user.city ? user.city : "non renseigné"}</Text>
                        </View>
                    </View>


                    {/* -------- CATEGORIE --------  */}
                    <View style={styles.occupationContainer}>
                        <Text style={styles.occupationText}>{user.occupation ? user.occupation : "non renseigné"}</Text>
                    </View>

                    {/* -------- ABOUT --------  */}
                    <View style={{ marginBottom: 25 }}>
                        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>À propos de moi :</Text>
                        <Text>{user.description !== undefined ? user.description : "non renseigné"}</Text>
                    </View>


                    {/* -------- USER CARACTERISTICS --------  */}


                    <View style={styles.caracteristicsContainer}>

                        <Text>Groupe ethnique : {user.characteristics.ethnicGroup === null ? "non renseigné" : user.characteristics.ethnicGroup}</Text>

                        <Text>couleur des yeux : {user.characteristics.eyes === null ? "non renseigné" : user.characteristics.eyes}</Text>
                        <Text>couleur des cheveux : {user.characteristics.hair === null ? "non renseigné" : user.characteristics.hair}</Text>

                        <Text>Corpulence : {user.characteristics.corpulence !== null ? user.characteristics.corpulence : "non renseigné"}</Text>

                        <Text>Taille : {user.characteristics.height !== null ? user.characteristics.height : "--"} cm  Poids : {user.characteristics.weight !== null ? user.characteristics.weight : "--"} kg</Text>
                        {/* Mensuration */}

                        <Text>Mensurations :</Text>
                        <Text>taille : {user.characteristics.measurements.waist !== null ? user.characteristics.measurements.waist : "--"} cm  -  poitrine : {user.characteristics.measurements.bust !== null ? user.characteristics.measurements.bust : "--"} cm -  hanche : {user.characteristics.measurements.hips !== null ? user.characteristics.measurements.hips : "--"} cm</Text>

                    </View>

                </View>
            </ScrollView>
        );
    
}

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
    containerJoey: {
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

});

// * ___________________________ REDUX ___________________________

function mapDispatchToProps(dispatch) {
    return {
        addPictures: function (photoUrl, user) {
            dispatch({ type: 'addPictures', photoUrl, user })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(OtherUserProfileScreen);


