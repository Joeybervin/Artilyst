import React, { useState, useEffect } from 'react';

//  Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true)
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

// framework
import { StyleSheet, Text, View, ScrollView } from 'react-native';
// librairies
import DatePicker from 'react-native-modern-datepicker';
import { Overlay, Button } from "@rneui/base";

// components
import * as Badges from '../components/BadgesComponent'
import * as Buttons from '../components/ButtonsComponent';

// style
import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';

export default function ProjectCreationStep1(props) {

    
    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */

    const [startDate, setDateDebut] = useState("JJ/MM/AAAA");
    const [endDate, setDateFin] = useState("JJ/MM/AAAA");

    const [collaborator, setCollaborator] = useState("")
    const [collaboratorSelected, setCollaboratorSelected] = useState(false) // vérifie si l'utilisateur à bien clické sur un bouton
    const [messageDateError, setMessageDateError] = useState("")

    const [ovelayDebutVisible, setOvelayDebutVisible] = useState(false);
    const [ovelayFinVisible, setOvelayFinVisible] = useState(false);

    /* VARIABLES */
    var validDate = true
    let domaines = ["comédien/ne","modèle", "photographe","styliste","réalisateur/ice vidéaste"]

    // * ___________________________ FUNCTIONS ___________________________

    const getTheDateFormat = (date) => {
        if (date === "JJ/MM/AAAA") {
            return "JJ/MM/AAAA"
        } else {
            let day, month, year;
            let today = date
            day = today.getDate();
            month = today.getMonth() + 1; // take care of the month's number here ⚠️
            year = today.getFullYear();

            if (day < 10) {
                day = '0' + day;
            }

            if (month < 10) {
                month = '0' + month;
            }
            return `${day}/${month}/${year}`

        }
    }

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* varification de la coherence des dates et affichage d'erreur */
    useEffect(() => {
        async function formVerifications() {

            if (startDate > endDate) {
                setMessageDateError("La date du début doit être anterieure à la date de fin")
                validDate = false
            }
            else if (startDate === "JJ/MM/AAAA" && endDate === "JJ/MM/AAAA") {
                setMessageDateError("")
                validDate = true
            } else if (startDate <= endDate) {
                setMessageDateError("")
                validDate = true
            }
            if (validDate === false || collaborator === "") {
                setCollaboratorSelected(false)
            } else if (validDate === true && collaborator !== "") {
                setCollaboratorSelected(true)
                setMessageDateError("")
            }

        } 
        formVerifications()
    }, [startDate, endDate, collaborator]);

    // fonction qui renvoie vers le bon formulaire + envoie la data dans les params
    const validFirstStep = () => {
        props.navigation.navigate(`ProjectCreationStep2`, { date_start: startDate, date_end: endDate, occupation: collaborator })
    }

    return (

        <ScrollView>
            <View style={styles.mainContainer}>

                {/* BARRE DE PROGRESSION */}
                <View style={{ marginTop: 40, borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50, width: "80%", height: 10 }}>
                    <View style={{ borderWidth: 0.5, borderColor: '#1ADBAC', borderRadius: 50, width: "33%", height: 10, backgroundColor: '#1ADBAC' }}></View>
                </View>

                {/* DATES */}
                <View style={{ marginTop: 30 }}>

                    <Text style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Dates</Text>

                    {/* Input : date de début */}
                    <View style={{ marginTop: 25, marginBottom: 25 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 15 }}>Date de début</Text>
                        <Button
                            type="outline"
                            title={startDate}
                            onPress={() => { setOvelayDebutVisible(true) }}
                            buttonStyle={{ borderColor: '#000000', width: '100%' }}
                            titleStyle={{ color: 'black' }}
                        />
                        {/* Overlay calendrier */}
                        <Overlay overlayStyle={{ width: "90%", justifyContent: "center", backgroundColor: "white" }} isVisible={ovelayDebutVisible} >
                            <DatePicker
                                mode="calendar"
                                style={{ width: "100%", borderRadius: 10 }}
                                options={{
                                    textHeaderColor: '#333333',
                                    textDefaultColor: '#000000',
                                    selectedTextColor: '#fff',
                                    mainColor: '#1ADBAC',
                                    textSecondaryColor: '#44A38B',
                                    borderColor: 'rgba(122, 146, 165, 0.1)',
                                }}
                                onSelectedChange={date => {
                                    let dateselected = getTheDateFormat(new Date(date))
                                    setDateDebut(dateselected)
                                }}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Button
                                    title="supprimer"
                                    buttonStyle={{ backgroundColor: '#000000', width: 150 }}
                                    onPress={() => {
                                        setDateDebut("JJ/MM/AAAA")
                                        setOvelayDebutVisible(false)
                                    }} />
                                <Button title="ok" buttonStyle={{ backgroundColor: '#1ADBAC', width: 150 }} onPress={() => setOvelayDebutVisible(false)} />
                            </View>
                        </Overlay>

                    </View>

                    {/* Input : date de fin */}
                    <View>
                        <Text style={{ fontWeight: 'bold', marginBottom: 15 }}>Date de fin</Text>
                        <Button type="outline" title={endDate} onPress={() => { setOvelayFinVisible(true) }}
                            buttonStyle={{ borderColor: '#000000', width: '100%' }}
                            titleStyle={{ color: 'black' }}
                        />
                        <Overlay overlayStyle={{ width: "90%", justifyContent: "center", backgroundColor: "white" }} isVisible={ovelayFinVisible} >
                            <DatePicker
                                mode="calendar"
                                style={{ width: "100%", borderRadius: 10 }}
                                options={{
                                    textHeaderColor: '#333333',
                                    textDefaultColor: '#000000',
                                    selectedTextColor: '#fff',
                                    mainColor: '#1ADBAC',
                                    textSecondaryColor: '#44A38B',
                                    borderColor: 'rgba(122, 146, 165, 0.1)',
                                }}
                                onSelectedChange={date => {
                                    let dateselected = getTheDateFormat(new Date(date))
                                    setDateFin(dateselected)
                                }}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Button
                                    title="supprimer"
                                    buttonStyle={{ backgroundColor: '#000000', width: 150 }}
                                    onPress={() => {
                                        setDateFin("JJ/MM/AAAA")
                                        setOvelayFinVisible(false)
                                    }} />
                                <Button title="ok"
                                    buttonStyle={{ backgroundColor: '#1ADBAC', width: 150 }}
                                    onPress={() => setOvelayFinVisible(false)} />
                            </View>

                        </Overlay>
                       
                    </View>

                </View>
                {/* message d'erreur pour les dates */}
                <Text>{messageDateError}</Text>

                {/* CHOIX COLLABORATEUR */}
                <View style={{ marginTop: 25, justifyContent: 'center' }} >
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Collaborateur du projet</Text>
                    <Text style={{ marginTop: 30, marginBottom: 5, fontWeight: 'bold', textAlign: 'center' }}>De qui avez vous besoin ?</Text>
                    <Text style={{ marginTop: 10, marginBottom: 15, textAlign: 'center' }}>{collaborator}</Text>

                    <View style={{flexDirection : "column", alignText : "center"}}>

                    <Badges.SmallBadgesPlus
                        data={domaines}
                        onPressHandler={(value) => {
                            setCollaborator(value)
                        }}
                    />
                    </View>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 50, marginBottom: 65, width : "90%"}}>

                    <Buttons.FullButton title='retour' 
                        buttonTextColor={'#ffffff'} buttonColor={'#000000'} 
                        onPressHandler={ () => props.navigation.goBack()}
                    />

                    <Buttons.FullButton title='suivant'
                        onPressHandler={() => validFirstStep()}
                        
                    />

                </View>

            </View>
        </ScrollView>
    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom : 100
    },

    input: {
        width: 100,
        height: 10,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputDate: {
        width: '20%',
        borderColor: '#cacaca',
        borderWidth: 1,
        marginBottom: 20,
    },
    smallCardsPressed: {
        alignItems: 'center',
        backgroundColor: '#668FFF',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0,
        width: "100%",
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        padding: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    smallCards: {
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0,
        width: "100%",
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        padding: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    cardTitlePressed : {
       
        ...cardTitle,
         color : "#fff",
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
