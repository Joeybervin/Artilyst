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

import { expoUrlBertin } from '../ExpoUrl';

import { connect } from 'react-redux';



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

    console.log(recruiterListProjects)

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    // Réception des casting filtrés pour l'utilisateur
    useEffect(() => {
        
        // * Recruiter case
        async function loadProjects() {
            var rawResponse = await fetch(`http://${expoUrlBertin}/recruiter_projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`,
            })
            let response = await rawResponse.json();
            setRecruiterListProjects(response)
        }

        // * Artiste case
        async function loadCasting() {
            var rawResponse = await fetch(`http://${expoUrlBertin}/search_casting`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}`,
            })
            let response = await rawResponse.json();
            setMatchingCasting(response.matchingProjects)
            console.log("reponse",response.matchingProjects)
        }

        if (props.user.occupation === "recruteur" ) loadProjects()
        if (props.user.occupation !== "recruteur" ) loadCasting();
    }, []);

    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________
//*********** envoyer les infos necessaires au match au backen  */
  
  const Postuler = async (id , users) =>{
        var rawResponse = await fetch(`http://${expoUrlBertin}/postuler`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token : props.user.token , projectId:id, userSelected:users }),
            
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

    const tableau = ["https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg","https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg","https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg","https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg","https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg","https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg","https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg","https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg"]

    const recruiterArtistsList = tableau.map((element, index) => {
        return(

            <View style={{ borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "center", borderColor: 'black', borderWidth: 0.5, width: "85%", height: 140, marginTop: 30 }}>

            <Image
                containerStyle={{ width: 110, height: 108, }}
                resizeMode="contain"
                source={{uri : element}}
                style={{ borderRadius: 10, marginRight: 10 }}
                PlaceholderContent="ff"
            />
        
            <View style={{ width: 200, height: 108 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 3 }}>Un jolie titre</Text>
                <Text style={{ marginBottom: 5 }}>Pleinde texte de description</Text>
                <Button
                    color='#1ADBAC'
                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                    title="recruter" onPress={()=>console.log('recruter')}/>
            </View>
        
            </View>

        )
    })

    


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

    {recruiterListProjects.length === 0 ? <Text>Créer votre premier projet</Text> : recruiterArtistsList  }



                </View>
            </ScrollView>

        )
    }
    else {
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