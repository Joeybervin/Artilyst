import React, { useState } from 'react';

// ^ Wanings messages
import { LogBox, ScrollView} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */

import { Input, CheckBox , Button } from "@rneui/base";
import Slider from '@react-native-community/slider';



export default function PhotographCollaborateurScreen(props) {


    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [gender , setGender]=useState('');
    const [ville,setVille]=useState('');
    const [ageMin , setAgeMin ]=useState(0);
    const [ageMax , setAgeMax ]=useState(0);
    // const [ageMin, setAgeMin] = useState(0);
    // const [ageMax , setAgeMax] = useState(0);
    
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
        <ScrollView style={{backgroundColor: '#fff',}}>
    
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

       
            

        

            

          
                    <View style={{ alignItems: 'center' }} >
                        <Slider
                            animateTransitions
                            animationType="timing"
                            maximumTrackTintColor="#ccc"
                            maximumValue={100}
                            minimumTrackTintColor="#222"
                            minimumValue={18}
                            onSlidingComplete={() =>
                                console.log("onSlidingComplete()")
                            }
                            onSlidingStart={() =>
                                console.log("onSlidingStart()")
                            }
                            onValueChange={value => {
                                setAgeMin(value)
                                console.log("onValueChange()", value)
                            }
                            }
                            orientation="horizontal"
                            step={1}
                            style={{ width: "80%", height: 80 }}
                            thumbStyle={{ height: 20, width: 20 }}
                            thumbTintColor="#0c0"
                            thumbTouchSize={{ width: 40, height: 40 }}
                            trackStyle={{ height: 10, borderRadius: 20 }}
                            value={0}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text >Age Minimum : </Text>
                            <Text style={{ color: 'green' }}>
                                {ageMin} an
                            </Text>
                     
                        </View>
                        
                    </View>

                    <View style={{ alignItems: 'center' }} >
                        <Slider
                            animateTransitions
                            animationType="timing"
                            maximumTrackTintColor="#ccc"
                            maximumValue={100}
                            minimumTrackTintColor="#222"
                            minimumValue={18}
                            onSlidingComplete={() =>
                                console.log("onSlidingComplete()")
                            }
                            onSlidingStart={() =>
                                console.log("onSlidingStart()")
                            }
                            onValueChange={value => {
                                setAgeMax(value)
                                console.log("onValueChange()", value)
                            }
                            }
                            orientation="horizontal"
                            step={1}
                            style={{ width: "80%", height: 80 }}
                            thumbStyle={{ height: 20, width: 20 }}
                            thumbTintColor="#0c0"
                            thumbTouchSize={{ width: 40, height: 40 }}
                            trackStyle={{ height: 10, borderRadius: 20 }}
                            value={100}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text >Age Maximum : </Text>
                            <Text style={{ color: 'green' }}>
                                {ageMax } an
                            </Text>
                     
                        </View>
                        
                    </View>
           
          

           
          

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
