import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// ^ Wanings messages
import { LogBox, Button, ScrollView } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */
// const [DisplayArtist, setDisplayArtist]= useState()

import { expoUrlJoey } from '../../ExpoUrl';

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
            //console.log('TEST FETCH :', projectId)
            var rawResponse = await fetch(`http://${expoUrlJoey}/search_artist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${projectId.id}`,
            })
            let response = await rawResponse.json();
            //console.log('REPONSE DU BACKEND',response.matchingUsers)
            setMatchingArtists(response.matchingUsers)
            console.log('TABLEAU MATCHING', matchingArtists);
        }
        loadArtists()
    }, []);


    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */

    // Affichage des artistes sous forme de "cards"
    let artistsDisplay = matchingArtists.map((artist, i) => {

        return (

            <View key={i} style={{
                flexDirection: 'column',
                justifyContent:'space-around',
                borderColor: 'black',
                borderWidth: 0.5,
                borderRadius: 7,
                width: 160,
                height: 230,
                backgroundcolor: '#1ADBAC',
                margin: 8
                
            }}>
                {/* image profil */}
                <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: "center" }}>
                    <Image style={{ width: '100%', height: '100%' }} source={{ uri: artist.profile_photo[0] }} />
                </View>

                {/* Nom et domaine */}
                <View style={{ flexDirection: 'row', justifyContent: "space-around" }} >
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
        )
    })

    // * ___________________________ PAGE ___________________________

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>

                <Text>Artistes correspondant à votre recherche </Text>

                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    marginTop: 10,
                    width: '100%',
                    justifyContent: 'center'
                }} >

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
