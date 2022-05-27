import React, { useState, useEffect } from 'react';

import { expoUrlJoey } from '../ExpoUrl';

//^ Module de balise
import { Dimensions, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/base';
import { Divider, Avatar } from "@rneui/themed";

import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from './components/GlobalStyles';
import { PostulerBtnLight, PostulerBtn } from './components/ButtonsStyles';


let { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

export default function MessagesScreen() {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [allUsersAccount, setAllUsersAccount] = useState([])

    /* VARIABLES */
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    useEffect(() => {
        // ! TEMPORAIRE LE TEMPS QUE RAF FINISSE LA ROUTE =======> Joey :)
        async function allUsers() {
            var rawResponse = await fetch(`http://${expoUrlJoey}/all_users_profile`, {
            })
            let response = await rawResponse.json();
            console.log(response)
            setAllUsersAccount(response)
        }
        allUsers() //! TEMPORAIRE ==> Joey
    }, []);

    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________


    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */
    const AcceptedCollaboraions = allUsersAccount.map((element, index) => {
        return (
            <View key={index + 2} style={{ justifyContent: 'space-between', alignItems: "center", marginHorizontal: 10 }}>
                <Avatar
                    size={90}
                    rounded
                    source={element.profile_photo.length === 0 ? { uri: "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" } : { uri: element.profile_photo[0] }}
                />
                <Text style={{ fontWeight: "bold" }}>{element.name}</Text>
            </View>
        )
    })

    const allUserConversations = allUsersAccount.map((element, index) => {

        return (
            <TouchableOpacity
                key={index + 1}
                activeOpacity={.7}
                style={{
                    backgroundColor: '#f4f4f4',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 12,
                    borderColor: 'gray',
                    borderWidth: 0,
                    width: "85%",
                    height: 150,
                    marginTop: 10,
                    marginBottom: 10,
                    paddingLeft: 10,
                    paddinRight: 5,
                    shadowColor: 'black',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.1, shadowRadius: 2
                }}
                onPress={() => props.navigation.navigate('ConversationScreen')}>
                <Text style={{ position: "absolute", top: 12, right: 15, zIndex: 9, color: "#1ADBAC" }}>{Math.floor(Math.random() * 59)} min</Text>

                <View style={{ width: "95%", height: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Avatar
                        size={95}
                        rounded
                        source={element.profile_photo.length === 0 ? { uri: "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" } : { uri: element.profile_photo[0] }}
                        containerStyle={{ marginLeft: 5 }}
                    />
                    <View style={{ width: '60%', height: "50%", justifyContent: "space-around" }}>
                        <Text style={{ fontWeight: "bold", marginBottom: 2 }}>{element.name}  |  {element.occupation}</Text>
                        <Text style={{ marginBottom: 5 }}>J'aimerais collaborer avec vous ...</Text>
                    </View>
                </View>
            </TouchableOpacity >
        )
    })

    // * ___________________________ PAGE ___________________________

    return (
        <ScrollView style={styles.ScrollContainer}>
            <Text h4 style={{ fontWeight: "bold", marginVertical: "8%", marginLeft: 20 }}>Collaborations acceptées</Text>

            <View style={styles.container}>
                <ScrollView horizontal style={{ height: screenHeight / 5, }}>
                    {AcceptedCollaboraions}
                </ScrollView>
                <Divider
                    style={{ width: "60%", margin: 20 }}
                    color="#d3d3d3"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />
                <Text style={{ fontWeight: "bold", marginVertical: "4%", marginRight: "auto", marginLeft: 20, fontSize: 21 }}>Messages</Text>
                {allUserConversations}
            </View>
        </ScrollView>

    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    ScrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // GLOBAL STYLES

    pageBackground: {
        ...pageBackground
    },
    title: {
        ...title
    },
    subTitle: {
        ...subTitle
    },
    textRegular: {
        ...textRegular
    },
    cardTitle: {
        ...cardTitle
    },
    cardText: {
        ...cardText
    }
});

// * ___________________________ REDUX ___________________________
