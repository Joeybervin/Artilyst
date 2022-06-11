import React from 'react';
import Slider from '@react-native-community/slider';

// ^ Wanings messages
import { LogBox, Button, TextInput, ScrollView } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */

import { CheckBox } from "@rneui/themed";



export default function ModeleCollaborteurScreen(props) {




    // * ___________________________ PAGE ___________________________

    return (
        <ScrollView style={styles.scrollView}>
                <View style={styles.container}>



                    <View>
                        <Text>Collaborateur du projet  </Text>
                    </View>

                    <View>
                        <Text>Comedien.ne  </Text>
                    </View>

                    <View>
                        <Text> Ville</Text>

                        <TextInput
                            style={styles.input}

                            placeholder="ville"
                            keyboardType="text"
                        />
                    </View>

                    <Text>Genre</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Femme"
                    
                        />
                        <CheckBox
                            center
                            title="Homme"
                    
                        />
                        <CheckBox
                            center
                            title="Autres"
                        
                        />
                    </View>

                    <Text>Ethnie</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Afro"
                    
                        />
                        <CheckBox
                            center
                            title="Asiat.e"
                    
                        />
                        <CheckBox
                            center
                            title="Européen.ne"
                        
                        />

                        
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Hispanc"
                    
                        />
                        <CheckBox
                            center
                            title="Indie"
                    
                        />
                        <CheckBox
                            center
                            title="Oriental.e"
                        
                        />

                        
                    </View>


                    <Text>Cheveux</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Blond"
                    
                        />
                        <CheckBox
                            center
                            title="Brun"
                    
                        />
                        <CheckBox
                            center
                            title="Noir"
                        
                    
                        
                        />
                    
                        
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Blanc"
                    
                        />
                        <CheckBox
                            center
                            title="Chatain"
                    
                        />
                        <CheckBox
                            center
                            title="Roux"
                        
                        />
                    
                    
                        
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Gris"
                    
                        />
                        <CheckBox
                            center
                            title="Couleur"
                        
                        />
                    
                            
                    </View>


                    <Text>Yeux</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Bleu"
                    
                        />
                        <CheckBox
                            center
                            title="noir"
                    
                        />
                        <CheckBox
                            center
                            title="Marron"
                        
                    
                        
                        />
                    
                        
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Vert"
                    
                        />
                        <CheckBox
                            center
                            title="Gris"
                    
                        />
                        <CheckBox
                            center
                            title="vairon"
                        
                        />
                    
                    
                        
                    </View>

                    <Text>Tatouage</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Oui"
                    
                        />
                        <CheckBox
                            center
                            title="Non"
                        
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

                    <Text> Taille</Text>
                    <View>


                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="black"
                            maximumTrackTintColor="black"
                        />
                    
                    </View>

                    <Text> Poids</Text>
                    <View>


                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="black"
                            maximumTrackTintColor="black"
                        />
                    
                    </View>

                    <Text> Pointure</Text>
                    <View>


                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="black"
                            maximumTrackTintColor="black"
                        />
                    
                    </View>

                    <Text>Corpulence</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="maigre"
                    
                        />
                        <CheckBox
                            center
                            title="fin"
                        
                        />

                        <CheckBox
                            center
                            title="Moyen"
                        
                        />
                    
                            
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Athlétique"
                    
                        />
                        <CheckBox
                            center
                            title="musclé"
                        
                        />

                        <CheckBox
                            center
                            title="Bodybuildé"
                        
                        />
                    
                            
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>


                        <CheckBox
                            center
                            title="Curvy"
                    
                        />
                        <CheckBox
                            center
                            title="Enrobé"
                        
                        />

                        
                        
                    </View>

            
                    
                    <Text>Mensuration</Text>
                    <View style={{ flexDirection: 'row', width:300, }}>


                    <TextInput
                        style={styles.input}
                        placeholder="poitrine" 
                    
                    />   

                    <TextInput
                        style={styles.input}
                        placeholder="taille" 
                    />  
                    <TextInput
                        style={styles.input}
                        placeholder="Hanche" 
                    />  

                        
                    
                            
                    </View>

                    

                    <View style={{ flexDirection: 'row', marginTop: 50,  justifyContent: 'center', }}>

                        <Button
                            buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                            title="retour"
                            onPress={() => props.navigation.navigate('ProjectCreationStep1')}
                        />

                        <Button
                            buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                            title="valider"
                            onPress={() => props.navigation.navigate('CategorieDuProjetScreen')}
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
        width: 50,
        height: 40,
        // margin: 12,
        borderWidth: 1,
        
    },

    
    // scrollView: {
   
    //   marginHorizontal:250
    // },



});

