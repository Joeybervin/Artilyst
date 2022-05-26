// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

import React, { useEffect, useState } from 'react';

import { expoUrlJoey } from '../ExpoUrl';

//^ Module de balise
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from '@rneui/base';
import { Switch, Image, Text, Overlay, Avatar } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';

// ^ Redux
import { connect } from 'react-redux';
import { CardStyleInterpolators } from '@react-navigation/stack';

import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from './components/GlobalStyles';
import { PostulerBtnLight, PostulerBtn, ContinuerLaRechercheBtn, EnvoyerUnMessageBtn } from './components/ButtonsStyles';

import { useTheme } from '@react-navigation/native';



let { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

function AnnoncesScreen(props) {
    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [value, setValue] = useState(null); // STRING : récupère le type de casting choisis
    const [isFocus, setIsFocus] = useState(false); // BOOLEAN
    const [checked, setChecked] = useState(false); // BOOLEAN : Pour changer l'état de mon swith ( gère la rémunération => rémunéré ou non)
    const [matchingCasting, setMatchingCasting] = useState([]); // ARRAY => OBECT :  Tableau des données venant du backend
    const [castingCategory, setCastingCategory] = useState(''); // STRING : Valeur choisie dans le menu déroulant
    const [isPaid, setIsPaid] = useState(false); // BOOLEAN :  Valeur du switch "projets rémunérés"
    const [recruiterListProjects, setRecruiterListProjects] = useState([]); // ARRAY
    const [allUsersAccount, setAllUsersAccount] = useState([]); // ARRAY
    const [overlayVisibility, setOverlayVisibility] = useState(false); // ARRAY
    const [projectImages, setProjectImages] = useState([]); // ARRAY


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

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    // Réception des casting filtrés pour l'utilisateur
    useEffect(() => {
        async function allUsers() {
            // ! TEMPORAIRE LE TEMPS QUE RAF FINISSE LA ROUTE =======> Joey :)
            var rawResponse = await fetch(`http://${expoUrlJoey}/all_users_profile`, {
            })
            let response = await rawResponse.json();
            setAllUsersAccount(response)
        }

        // * Si un recruteur se connecte => DropDown de tous ses projets en cours
        async function loadProjects() {
            var rawResponse = await fetch(`http://${expoUrlJoey}/recruiter_projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`,
            })
            let response = await rawResponse.json();
            setRecruiterListProjects(response)
        }

        // * Si un artiste se connecte => Visualisation de tous les projets le correspondant
        async function loadCasting() {
            var rawResponse = await fetch(`http://${expoUrlJoey}/search_casting`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`,
            })
            let response = await rawResponse.json();
            setMatchingCasting(response.matchingProjects)
        }

        if (props.user.occupation === "recruteur") { loadProjects(); allUsers() }//! TEMPORAIRE ==> Joey
        if (props.user.occupation !== "recruteur") loadCasting();
    }, []);

    // * ___________________________ FUNCTIONS ___________________________

    /* envoyer les infos necessaires au match au backend  */
    const Postuler = async (id, users) => {
        setOverlayVisibility(true)
       /*  var rawResponse = await fetch(`http://${expoUrlJoey}/postuler`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: props.user.token, projectId: id, userSelected: users }),

        })
        let response = await rawResponse.json();

        if (response.already) {
            setProjectImages(response.photoProjet) // récupération de la données du back-end
            setOverlayVisibility(true) // BOOLEAN : Si match un overlay apparaît
        } */

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
                    containerStyle={{ width: 110, height: 108 }}
                    resizeMode="contain"
                    source={{ uri: element.profile_photo[Math.floor(Math.random() * (element.profile_photo.length - 1))] }}
                    style={{ borderRadius: 10, marginRight: 10 }}
                // PlaceholderContent=""
                />

                <View style={{ flexDirection: 'column', width: 200, height: 108, justifyContent: 'space-between', alignItems: 'space-between' }}>
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
            <View key={i} style={{
                backgroundColor: '#f4f4f4',
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 12,
                borderColor: 'gray',
                borderWidth: 0,
                width: "85%",
                height: 170,
                marginTop: 10,
                marginBottom: 10,
                padding: 6,
                shadowColor: 'black',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.1, shadowRadius: 2
            }}
            >
                {/*! a revoir le border radius sur ios + IMAGE PAYSAGE A SUOPPRIME */}
                <View style={{ width: 110, height: '100%'}}> 
                    <Image
                        containerStyle={{ width: "100%", height: '100%'}}
                        resizeMode="contain"
                        source={{ uri: casting.photos[0] }}
                        style={{ borderRadius : 10}}
                        PlaceholderContent="ff"
                    />
                </View>
                <View style={{ width: 200, height: '85%', justifyContent: 'space-between', paddingRight: 7 }}>

                    <Text style={styles.cardTitle}>{description.substring(0, 30) + ' ...'}</Text>
                    <Text style={styles.cardText}>{description.substring(0, 50) + ' ...'}</Text>
                    <PostulerBtnLight onPressHandler={() => Postuler(casting._id, casting.users_selected)} />
                </View>
            </View>
        )

    })


    // * ___________________________ PAGE ___________________________


    // RECRUTEUR
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
    // ARTISTE
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

                            
                            <EnvoyerUnMessageBtn onPressHandler={ () =>
                                   { setOverlayVisibility(false)
                                    props.navigation.navigate('MessagesScreen')}}/>
                            <ContinuerLaRechercheBtn onPressHandler={ () => setOverlayVisibility(false)} />
                           
                        </View>
                    </View>
                </Overlay>


                <View style={styles.container}>

                    <Text style={styles.title}>Recherche de casting</Text>

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
                        placeholder={'Type de casting'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                            setCastingCategory(item.value);
                        }}
                        renderLeftIcon={() => (
                            <Ionicons
                                style={styles.icon}
                                color={isFocus ? '#1ADBAC' : '#232323'}
                                name="search"
                                size={20}
                            />
                        )}
                    />

                    {/* BOOLEAN :  Switch pour la rémunération */}
                    <View style={styles.remunerationContainer} >
                        <Text style={styles.textRegular}>Uniquement les projets rémunérés</Text>
                        <Switch
                            color='#21AC89F1'
                            marginLeft={5}
                            value={checked}
                            onValueChange=
                            {(value) => {
                                setChecked(value),
                                    setIsPaid(!isPaid)
                            }}

                        />
                    </View>

                    {/* AFFICHAGE DES CASTING */}
                    {myTab.lenght === 0 ? <Text> Compléter votre profile, pour voir des castings vous correspondant</Text> : castingDisplay}

                </View>

            </ScrollView>
        );

    }

}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom : 100
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
        marginRight: 10,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'grey',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#232323',
        fontWeight: 'bold',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#232323',
    },
    iconStyle: {
        width: 25,
        height: 25,
        color: '#232323',
        fontWeight: 'bold',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'white'
    },
    remunerationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        marginBottom: 20
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
    return { user: state.user }
}

export default connect(
    mapStateToProps,
    null
)(AnnoncesScreen);