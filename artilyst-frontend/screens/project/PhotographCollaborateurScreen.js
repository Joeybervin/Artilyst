import React, { useState } from 'react';

// ^ Wanings messages
import { LogBox, Button, TextInput } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text, View, Slider } from 'react-native';
/* import { Text } from '@rneui/base'; */

import { Input, CheckBox, Icon } from "@rneui/themed";



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
    
    <View style={styles.container}>
            
    
           
        <View>
            <Text>Collaborateur du projet  </Text>
        </View>
        
        <View>
            <Text>Photographe </Text>
        </View>
        
         <Text>Genre</Text>
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
        
        <View>
            <Text> Ville</Text>

            <Input
                inputContainerStyle={styles.inputContainerStyle}
                placeholder='ville'
                onChangeText={setVille} value={ville}
            />

            {/* <TextInput
            style={styles.input}
            placeholder="ville"
            keyboardType="text"
            /> */}
            </View>
    
       
        <View> 
        
         <Text> Age min</Text>
         <Input
                inputContainerStyle={styles.inputContainerStyle}
                placeholder='Age'
                onChangeText={setAgeMin} value={ageMin}
            />

        <Text> Age max</Text>
         <Input
                inputContainerStyle={styles.inputContainerStyle}
                placeholder='Age'
                onChangeText={setAgeMax} value={ageMax}
            />
             
        </View>
     
       

            <View>
                <Text> Ville</Text>

                <TextInput
                    style={styles.input}

                    placeholder="ville"
                    keyboardType="text"
                />
            </View>

            <Text> Age</Text>
            <View>


                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="black"
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
