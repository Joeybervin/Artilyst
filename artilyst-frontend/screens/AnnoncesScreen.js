import React, { FC, useEffect, useState } from 'react';

// ^ Wanings messages
import { LogBox, Button } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, View, ScrollView } from 'react-native';
import { Switch, Image, Text } from '@rneui/themed';

// ^ Dropwown
import { Dropdown } from 'react-native-element-dropdown';
// ^ Icon
import { Ionicons } from '@expo/vector-icons';

import { expoUrlMustafa } from '../ExpoUrl';

import { connect } from 'react-redux';



function AnnoncesScreen(props) {

    let informations = props.user;

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [value, setValue] = useState(null); // String : récupère le type de casting choisis
    const [isFocus, setIsFocus] = useState(false);

    const [checked, setChecked] = useState(false); // Bolean : Pour changer l'état de mon swith (gère si on cherche des castings rémunéré ou non)

    const [matchingCasting, setMatchingCasting] = useState([]); // Tableau des données venant du backend
    const [castingCategory, setCastingCategory] = useState(''); // Valeur choisie dans le menu déroulant
    const [isPaid, setIsPaid] = useState(false); // Valeur du switch "projets rémunérés"
 

    /* VARIABLES */
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

    // const images = ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920", "https://images.unsplash.com/photo-1571590946238-a0ba990d12a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzdGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNob290aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvb3Rpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1607692605098-2b3cd0ebdd08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2VyaWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1559694204-61edb596dab1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN0eWxpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1501699169021-3759ee435d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3R5bGlzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1632643871772-b68cfd34b303?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687", "https://images.unsplash.com/photo-1540320865252-e4abf9e80004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FzdGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"]

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */

    // Réception des casting filtrés pour l'utilisateur
    useEffect(() => {
        async function loadCasting() {
            var rawResponse = await fetch(`http://${expoUrlMustafa}/search_casting`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${informations.user_token}`
            })
            let response = await rawResponse.json();
            setMatchingCasting(response.matchingProjects)
            console.log("reponse",response.matchingProjects)
        }
        loadCasting();
    }, []);

    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________
//*********** envoyer les infos necessaires au match au backen  */
  
  const Postuler = async (id , users) =>{
        var rawResponse = await fetch(`http://${expoUrlMustafa}/postuler`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token : informations.user_token , projectId:id, userSelected:users }),
            
        })
        console.log("users",users)
        let response = await rawResponse.json();


    }
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________

    /* MAP */

    let myTab = matchingCasting;

    if (castingCategory != '') {
        myTab = myTab.filter(e => e.category == castingCategory)
    }

    if (isPaid) {
        myTab = myTab.filter(e => e.remuneration == true)
    } 
    


    let castingDisplay = myTab.map((casting, i) => {

        return (
            <View key={i} style={{ borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: 'black', borderWidth: 0.5, width: "85%", height: 140, marginTop: 30 }}>

                <Image
                    containerStyle={{ width: 110, height: 108, }}
                    resizeMode="contain"
                    source={{}}
                    style={{ borderRadius: 10, marginRight: 10 }}
                    PlaceholderContent="ff"
                />

                <View style={{ width: 200, height: 108 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 3 }}>{casting.title}</Text>
                    <Text style={{ marginBottom: 5 }}>{casting.description}</Text>
                    <Button
                        color='#1ADBAC'
                        buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                        title="postuler" onPress={()=>Postuler(casting._id , casting.users_selected)}/>
                </View>

            </View>
        )

    })


    // * ___________________________ PAGE ___________________________

    return (
        <ScrollView style={styles.scrollView}>

            <View style={styles.container}>

                <Text h4 style={{ marginTop: 25, marginBottom: 30 }}>Casting vous Correspondant</Text>

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
                    <Text>Afficher uniquement projet rémunéré ? </Text>
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

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
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