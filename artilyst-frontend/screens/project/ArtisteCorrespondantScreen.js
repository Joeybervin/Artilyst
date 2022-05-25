import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// ^ Wanings messages
import { LogBox, Button, ScrollView, Image } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */
// const [DisplayArtist, setDisplayArtist]= useState()

import { expoUrlRaf } from '../../ExpoUrl';

function ArtisteCorrespondantScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [matchingArtists, setMatchingArtists] = useState([]);

    /* VARIABLES */

    let projectId = props.route.params;

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    // Import des artistes correspondants depuis le backend
    useEffect(() => {

        async function loadArtists() {
            var rawResponse = await fetch(`http://${expoUrlRaf}/search_artist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${props.project.id}`,
            })
            let response = await rawResponse.json();
            setMatchingArtists(response.matchingUsers)
            console.log("REPONSE",response.matchingUsers)
        }
        loadArtists()
    }, []);


    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */

    // Affichage des artistes sous forme de "cards"
    let artistsDisplay = matchingArtists.map((artist, i) => {

        <View key={i} style={{ flexDirection: 'column', borderColor: 'black', borderWidth: 0.5, borderRadius: 7, width: 150, height: 210, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10 }}>
            {/* image profil */}
            <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: "center" }}>
                <Image style={{ width: 140, height: 140 }} source={{ uri: artist.profile_photo[0] }} />
            </View>

            {/* Nom et domaine */}
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }} >
                <Text style={{ fontWeight: 'bold' }}>{artist.name}</Text>
                <Text style={{ fontWeight: 'bold' }}>{artist.occupation}</Text>
            </View>
            {/* Bouton rejeter /recruter */}
            <View style={{ paddingLeft: 5, paddingRight: 5 }} >
                <Button
                    color='#1ADBAC'
                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                    title="recruter" />
            </View>
        </View>
    })

    // * ___________________________ PAGE ___________________________

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>

                <Text>Artistes correspondant à votre recherche </Text>


                <View style={{ flexDirection: 'row', marginTop: 50 }} >

                    {/*   profil 1  */}
                    <View style={{ flexDirection: 'column', borderColor: 'black', borderWidth: 0.5, borderRadius: 7, width: 150, height: 210, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10 }}>
                        {/* image profil */}
                        <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: "center" }}>
                            <Image style={{ width: 140, height: 140 }} source={{ uri: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387' }} />
                        </View>

                        {/* Nom et domaine */}
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }} >
                            <Text style={{ fontWeight: 'bold' }}> Sarah  </Text>
                            <Text style={{ fontWeight: 'bold' }}> Photographe </Text>
                        </View>
                        {/* Bouton rejeter /recruter */}
                        <View style={{ paddingLeft: 5, paddingRight: 5 }} >
                            <Button
                                color='#1ADBAC'
                                buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                title="recruter" />

                        </View>

                    </View>


                    {/*   profil 2  */}
                    <View style={{ flexDirection: 'column', borderColor: 'black', borderWidth: 0.5, borderRadius: 7, width: 150, height: 210, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10 }}>
                        {/* image profil */}
                        <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: "center" }}>
                            <Image style={{ width: 140, height: 140 }} source={{ uri: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387' }} />
                        </View>

                        {/* Nom et domaine */}
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }} >
                            <Text style={{ fontWeight: 'bold' }}> Sarah  </Text>
                            <Text style={{ fontWeight: 'bold' }}> Photographe </Text>
                        </View>
                        {/* Bouton rejeter /recruter */}
                        <View style={{ paddingLeft: 5, paddingRight: 5 }} >
                            <Button
                                color='#1ADBAC'
                                buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                title="recruter" />

                        </View>

                    </View>

                    {artistsDisplay}

                </View>
            </View>

        </ScrollView>
    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
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
)(ArtisteCorrespondantScreen);
