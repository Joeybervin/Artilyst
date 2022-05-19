import React, { useState } from 'react';

// ^ Wanings messages
import { LogBox, Button, TextInput , ScrollView} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */

import { Input, CheckBox, Icon } from "@rneui/base";
import {Slider} from '@miblanchard/react-native-slider';


export default function PhotographCollaborateurScreen(props) {


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [gender , setGender]=useState('');
    const [ville,setVille]=useState('');
    const [ageMin , setAgeMin ]=useState('');
    const [ageMax , setAgeMax ]=useState('');
    /* VARIABLES */
    var Gender = gender;
    var ParamsProject1 = props.route.params;
    console.log('params1',ParamsProject1)

    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________
      ParamsProject1['gender']=Gender;
      ParamsProject1['location']=ville;
      ParamsProject1['ageMin']=ageMin;
      ParamsProject1['ageMax']=ageMax;
      const validSecondStep = () =>  {
        props.navigation.navigate('CategorieDuProjetScreen', ParamsProject1)
        
    }
      

    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */


    // * ___________________________ PAGE ___________________________
    
    return ( 
        <ScrollView style={{backgroundColor: '#fff'}}>
    
    <View style={styles.container}>
            
        {/* Progress bar */}
        <View style={{ marginTop : 40, borderWidth: 0.5, borderColor: '#000000', borderRadius: 50, width: "80%", height: 10 }}>
            <View style={{ borderWidth: 0.5, borderColor: '#000000', borderRadius: 50, width: "66%", height: 10, backgroundColor: '#000000' }}></View>
        </View>

    
           
        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom : 15 }}>
            <Text style={{fontWeight : 'bold'}}>Collaborateur du projet : </Text>
            <Text>Photographe</Text> 
        </View>
        
        {/* Choix du genre */}
        <View style={{marginTop : 20, marginBottom : 10}}>
            <Text style={{marginRight : "auto", marginBottom : 10}}>Genre</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
           
                   
            <CheckBox
                        center
                        title="Femme"
                        onPress={() => setGender( gender =="Femme"? "" :"Femme")}
                        checked={Gender == "Femme"? true : false}
                    />
            <CheckBox
                        center
                        title="Homme"
                        onPress={() => setGender(gender=="Homme"? "" :"Homme")}
                        checked={Gender == "Homme"? true : false}
                    />
            <CheckBox
                        center
                        title="Autres"
                        onPress={() => setGender(gender=="Autres"? "" :"Autres")}
                        checked={Gender == "Autres"? true : false}
                    />
        </View>
        </View>
         
        
        <View style={{width: '80%', marginTop : 20, marginRight : 25 }}>
           
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Ville</Text>
            <Input
                
                onChangeText={setVille} value={ville}
                //errorMessage={emailError}
            />
        </View>

        <View style={{width: '92%', flexDirection: 'row', alignItems: 'center' }}>
        <Text>Age min</Text>
            <Input
                onChangeText={setAgeMin} value={ageMin}
                //errorMessage={emailError}
            />
        </View>

        <View style={{ width: '92%',flexDirection: 'row', alignItems: 'center' }}>

        <Text>Age max</Text>
            <Input
                onChangeText={setAgeMax} value={ageMax}
                //errorMessage={emailError}
            />
        </View>
            

        </View>

            <View>
    
            </View>

            <Text> Age</Text>
            <View>


                <Slider
                style={{ width: 400, height: 40 }}
                    animateTransitions
                    maximumTrackTintColor="#d3d3d3"
                    maximumValue={20}
                    minimumTrackTintColor="#1fb28a"
                    minimumValue={4}
                    step={2}
                    thumbTintColor="#1a9274"
                />
      


                <Slider
                    
                    minimumValue={0}
                    maximumValue={120}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="black"
                    trackClickable={true}
                />

            </View>



            <View style={{ flexDirection: 'row', marginTop: 50 }}>

                <Button
                    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                    title="retour"
                    onPress={() => props.navigation.navigate('CollaborateurDuProjetScreen')}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                    title="suivant"
                    onPress={() =>  validSecondStep()}
                />



            </View>

        </View>



        </ScrollView>



    )
};

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    inputContainerStyle: {
        width: 200,
        height: 10,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
    }
    
});



// * ___________________________ REDUX ___________________________
