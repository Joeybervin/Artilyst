import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// ^ Wanings messages
import { LogBox, Button, ScrollView } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, Text, View, Image } from 'react-native';
/* import { Text } from '@rneui/base'; */
// const [DisplayArtist, setDisplayArtist]= useState()
import { PostulerBtnLight, RecruterBtn } from '../components/ButtonsStyles';
import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';

import { expoUrlRaf } from '../../ExpoUrl';
import { NavigationContainer } from '@react-navigation/native';

function ArtisteCorrespondantScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [matchingArtists, setMatchingArtists] = useState([]);

    /* VARIABLES */

    const params = props.route.params;
    console.log(params)

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________

    // Import des artistes correspondants depuis le backend
    useEffect(() => {
        async function loadArtists() {
            //console.log('TEST FETCH :', params)
            var rawResponse = await fetch(`http://${expoUrlRaf}/search_artist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${params.id}`,
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

            <View style={{ flexDirection: 'row', flexWrap: 1 }}>

                <View style={styles.profilCards}>
                    <View>
                        <Image
                            style={{ width: 130, height: 140, borderRadius: 7 }}
                            source={{ uri: 'https://images.unsplash.com/photo-1512813498716-3e640fed3f39?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=424' }}
                        />
                    </View>
                    <View style={{ alignItems: 'center', margin: 8 }} >
                        <Text style={styles.cardTitle}>{artist.name}</Text>
                        <Text style={styles.cardText}>{artist.occupation}</Text>
                    </View>
                    <View style={{ justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }} >
                        <RecruterBtn />
                        <Button
                            color='black'
                            buttonStyle={{ fontSize: 12 }}
                            title="Rejeter"
                        />
                    </View>
                </View>

                {/* <View key={i} style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    borderColor: 'black',
                    borderWidth: 0.5,
                    borderRadius: 7,
                    width: 160,
                    height: 230,
                    backgroundcolor: '#1ADBAC',
                    margin: 8

                }}> */}
                   
                    {/* <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: "center" }}> */}
                        {/*  <Image style={{ width: '100%', height: '100%' }} source={{ uri: artist.profile_photo[0] }} /> */}
                    {/* </View>

                    
                    <View style={{ flexDirection: 'row', justifyContent: "space-around" }} >
                        <Text style={{ fontWeight: 'bold' }}>{artist.name}</Text>
                        <Text style={{ fontWeight: 'bold' }}>{artist.occupation}</Text>
                    </View>
                    
                    <View style={{ paddingLeft: 5, paddingRight: 5 }} >
                        <Button
                            color='#1ADBAC'
                            buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                            title="recruter" />
                    </View> */}


                </View>
                )
    })

                // * ___________________________ PAGE ___________________________

                return (
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>

                        <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 10,
                            marginTop: 20
                        }}>Votre recherche</Text>

                        <Text style={{
                            fontSize: 15,
                            //fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 5,
                            marginTop: 10
                        }}>Voici les artistes correspondant à votre projet !</Text>

                        <View style={{
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            marginTop: 10,
                            width: '100%',
                            justifyContent: 'center'
                        }} >

                            {/* {artistsDisplay.length === 0 ? <Text>Aucun n'artiste ne correspondant</Text> : artistsDisplay} */}


                            {/* ARTISTE 1 */}
                            <View style={{ flexDirection: 'row', flexWrap: 1 }}>

                                <View style={styles.profilCards}>
                                    <View>
                                        <Image
                                            style={{ width: 130, height: 140, borderRadius: 7 }}
                                            source={{ uri: 'https://images.unsplash.com/photo-1512813498716-3e640fed3f39?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=424' }}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', margin: 8 }} >
                                        <Text style={styles.cardTitle}>Léa</Text>
                                        <Text style={styles.cardText}>Photographe</Text>
                                    </View>
                                    <View style={{ justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }} >
                                        <RecruterBtn onPressHandler={() => props.navigation.navigate('MatchScreen')} />
                                        <Button
                                            color='black'
                                            buttonStyle={{ fontSize: 12 }}
                                            title="Rejeter"
                                        />
                                    </View>
                                </View>

                                {/* ARTISTE 2 */}
                                <View style={styles.profilCards}>
                                    <View>
                                        <Image
                                            style={{ width: 130, height: 140, borderRadius: 7 }}
                                            source={{ uri: 'https://images.unsplash.com/photo-1596923322832-ada855ab1a61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387' }}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', margin: 8 }} >
                                        <Text style={styles.cardTitle}>Pierre</Text>
                                        <Text style={styles.cardText}>Photographe</Text>
                                    </View>
                                    <View style={{ justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }} >
                                        <RecruterBtn />
                                        <Button
                                            color='black'
                                            buttonStyle={{ fontSize: 12 }}
                                            title="Rejeter"
                                        />
                                    </View>
                                </View>

                                {/* ARTISTE 3 */}
                                <View style={styles.profilCards}>
                                    <View>
                                        <Image
                                            style={{ width: 130, height: 140, borderRadius: 7 }}
                                            source={{ uri: 'https://images.unsplash.com/photo-1541515929569-1771522cbaa9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170' }}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', margin: 8 }} >
                                        <Text style={styles.cardTitle}>Marie-li</Text>
                                        <Text style={styles.cardText}>Photographe</Text>
                                    </View>
                                    <View style={{ justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }} >
                                        <RecruterBtn />
                                        <Button
                                            color='black'
                                            buttonStyle={{ fontSize: 12 }}
                                            title="Rejeter"
                                        />
                                    </View>
                                </View>

                                {/* ARTISTE 4 */}
                                <View style={styles.profilCards}>
                                    <View>
                                        <Image
                                            style={{ width: 130, height: 140, borderRadius: 7 }}
                                            source={{ uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465' }}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', margin: 8 }} >
                                        <Text style={styles.cardTitle}>Maurice</Text>
                                        <Text style={styles.cardText}>Photographe</Text>
                                    </View>
                                    <View style={{ justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }} >
                                        <RecruterBtn />
                                        <Button
                                            color='black'
                                            buttonStyle={{ fontSize: 12 }}
                                            title="Rejeter"
                                        />
                                    </View>
                                </View>



                                {/* ARTISTE 5 */}
                                <View style={styles.profilCards}>
                                    <View>
                                        <Image
                                            style={{ width: 130, height: 140, borderRadius: 7 }}
                                            source={{ uri: 'https://images.unsplash.com/photo-1542507146-e146ae65e923?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387' }}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', margin: 8 }} >
                                        <Text style={styles.cardTitle}>John</Text>
                                        <Text style={styles.cardText}>Photographe</Text>
                                    </View>
                                    <View style={{ justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }} >
                                        <RecruterBtn />
                                        <Button
                                            color='black'
                                            buttonStyle={{ fontSize: 12 }}
                                            title="Rejeter"
                                        />
                                    </View>
                                </View>

                                {/* ARTISTE 6 */}
                                <View style={styles.profilCards}>
                                    <View>
                                        <Image
                                            style={{ width: 130, height: 140, borderRadius: 7 }}
                                            source={{ uri: 'https://images.unsplash.com/photo-1551780165-f2a8e6d86eb8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387' }}
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center', margin: 8 }} >
                                        <Text style={styles.cardTitle}>Abdel</Text>
                                        <Text style={styles.cardText}>Photographe</Text>
                                    </View>
                                    <View style={{ justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }} >
                                        <RecruterBtn />
                                        <Button
                                            color='black'
                                            buttonStyle={{ fontSize: 12 }}
                                            title="Rejeter"
                                        />
                                    </View>
                                </View>

                            </View>


                        </View>
                    </View>

                </ScrollView>
                );
}

                // * ___________________________ STYLES ___________________________

                const styles = StyleSheet.create({
                    scrollView: {
                    backgroundColor: '#fff'
    },
                container: {
                    flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 50
    },
                profilCards: {
                    alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 7,
                width: 160,
                height: 290,
                backgroundColor: '#f4f4f4',
                paddingTop: 12,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10,
                color: 'black',
                borderRadius: 12,
                shadowColor: 'black',
                shadowOffset: {width: 2, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2

    },
                // -- GLOBAL STYLE ----------
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


                function mapStateToProps(state) {
    return {user: state.user }
}

                export default connect(
                mapStateToProps,
                null
                )(ArtisteCorrespondantScreen);
