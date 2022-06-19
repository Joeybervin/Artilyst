// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

import React, { useEffect, useState } from 'react';

import { expoUrlJoey } from '../ExpoUrl';

//^ Module de balise
import { StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';
import { Button } from '@rneui/base';
import { Switch, Text, Overlay, Avatar } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';

// ^ Redux
import { connect } from 'react-redux';

import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from './components/GlobalStyles';
import { PostulerBtnLight, ContinuerLaRechercheBtn, EnvoyerUnMessageBtn } from './components/ButtonsStyles';


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
    const [overlayVisibility, setOverlayVisibility] = useState(false); // ARRAY

    /* VARIABLES */
    let matchingCastingListCopy = matchingCasting;

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
        // * Si un recruteur se connecte => DropDown de tous ses projets en cours
        /* async function loadProjects() {
            var rawResponse = await fetch(`http://${expoUrlJoey}/recruiter_projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`,
            })
            let response = await rawResponse.json();
            setRecruiterListProjects(response)
        } */

        // * Si un artiste se connecte => Visualisation de tous les projets le correspondant
        async function loadCasting() {
            var rawResponse = await fetch(`http://${expoUrlJoey}/search_casting`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`,
            })
            let response = await rawResponse.json();
            setMatchingCasting(response.matchingProjects)
            console.log(response)

        }

        if (props.user.occupation === "recruteur") loadProjects() //! TEMPORAIRE ==> Joey
        if (props.user.occupation !== "recruteur") loadCasting();
    }, []);

    // * ___________________________ FUNCTIONS ___________________________

    /* envoyer les infos necessaires au match au backend  */
    const Postuler = async (id, users) => {
        setOverlayVisibility(true)
        var rawResponse = await fetch(`http://${expoUrlJoey}/postuler`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: props.user.token, projectId: id, userSelected: users }),

        })
        let response = await rawResponse.json();

        if (response.already) {
            setProjectImages(response.photoProjet) // récupération de la données du back-end
            setOverlayVisibility(true) // BOOLEAN : Si match un overlay apparaît
        }

    }


    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */
    if (castingCategory != '') {
        matchingCastingListCopy = matchingCastingListCopy.filter(e => e.category == castingCategory)
    }
    if (isPaid) {
        matchingCastingListCopy = matchingCastingListCopy.filter(e => e.remuneration == true)
    }

    // Affichage d'une card
    let castingDisplay = matchingCastingListCopy.map((casting, i) => {
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
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
            }}
            >
                {/*! a revoir le border radius sur ios */}
                <View style={{ width: 110, height: '100%' }}>
                    <Image
                        containerStyle={{ width: "100%", height: '100%' }}
                        resizeMode="contain"
                        source={matchingCastingListCopy.length === 0 ? { uri: "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" } : { uri: casting.photos[0] }}
                        style={{ borderRadius: 10 }}
                        PlaceholderContent="image"
                    />
                </View>
                <View style={{ width: 200, height: '85%', justifyContent: 'space-between', paddingRight: 7 }}>

                    <Text style={styles.cardTitle}>{title.substring(0, 30) + ' ...'}</Text>
                    <Text style={styles.cardText}>{description.substring(0, 50) + ' ...'}</Text>

                    <PostulerBtnLight onPressHandler={() => Postuler(casting._id, casting.users_selected)} />

                </View>
            </View>
        )

    })

    /* S'affiche si aucun castings correspondant aux characteristics de l'utilisateur n'est retournée */
    const NoCastingMatchMessage = () => (
        <View style={{ width: "90%", alignItems: "center", marginTop: 50 }}>
            <Image style={{ width: 55, height: 55, marginBottom: 25 }} source={require('../assets/empty.png')} />
            <Text style={{ width: "85%", textAlign: "center", }}>Désolée, malheureusement la recherche n'a rien donnée. Si ce n'est pas encore fait, essayez de compléter <Link style={{ fontWeight: 'bold' }} to={'/ProfileScreen'}>votre profile</Link> et retenter votre chance</Text>
        </View>
    )


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

                            />
                            <Avatar
                                size={'xlarge'}
                                rounded
                                source={{ uri: "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" }}
                            />
                        </View>

                        {/* -------- BOUTONS --------  */}
                        <View style={{ justifyContent: "space-between", alignItems: "center", height: 125, marginTop: screenWidth / 3 }} >


                            <EnvoyerUnMessageBtn onPressHandler={() => {
                                setOverlayVisibility(false)
                                props.navigation.navigate('MessagesScreen')
                            }} />
                            <ContinuerLaRechercheBtn onPressHandler={() => setOverlayVisibility(false)} />

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
                    {castingDisplay.length === 0 ? <NoCastingMatchMessage /> : castingDisplay}

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
        marginBottom: 100
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