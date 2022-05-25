import React, {useState} from 'react';

// ^ Wanings messages
import { LogBox , ScrollView } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text,  View } from 'react-native';
import { CheckBox, Button } from "@rneui/base";

export default function CreationProjectScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [createProjetDictatel, setCreateProjetDictatel] = useState(false) // Boolean : récupère si l'utilisateur souhaite revoir le message, à stocker dans localStorage
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

        <View style={{width : "90%",}}>

            <Text  style={{marginBottom : 30, marginLeft : "auto", marginRight : "auto", fontSize: 30}}>ARTILYST</Text>

            <Text style={{marginBottom : 30, marginLeft : "auto", marginRight : "auto"}}>Cher(e) Artiste, ici vous allez pouvoir créer des ANNONCES pour vos projets</Text>

            <Text style={{marginBottom : 15, marginLeft : "auto", marginRight : "auto"}}>Pourquoi créer un projet? </Text>

            <Text style={{marginBottom : 15, marginLeft : "auto", marginRight : "auto"}}t>Avec la création d'un PROJET</Text>

        
            <Text style={{marginBottom : 15, marginLeft : "auto", marginRight : "auto"}}>Vous pourrez chercher, les PROFILS des artistes qui correspondent à vos critères, et les recruter.</Text>

            <Text style={{marginBottom : 15, marginLeft : "auto", marginRight : "auto"}}>Ce projet apparaitra dans les annonces, des artistes concernés, ils pourront ainsi postuler</Text>
           
        </View>
        
        <View style={{flexDirection : 'row', alignItems : 'center', width : "90%", borderColor: 'black', borderWidth: 0.5, borderRadius : 5, justifyContent : 'space-between'}}>

        <View style={{flexDirection : 'row', alignItems : 'center'}}> 
        <CheckBox
            center
            checkedColor ='black'
            onPress={() => { setCreateProjetDictatel(createProjetDictatel === true ? false : true) }}
            checked={createProjetDictatel === false ? false : true}
        />
        <Text>Ne plus afficher</Text>
        </View>


        <Button  
                title="FERMER"
                color='#1ADBAC'
                containerStyle={{ marginRight : 15, backgroundcolor : '#1ADBAC' , width : 125}}
                onPress={() => props.navigation.navigate('CreerUnProjetScreen')}
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
    }
});

// * ___________________________ REDUX ___________________________
