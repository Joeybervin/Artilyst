import React, {useState} from 'react';

// ^ Wanings messages
import { LogBox  } from 'react-native';
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
        <View style={styles.container}>

        <View style={{width : "90%",}}>

            <Text  style={{marginBottom : 30, marginLeft : "auto", marginRight : "auto", fontSize: 30}}>ARTILYST</Text>

            <Text style={{marginBottom : 30}}>Cher(e) Artiste, ici vous allez pouvoir créer des ANNONCES pour vos projets</Text>

            <Text style={{marginBottom : 15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis magna sem, nec lobortis orci vestibulum id. Donec consectetur sagittis ex, non dictum ex convallis in. Donec eu faucibus est. Maecenas vitae eros ac dui aliquam sollicitudin et vitae lacus. Ut rutrum turpis a libero eleifend mattis. Integer luctus mi vel neque dapibus, id tincidunt ligula dictum. Quisque gravida auctor risus, et viverra quam cursus sed. Cras vitae laoreet lorem, iaculis sodales magna. Morbi justo metus, fermentum quis laoreet quis, molestie non ligula.</Text>

            <Text style={{marginBottom : 15}}t>Etiam lobortis mi elit, in faucibus lectus mattis ut. Praesent a semper arcu. Proin risus orci, vestibulum eget eleifend nec, ullamcorper varius est. Nulla ut purus feugiat, finibus enim in, maximus sapien. S</Text>

        
            <Text style={{marginBottom : 15}}>Praesent sem ligula, gravida vel blandit quis, euismod sit amet mi. Donec vel sodales nibh. Curabitur ut tincidunt arcu, non elementum nibh. Maecenas mollis, nibh at elementum condimentum, mauris turpis imperdiet tortor, ut sodales urna lacus quis nisi. Sed rutrum nisi vel magna vestibulum volutpat.</Text>
           
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
