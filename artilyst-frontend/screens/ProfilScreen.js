import React, {useRef, useState} from 'react';

//^ Module de balise
import { Dimensions, StyleSheet, Animated, View, Image, ScrollView } from 'react-native';
import { Text, Button} from '@rneui/base';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons'; 
// ^ Carousel
import Swiper from 'react-native-swiper'

// ^Redux
import { connect } from 'react-redux';




function ProfilScreen(props) {

    const  [currentImage, setCurrentImage] = useState(-1)
    const animation = useRef(new Animated.Value(0));

    let informations = props.user;
    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    /* VARIABLES */

    const data = [
        "https://images.unsplash.com/photo-1633205719979-e47958ff6d93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1623345805780-8f01f714e65f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    ];
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */

    const myimages = data.map((element, index) => {
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
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container}>
                <Text>ProfilScreen</Text>

                <View style={styles.swipperContainer}>
                    <Swiper  style={styles.wrapper} showsButtons={false} activeDotColor="white" dotColor='rgba(0,0,0,.6)' showsHorizontalScrollIndicator={true}>
                        { myimages }
                    </Swiper>
                </View>

                <View style={styles.profileButtons} >
                    <Button
                    title="Portofolio"
                    buttonStyle={styles.button}
                    containerStyle={styles.bouttonContainer}
                    
                    />

                    <Button
                    title="Modifier profil"
                    buttonStyle={styles.button}
                    containerStyle={styles.bouttonContainer}
                    />
                </View>

                <View style={styles.firstInformations} >
                
                <Text h5 style={{fontWeight: "bold", marginRight : 25, fontSize: 20}}>Nom prénom</Text>

                <View style={styles.location}>
                <Ionicons name={'location-sharp'} size={24} color='black' />
                <Text h5 style={{fontSize: 20, marginLeft : 10}}>Ville</Text>
                </View>

                </View>

                <View style={styles.occupationContainer}>
                    <Text style={styles.occupationText}>modèle</Text>
                </View>

                <View style={styles.aboutContainer}>
                <Text style={styles.aboutTitle}>À propos de moi :</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat velit neque, a consectetur diam luctus eget. In eu lacinia diam, sed tristique leo. Sed condimentum elit quis diam mollis gravida. Integer convallis felis vel commodo euismod. Mauris est urna, cursus quis aliquam ut, congue vestibulum ligula.</Text>
                </View>

                <View style={styles.caracteristicsContainer}>
                    <Text>Genre : mystère</Text>
                    <Text>Taille : jusqu'au paradis</Text>
                    <Text>poids : comment osez-vous ?</Text>
                    <Text></Text>
                </View>


</ScrollView>
        
            <Text>User token : {informations.user_token}</Text>
        </View>

    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        alignItems : "center",
    },
    container : {
        marginHorizontal : 10
    },
    swipperContainer : {
        height : 350,
        marginBottom : 15
    },
    image: {
        width: Dimensions.get('screen').width -20,
        resizeMode: 'cover',
        height: 350,
        borderRadius : 25,

    },
    wrapper: {},
    profileButtons : {
        flexDirection : 'row', 
        justifyContent : 'space-around',
        marginBottom : 15
    },
    button : {
        borderRadius : 8,
        backgroundColor : "black"
    },
    bouttonContainer : {
        height: 50,
        width: 150,
    },
    firstInformations : {
        flexDirection : 'row', 
        marginLeft : 25
    },
    location : {
        flexDirection : 'row',
        marginLeft : 10
    },
    occupationContainer : {
        backgroundColor : '#333333',
        borderRadius : 50, 
        width : "50%",
        alignItems : 'center',
        marginTop : 20,
        marginBottom : 25,
        marginLeft : "auto",
        marginRight : "auto"
    },
    occupationText : {
         color : "white"
    },
    aboutContainer : {
        marginBottom : 25,
        marginLeft : 5,
    },
    aboutTitle : {
        fontWeight : "bold"
    },
    caracteristicsContainer : {
        lineHeiight : 2
    }

});

// * ___________________________ REDUX ___________________________
function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(
    mapStateToProps,
    null
)(ProfilScreen);


