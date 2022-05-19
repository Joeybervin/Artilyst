import React, { useState, useEffect } from 'react';

// ^ Wanings messages
import { LogBox, ScrollView } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */

import DatePicker from 'react-native-modern-datepicker';
import { ProgressBar } from 'react-native-paper';


import { Overlay, Button } from "@rneui/base";

export default function CollaborateurDuProjetScreen(props) {

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



    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */

    const [dateDebut, setDateDebut] = useState("JJ/MM/AAAA");
    const [dateFin, setDateFin] = useState("JJ/MM/AAAA");

    const [userOccupation, setUserOccupation] = useState("")
    const [userOccupationClicked, setUserOccupationClicked] = useState(true) // vérifie si l'utilisateur à bien clické sur un bouton
    const [alerte, setAlerte] = useState("")




    const [ovelayDebutVisible, setOvelayDebutVisible] = useState(false);
    const [ovelayFinVisible, setOvelayFinVisible] = useState(false);

    /*********** Variable */

    var datevalide = true


    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /******* varification de la coherence des dates et affichage d'alerte */
    useEffect(() => {
        async function VerifData() {

            if (dateDebut > dateFin) {
                setAlerte("La date du début doit être anterieure à la date de fin")
                datevalide = false
            }
            else if (dateDebut == "JJ/MM/AAAA" && dateFin == "JJ/MM/AAAA") {
                setAlerte("")
                datevalide = true
            } else if (dateDebut <= dateFin) {
                setAlerte("")
                datevalide = true
            }
            if (datevalide == false || userOccupation == "") {
                setUserOccupationClicked(true)
            } else if (datevalide = true && userOccupation != "") {
                setUserOccupationClicked(false)
                setAlerte("")
            }

        } 12
        VerifData()
    }, [dateDebut, dateFin, userOccupation]);



    /* Pour ajouter le métier de l'utilisateur au données qui seront envoyées à la base de données  */
    const addUserOccupation = (userOccupation) => {
        setUserOccupation(userOccupation)
        // userInfos['occupation'] = userOccupation // Ajour=t du choix à l'objet qui sera transmis à la base de données
        //setUserOccupationClicked(false) // Rend le button "créer un compte" cliquable
    }

    // fonction qui renvoie vers le bon formulaire + envoie la data dans les params
    const validFirstStep = () => {

        var occupation = userOccupation;
        props.navigation.navigate(`${occupation}CollaborateurScreen`, { date_start: dateDebut, date_end: dateFin, occupation: userOccupation })
    }








    return (

        <ScrollView>
            <View style={styles.container}>

                {/* Progress bar */}
                <View style={{ marginTop: 40, borderWidth: 0.5, borderColor: '#000000', borderRadius: 50, width: "80%", height: 10 }}>
                    <View style={{ borderWidth: 0.5, borderColor: '#000000', borderRadius: 50, width: "33%", height: 10, backgroundColor: '#000000' }}></View>
                </View>



                {/* DATES */}
                <View style={{ marginTop: 30 }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Dates</Text>

                    <View style={{ marginTop: 25, marginBottom: 25 }}>
                        <Text>Date de début</Text>
                        <Button type="outline" title={dateDebut} onPress={() => { setOvelayDebutVisible(true) }}
                            buttonStyle={{ borderColor: '#000000', width: '100%' }}
                            titleStyle={{ color: 'black' }}
                        />
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

                                <Button title="supprimer" buttonStyle={{ backgroundColor: '#000000', width: 150 }} onPress={() => {
                                    setDateDebut("JJ/MM/AAAA")
                                    setOvelayDebutVisible(false)
                                }} />
                                <Button title="ok" buttonStyle={{ backgroundColor: '#1ADBAC', width: 150 }} onPress={() => setOvelayDebutVisible(false)} />

                            </View>

                        </Overlay>
                        {/*  <DateField
                    labelDate="JJ"
                    labelMonth="MM"
                    labelYear="AAAA"
                    styleInput={styles.inputDate}

                    onSubmit={(value) => setDateDebut(value)}
                /> */}

                    </View>

                    <View>
                        <Text>Date de fin</Text>
                        <Button type="outline" title={dateFin} onPress={() => { setOvelayFinVisible(true) }}
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

                                <Button title="supprimer" buttonStyle={{ backgroundColor: '#000000', width: 150 }} onPress={() => {
                                    setDateFin("JJ/MM/AAAA")
                                    setOvelayFinVisible(false)
                                }} />
                                <Button title="ok" buttonStyle={{ backgroundColor: '#1ADBAC', width: 150 }} onPress={() => setOvelayFinVisible(false)} />

                            </View>


                        </Overlay>
                        {/*  <DateField
                    labelDate="JJ"
                    labelMonth="MM"
                    labelYear="AAAA"
                    styleInput={styles.inputDate}

                    onSubmit={(value) => setDateFin(value)}
                />
                */}
                    </View>

                </View>

                <Text>{alerte}</Text>



                <View style={{ marginTop: 25 }} >

                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Collaborateur du projet  </Text>

                    <Text style={{ marginTop: 20, marginBottom: 10, marginLeft: "auto", marginRight: "auto" }}>De qui avez vous besoin ? </Text>


                    <View dir="row" align="center" spacing={4}>

                        <Button
                            buttonStyle={{ backgroundColor: '#1ADBAC' }}
                            title="Comedien.ne"
                        // onPress={() => addUserOccupation("Comedien")}
                        />

                        <Button
                            buttonStyle={{ backgroundColor: '#16B88F' }}
                            title="Modèle"
                        //onPress={() => addUserOccupation("Modele")}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: '#109171' }}
                            title="Photographe"
                            onPress={() => addUserOccupation("Photographe")}
                        />

                        <Button
                            buttonStyle={{ backgroundColor: '#0B664F' }}
                            title="Styliste"
                            onPress={() => addUserOccupation("Styliste")}
                        />

                        <Button

                            buttonStyle={{ backgroundColor: '#074233' }}
                            title="Réalisateur.ice vidéos"
                        //onPress={() => addUserOccupation("Realisateur")}
                        />



                    </View>
                </View>


                <View style={{ flexDirection: 'row', marginTop: 50 }}>

                    <Button
                        buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                        title="Retour"
                        onPress={() => props.navigation.navigate('CreerUnProjetScreen')}
                    />

                    <Button
                        buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                        title="Suivant"
                        onPress={() => validFirstStep()}
                        disabled={userOccupationClicked}
                    />

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




});



// * ___________________________ REDUX ___________________________
