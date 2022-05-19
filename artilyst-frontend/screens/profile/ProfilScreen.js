
import React, { useRef, useState, useEffect } from 'react';
import { expoUrlJoey } from '../../ExpoUrl';

//^ Module de balise
import { Dimensions, StyleSheet, Animated, View, Image, ScrollView } from 'react-native';
import { Text, Button } from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';
// ^ Carousel
import Swiper from 'react-native-swiper'


// ^Redux
import { connect } from 'react-redux';


function ProfilScreen(props) {

    



    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [userData, setUserData] = useState({})

    /* VARIABLES */
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
            const rawResponse = await fetch(`http:${expoUrlJoey}/user_profile`, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `token=${informations.user_token}`,
            })
            let response = await rawResponse.json();

            setUserData(response.user_account);
            console.log(response.user_account)

        }
        loadData();
    }, []);

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

    return (
        <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
            
           

                {/* -------- CARROUSEL D'IMAGES --------  */}
                <View style={styles.swipperContainer}>
                    <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="white" dotColor='rgba(0,0,0,.6)' showsHorizontalScrollIndicator={true}>
                        {myimages}
                    </Swiper>
                </View>

                {/* -------- BOUTONS --------  */}
                <View style={styles.profileButtons} >
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
    container: {
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
    }

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


