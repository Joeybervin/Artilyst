import React, {FC,useState} from 'react';

// ^ Wanings messages
import { LogBox, Button, Select,Dropdown } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
// import Dropdown from './components/Dropdown';

//^ Module de balise
import { StyleSheet, Text,  View,ScrollView} from 'react-native';
/* import { Text } from '@rneui/base'; */





export default function AnnoncesScreen(props) {

   

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    /* VARIABLES */
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */


    // * ___________________________ PAGE ___________________________
  
    return (
        <ScrollView style={styles.scrollView}>
        
        <View style={styles.container}>
        
            <Text>Casting vous Correspondant</Text>
            <Text>choisissez un type de projet</Text>

    

            
    
             <View dir="row" align="center" spacing={4}>

                <Button
                    buttonStyle={{ backgroundColor: '#1ADBAC' }}
                    title="Création Textil"
                    onPress={() => props.navigation.navigate('CreationAnnonceScreen')}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#16B88F' }}
                    title="Défilé"
                    onPress={() => props.navigation.navigate('CreationAnnonceScreen')}
                />
                <Button
                    buttonStyle={{ backgroundColor: '#109171' }}
                    title="Evènement/Vernissage"
                    onPress={() => props.navigation.navigate('CreationAnnonceScreen')}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#0B664F' }}
                    title="Court Métrage"
                    onPress={() => props.navigation.navigate('CreationAnnonceScreen')}
                />

                <Button

                    buttonStyle={{ backgroundColor: '#074233' }}
                    title="Long Métrage"
                    onPress={() => props.navigation.navigate('CreationAnnonceScreen')}
                />


                <Button

                    buttonStyle={{ backgroundColor: '#074233' }}
                    title="Série"
                    onPress={() => props.navigation.navigate('CreationAnnonceScreen')}
                />

                <Button

                    buttonStyle={{ backgroundColor: '#074233' }}
                    title="Spot Publicitaire "
                    onPress={() => props.navigation.navigate('CreationAnnonceScreen')}
                />

                <Button

                    buttonStyle={{ backgroundColor: '#074233' }}
                    title="Shooting"
                    onPress={() => props.navigation.navigate('CreationAnnonceScreen')}
                />

        <Button

        buttonStyle={{ backgroundColor: '#074233' }}
        title="Tous types"
        onPress={() => props.navigation.navigate('CreationAnnonceScreen')}
        />

            </View> 





<View  style={{ flexDirection: "row",  borderColor: 'black', borderWidth: 1, width: 300, height:100, marginTop: 50}}>
<View  style={{ borderColor: 'black', borderWidth: 1, width: 100, height:100}}>
    <Text>image</Text>
</View>
<View  style={{ borderColor: 'black', borderWidth: 1, width: 200, height:100}}>
    <Text> Titre annonce </Text>
    <Text> Résumé annonce : bla bla bla lorm ipsum  </Text>
    <Button   title="postuler" />
</View>
</View>

<View  style={{ flexDirection: "row",  borderColor: 'black', borderWidth: 1, width: 300, height:100, marginTop: 50}}>
<View  style={{ borderColor: 'black', borderWidth: 1, width: 100, height:100}}>
    <Text>image</Text>
</View>
<View  style={{ borderColor: 'black', borderWidth: 1, width: 200, height:100}}>
    <Text> Titre annonce </Text>
    <Text> Résumé annonce : bla bla bla lorm ipsum  </Text>
    <Button   title="postuler" />
</View>
</View>

<View  style={{ flexDirection: "row",  borderColor: 'black', borderWidth: 1, width: 300, height:100, marginTop: 50}}>
<View  style={{ borderColor: 'black', borderWidth: 1, width: 100, height:100}}>
    <Text>image</Text>
</View>
<View  style={{ borderColor: 'black', borderWidth: 1, width: 200, height:100}}>
    <Text> Titre annonce </Text>
    <Text> Résumé annonce : bla bla bla lorm ipsum  </Text>
    <Button   title="postuler" />
</View>
</View>








            {/* <View style={{ flexDirection: 'row', marginTop: 50 }}>

                <Button
                    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                    title="retour"
                    onPress={() => props.navigation.navigate('PhotographCollaborateurScreen')}
                />

            </View> */}
        
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
    }
});

// * ___________________________ REDUX ___________________________
