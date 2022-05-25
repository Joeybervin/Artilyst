import React, { useState, useEffect } from 'react';

import { expoUrlRaf } from '../ExpoUrl';

//^ Module de balise
import { Dimensions, StyleSheet, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Text, Button } from '@rneui/base';
import { Divider , Avatar } from "@rneui/themed";


let { width : screenWidth , height : screenHeight } = Dimensions.get('screen')

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
            var rawResponse = await fetch(`http://${expoUrlRaf}/all_users_profile`, {
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
    const AcceptedCollaboraions = allUsersAccount.map( (element, index) => {
        return (
            <View key={index + 2} style={{justifyContent : 'space-between', alignItems : "center", marginHorizontal : 10}}>
                <Avatar
                    size={100}
                    rounded
                    source={ element.profile_photo.length === 0 ? {uri : "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" }: {uri : element.profile_photo[0]}}
                />
                <Text style={{fontWeight : "bold"}}>{element.name}</Text>
            </View>
        )
    })

    const allUserConversations = allUsersAccount.map((element, index) => {
        return(

            <TouchableOpacity   key={index + 1}
            activeOpacity={.7} style={{ 
                borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "center",
                backgroundColor : "#0000000C",
                width: "95%", height: 115, marginTop: 30 }}
            onPress={() => props.navigation.navigate('ConversationScreen') }>
                <Text style={{position : "absolute", top: 5, right : 10, zIndex: 9, color : "#444444A9"}}>{Math.floor(Math.random() * 59)} min</Text>

            <View style={{width : "95%", height : "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Avatar
                    size={90}
                    rounded
                    source={ element.profile_photo.length === 0 ? {uri : "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" }: {uri : element.profile_photo[0]}}
                    containerStyle={{ marginLeft : 5 }}
                    
                />
            
                <View style={{ width: '60%', height: "85%" , justifyContent: "center"}}>
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

            <Text h4 style={{fontWeight : "bold" ,marginVertical : "8%", marginLeft : 20}}>Collaborations acceptées</Text>

            <View style={styles.container}>

                

                <ScrollView horizontal style={{height : screenHeight / 7, }}>
                    {AcceptedCollaboraions}
                </ScrollView>

                <Divider
                    style={{ width: "100%", margin: 20 }}
                    color="#d3d3d3"
                    insetType="middle"
                    width={1}
                    orientation="horizontal"
                />
        
                <Text style={{fontWeight : "bold" ,marginVertical : "4%", marginRight : "auto",  marginLeft : 20, fontSize : 21}}>Messages</Text>
                { allUserConversations }

            </View>
        </ScrollView>

    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    ScrollContainer : {
        flex : 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

// * ___________________________ REDUX ___________________________
