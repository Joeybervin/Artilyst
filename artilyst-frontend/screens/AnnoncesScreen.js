import React, { FC, useEffect, useState } from 'react';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from '@rneui/base';
import { Switch, Image, Text, Overlay, Avatar } from '@rneui/themed';

// ^ Dropwown
import { Dropdown } from 'react-native-element-dropdown';
// ^ Icon
import { Ionicons } from '@expo/vector-icons';

import { expoUrlRaf } from '../ExpoUrl';

import { connect } from 'react-redux';

import { pageBackground, textRegular, title } from './components/Styles';

import { useTheme } from '@react-navigation/native';
import { NeomButton, PostulerBtn } from './components/MainButtonComponent';



let { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

function AnnoncesScreen(props) {
    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [value, setValue] = useState(null); // String : récupère le type de casting choisis
    const [isFocus, setIsFocus] = useState(false);
    const [checked, setChecked] = useState(false); // Bolean : Pour changer l'état de mon swith ( gère la rémunération => rémunéré ou non)
    const [matchingCasting, setMatchingCasting] = useState([]); // Tableau des données venant du backend
    const [castingCategory, setCastingCategory] = useState(''); // Valeur choisie dans le menu déroulant
    const [isPaid, setIsPaid] = useState(false); // Valeur du switch "projets rémunérés"
    const [recruiterListProjects, setRecruiterListProjects] = useState([])
    const [allUsersAccount, setAllUsersAccount] = useState([])
    const [overlayVisibility, setOverlayVisibility] = useState(false)
    const [projectImages, setProjectImages] = useState([]); //



    /* VARIABLES */
    let myTab = matchingCasting;

    const dropdownData = [ // Collecte tous les catégories de projet disponnible
        { label: 'Création textile', value: 'Création textile' },
        { label: 'Défilés', value: 'Défilés' },
        { label: 'Événements / Vernissages', value: 'Événements / Vernissages' },
        { label: 'Courts métrages', value: 'Courts métrages' },
        { label: 'Longs métrages', value: 'Longs métrages' },
        { label: 'Séries', value: 'Séries' },
        { label: 'Publicités', value: 'Publicités' },
        { label: 'Shooting', value: 'Shooting' },
        { label: 'Tous types', value: '' },
    ];

    console.log(recruiterListProjects)

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    // Réception des casting filtrés pour l'utilisateur
    useEffect(() => {
        // ! TEMPORAIRE LE TEMPS QUE RAF FINISSE LA ROUTE =======> Joey :)
        async function allUsers() {
            var rawResponse = await fetch(`http://${expoUrlRaf}/all_users_profile`, {
            })
            let response = await rawResponse.json();
            console.log(response)
            setAllUsersAccount(response)
        }

        // * Si un recruteur se connecte => DropDown de tous ses projets en cours
        async function loadProjects() {
            var rawResponse = await fetch(`http://${expoUrlRaf}/recruiter_projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`,
            })
            let response = await rawResponse.json();
            setRecruiterListProjects(response)
        }

        // * Si un artiste se connecte => Visualisation de tous les projets le correspondant
        async function loadCasting() {
            var rawResponse = await fetch(`http://${expoUrlRaf}/search_casting`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`,
            })
            let response = await rawResponse.json();
            setMatchingCasting(response.matchingProjects)
            console.log("reponse", response.matchingProjects)
        }

        if (props.user.occupation === "recruteur") { loadProjects(); allUsers() }//! TEMPORAIRE ==> Joey
        if (props.user.occupation !== "recruteur") loadCasting();
    }, []);

    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________
    //*********** envoyer les infos necessaires au match au backend  */

    const Postuler = async (id, users) => {
        var rawResponse = await fetch(`http://${expoUrlRaf}/postuler`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: props.user.token, projectId: id, userSelected: users }),

        })
        console.log("users", users)
        let response = await rawResponse.json();

        if (response.already) {
            setProjectImages(response.photoProjet)
            setOverlayVisibility(true)
        }

    }
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________

    /* MAP */



    if (castingCategory != '') {
        myTab = myTab.filter(e => e.category == castingCategory)
    }
    if (isPaid) {
        myTab = myTab.filter(e => e.remuneration == true)
    }

    const recruiterArtistsList = allUsersAccount.map((element, index) => {
        return (

            <TouchableOpacity key={index + 1}
                activeOpacity={.2} style={{ borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: 'black', borderWidth: 0.5, width: "85%", height: 140, marginTop: 30 }}
                onPress={() => props.navigation.navigate('OtherUserProfileScreen', { userToken: element.token })}>

                <Image
                    containerStyle={{ width: 110, height: 108, }}
                    resizeMode="contain"
                    source={{ uri: element.profile_photo[Math.floor(Math.random() * (element.profile_photo.length - 1))] }}
                    style={{ borderRadius: 10, marginRight: 10 }}
                    PlaceholderContent="ff"
                />

                <View style={{ width: 200, height: 108 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 2 }}>{element.name}</Text>
                    <Text style={{ fontWeight: "bold", marginBottom: 4 }}>{element.occupation}</Text>
                    <Text style={{ marginBottom: 5 }}>{element.description}</Text>
                    <Button
                        color='#1ADBAC'
                        buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                        title="recruter" onPress={() => console.log('recruter')} />
                </View>

            </TouchableOpacity>

        )
    })

    // Affichage d'une card
    let castingDisplay = myTab.map((casting, i) => {
        let title = casting.title
        let description = casting.description

        return (
            <View key={i} style={{ borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: 'black', borderWidth: 0.5, width: "85%", height: 150, marginTop: 30 }}>

                <Image
                    containerStyle={{ width: 110, height: '85%', }}
                    resizeMode="contain"
                    source={{}}
                    style={{ borderRadius: 10, marginRight: 10 }}
                    PlaceholderContent="ff"
                />

                <View style={{ width: 200, height: '85%', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontWeight: "bold", marginBottom: 3 }}>{description.substring(0, 30) + ' ...'}</Text>
                        <Text style={{ marginBottom: 5, fontSize: 12 }}>{description.substring(0, 50) + ' ...'}</Text>
                    </View>
                    <PostulerBtn onPress={() => Postuler(casting._id, casting.users_selected)} />
                    {/* <Button
                        color='#1ADBAC'
                        buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                        title="postuler" onPress={() => Postuler(casting._id, casting.users_selected)} /> */}



                </View>

            </View>
        )

    })



    // * ___________________________ PAGE ___________________________

    if (props.user.occupation === "recruteur") {


        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text h4 style={{ marginTop: 25, marginBottom: 30 }}>Artistes correspondant à votre projet</Text>

                    {/* Choix de la catégorie dans laquel l'utilisateur souhaite chercher un casting */}
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: '#1ADBAC' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={recruiterListProjects}
                        maxHeight={300}
                        labelField="title"
                        valueField="title"
                        placeholder={'Choisissez un type de casting'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                            setCastingCategory(item.value);
                        }}
                        renderLeftIcon={() => (
                            <Ionicons style={styles.icon} color={isFocus ? '#1ADBAC' : 'black'} name="search" size={20} />)}
                    />

                    {recruiterListProjects.length === 0 ? <Text>Créer votre premier projet</Text> : recruiterArtistsList}
                </View>
            </ScrollView>
        )
    }
    else {
        return (
            <ScrollView style={styles.scrollView}>

                {/* Overlay */}
                <Overlay
                    overlayStyle={{ alignItems: 'center', justifyContent: "center" }}
                    fullScreen
                    isVisible={overlayVisibility}
                >
                    <View style={{ width: "90%", height: "85%", alignItems: 'center' }}>

                        {/* Texte */}
                        <Text h2 style={{ marginBottom: 10 }}  >C'est un match !</Text>
                        <Text style={{ fontSize: 20 }} >Vous pouvez collaborer</Text>


                        {/* Photos */}
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', marginTop: screenWidth / 4 }}>

                            <Avatar
                                size={'xlarge'}
                                rounded
                                source={props.user.profile_photo.length === 0 ? { uri: "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" } : { uri: props.user.profile_photo[0] }}
                                containerStyle={{}}
                            />

                            <Avatar
                                size={'xlarge'}
                                rounded
                                source={{ uri: "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" }}
                                // ! A CHANGER source={projectImages.length > 0 ? {uri : "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" }: {uri : projectImages[0]}}
                                containerStyle={{}}
                            />
                        </View>

                        {/* -------- BOUTONS --------  */}
                        <View style={{ justifyContent: "space-between", alignItems: "center", height: 125, marginTop: screenWidth / 3 }} >
                            <Button
                                title="Envoyer un message"
                                titleStyle={{ paddingHorizontal: 49, paddingVertical: 7 }}
                                buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                                onPress={() => {
                                    setOverlayVisibility(false)
                                    props.navigation.navigate('MessagesScreen')

                                }}
                            />
                            <Button
                                title="Continuer la recherche"
                                titleStyle={{ paddingHorizontal: 40, paddingVertical: 7 }}
                                buttonStyle={{ borderRadius: 8, backgroundColor: "#333333", color: "black" }}
                                onPress={() => {
                                    setOverlayVisibility(false)
                                }}
                            />
                        </View>



                    </View>



                </Overlay>


                <View style={styles.container}>

                    <Text style={styles.title}>Casting vous Correspondant</Text>

                    {/* Choix de la catégorie dans laquel l'utilisateur souhaite chercher un casting */}
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: '#1ADBAC' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dropdownData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Choisissez un type de casting'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                            setCastingCategory(item.value);
                            //console.log('casting:', castingCategory)
                            // filter(item.value);
                            // chooseCategory(item.value);
                            //   console.log("log du ",item)
                        }}
                        renderLeftIcon={() => (
                            <Ionicons
                                style={styles.icon}
                                color={isFocus ? '#1ADBAC' : 'black'}
                                name="search"
                                size={20}
                            />
                        )}
                    />

                    {/* Switch pour la rémunération souhaité ou non ==> Boolean */}
                    <View style={styles.remunerationContainer} >
                        <Text style={styles.textRegular}>Afficher uniquement projet rémunéré ? </Text>
                        <Switch
                            color='#21AC89F1'
                            value={checked}
                            onValueChange=
                            {(value) => {
                                setChecked(value),
                                    setIsPaid(!isPaid)
                                //filter(castingCategory)
                                // choosePaid(value)
                                // console.log('CONSOLE LOG VALEUR DU SWITCH:', value)
                            }}

                        />
                    </View>

                    {/* AFFICHAGE DES CASTING */}
                    {castingDisplay}

                </View>

            </ScrollView>
        );

    }

}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: "90%"
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    remunerationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 30
    },
    textRegular : {
        ...textRegular
    },
    title : {
        ...title
    }
});

// * ___________________________ REDUX ___________________________


function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(
    mapStateToProps,
    null
)(AnnoncesScreen);