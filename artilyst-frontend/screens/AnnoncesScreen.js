// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

import React, { useEffect, useState } from 'react';

import { expoUrlRaf } from '../ExpoUrl';

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
            var rawResponse = await fetch(`http://${expoUrlRaf}/recruiter_projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`,
            })
            let response = await rawResponse.json();
            setRecruiterListProjects(response)
        } */

        // * Si un artiste se connecte => Visualisation de tous les projets le correspondant
        async function loadCasting() {
            var rawResponse = await fetch(`http://${expoUrlRaf}/search_casting`, {
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
        var rawResponse = await fetch(`http://${expoUrlRaf}/postuler`, {
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
                        style={{ width: 100, height: 140, marginTop: 7 }}
                        PlaceholderContent="image"
                    />
                </View>
                <View style={{ width: 200, height: '85%', justifyContent: 'space-between', paddingRight: 7 }}>

                    <Text style={styles.cardTitle}>{title.substring(0, 30) + ' ...'}</Text>
                    <Text style={styles.cardText}>{description.substring(0, 50) + ' ...'}</Text>

                    {/* <PostulerBtnLight onPressHandler={() => Postuler(casting._id, casting.users_selected)} */}
                    <PostulerBtnLight onPressHandler={() => props.navigation.navigate('MatchScreen')} />

                </View>
            </View>
        )

    })

    /* S'affiche si aucun castings correspondant aux characteristics de l'utilisateur n'est retournée */
    const NoCastingMatchMessage = () => (
        <View style={{ width: "90%", alignItems: "center", marginTop: 50 }}>
            <Image style={{ width: 55, height: 55, marginBottom: 25 }} source={require('../assets/empty.png')} />
            <Text style={{ width: "85%", textAlign: "center", }}>Complétez <Link style={{ fontWeight: 'bold' }} to={'/ProfileScreen'}>votre profil</Link> pour trouver des projets qui vous correspondent !</Text>
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
                            //source={props.user.profile_photo.length === 0 ? { uri: "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" } : { uri: props.user.profile_photo[0] }}

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

                    {/* AFFICHAGE DYNAMIQUE DES CASTING */}
                    {/* {castingDisplay.length === 0 ? <NoCastingMatchMessage />  : {castingDisplay} } */}

                    {castingDisplay}

                   
                    {/* AFFICHAGE EN DUR DES CASTING */}
                    {/* CASTING 1 */}
                    <View style={{
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

                        <View style={{ width: 110, height: '100%' }}>
                            <Image
                                containerStyle={{ width: "100%", height: '100%' }}
                                resizeMode="contain"
                                source={{ uri: "https://images.unsplash.com/photo-1614778265188-dff1832ae5a2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464" }}
                                style={{ width: 100, height: 140, borderRadius: 1 }}
                                PlaceholderContent="image"
                            />
                        </View>
                        <View style={{ width: 200, height: '85%', justifyContent: 'space-between', paddingRight: 7 }}>

                            <Text style={styles.cardTitle}>Modèle pour shooting</Text>
                            <Text style={styles.cardText}>Je cherche un modèle pour un shooting studio</Text>
                            <PostulerBtnLight onPressHandler={() => Postuler(casting._id, casting.users_selected)} />
                        </View>
                    </View>

                    {/* CASTING 2 */}
                    <View style={{
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

                        <View style={{ width: 110, height: '100%' }}>
                            <Image
                                containerStyle={{ width: "100%", height: '100%' }}
                                resizeMode="contain"
                                source={{ uri: "https://images.unsplash.com/photo-1550155864-3033f844da36?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387" }}
                                style={{ width: 100, height: 140, borderRadius: 10 }}
                                PlaceholderContent="image"
                            />
                        </View>
                        <View style={{ width: 200, height: '85%', justifyContent: 'space-between', paddingRight: 7 }}>

                            <Text style={styles.cardTitle}>Marque OSIRIS cherche modèle</Text>
                            <Text style={styles.cardText}>La marque Osiris cherche un modèle masculin pour un shooting</Text>
                            {/* <PostulerBtnLight onPressHandler={() => Postuler(casting._id, casting.users_selected)} /> */}
                            <PostulerBtnLight onPressHandler={() => props.navigation.navigate('MatchScreen')} />
                        </View>
                    </View>

                    {/* CASTING 3 */}
                    <View style={{
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

                        <View style={{ width: 110, height: '100%' }}>
                            <Image
                                containerStyle={{ width: "100%", height: '100%' }}
                                resizeMode="contain"
                                source={{ uri: "https://images.unsplash.com/photo-1484876065684-b683cf17d276?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387" }}
                                style={{ width: 100, height: 140,borderRadius: 10 }}
                                PlaceholderContent="image"
                            />
                        </View>
                        <View style={{ width: 200, height: '85%', justifyContent: 'space-between', paddingRight: 7 }}>

                            <Text style={styles.cardTitle}>Recherche modèle pour publicité</Text>
                            <Text style={styles.cardText}>Studio de musique recherche modèle pour une publicité</Text>
                            <PostulerBtnLight onPressHandler={() => Postuler(casting._id, casting.users_selected)} />
                        </View>
                    </View>

                    {/* CASTING 4 */}
                    <View style={{
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

                        <View style={{ width: 110, height: '100%' }}>
                            <Image
                                containerStyle={{ width: "100%", height: '100%' }}
                                resizeMode="contain"
                                source={{ uri: "https://images.unsplash.com/photo-1610214054205-7595cba9cd23?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387" }}
                                style={{ width: 100, height: 140,borderRadius: 10 }}
                                PlaceholderContent="image"
                            />
                        </View>
                        <View style={{ width: 200, height: '85%', justifyContent: 'space-between', paddingRight: 7 }}>

                            <Text style={styles.cardTitle}>Spot publicitaire : recherche modèle</Text>
                            <Text style={styles.cardText}>Marque de bijoux basée à Paris, nous recherchons un modèle homme</Text>
                            <PostulerBtnLight onPressHandler={() => Postuler(casting._id, casting.users_selected)} />
                        </View>
                    </View>

                    {/* CASTING 5 */}
                    <View style={{
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

                        <View style={{ width: 110, height: '100%' }}>
                            <Image
                                containerStyle={{ width: "100%", height: '100%' }}
                                resizeMode="contain"
                                source={{ uri: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387" }}
                                style={{ width: 100, height: 140,borderRadius: 10 }}
                                PlaceholderContent="image"
                            />
                        </View>
                        <View style={{ width: 200, height: '85%', justifyContent: 'space-between', paddingRight: 7 }}>

                            <Text style={styles.cardTitle}>Casting mannequin homme</Text>
                            <Text style={styles.cardText}>Dans le cadre d'une collaboration, nous recherchons des modèles</Text>
                            <PostulerBtnLight onPressHandler={() => Postuler(casting._id, casting.users_selected)} />
                        </View>
                    </View>

                    {/* CASTING 6 */}
                    <View style={{
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

                        <View style={{ width: 110, height: '100%' }}>
                            <Image
                                containerStyle={{ width: "100%", height: '100%' }}
                                resizeMode="contain"
                                source={{ uri: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387" }}
                                style={{ width: 100, height: 140,borderRadius: 10 }}
                                PlaceholderContent="image"
                            />
                        </View>
                        <View style={{ width: 200, height: '85%', justifyContent: 'space-between', paddingRight: 7 }}>

                            <Text style={styles.cardTitle}>Shooting pour publicité</Text>
                            <Text style={styles.cardText}>Marque cherche égérie pour campagne publicitaire</Text>
                            <PostulerBtnLight onPressHandler={() => Postuler(casting._id, casting.users_selected)} />
                        </View>
                    </View>

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