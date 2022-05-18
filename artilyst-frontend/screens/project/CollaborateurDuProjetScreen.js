import React , { useState , useEffect }  from 'react';

// ^ Wanings messages
import { LogBox, Button, TextInput } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, Text,  View } from 'react-native';
/* import { Text } from '@rneui/base'; */

import DateField from 'react-native-datefield';

export default function CollaborateurDuProjetScreen(props) {

     /* VARIABLES D'ÉTAT  */
     const [dateDebut, setDateDebut] = useState("");
     const [dateFin, setDateFin] = useState("");
     const [userOccupation, setUserOccupation] = useState("")
     const [userOccupationClicked, setUserOccupationClicked]  = useState(true) // vérifie si l'utilisateur à bien clické sur un bouton
     const [alerte, setAlerte] = useState("")
     /*********** Variable */
     
    
     var datevalide = true
     
     /* Pour ajouter le métier de l'utilisateur au données qui seront envoyées à la base de données  */
    const addUserOccupation = (userOccupation) => {
        setUserOccupation(userOccupation)
       // userInfos['occupation'] = userOccupation // Ajour=t du choix à l'objet qui sera transmis à la base de données
        //setUserOccupationClicked(false) // Rend le button "créer un compte" cliquable
    }
     

    /******* varification de la coherence des dates et affichage d'alerte */
    useEffect(() => {
        async function VerifData() {

            if (dateDebut>dateFin){
                setAlerte("La date du début doit être anterieure à la date de fin")
                datevalide = false
            }
            else if (dateDebut=="" && dateFin==""){
                setAlerte("")
                datevalide = true
            } else if (dateDebut<=dateFin) {
                setAlerte("")
                datevalide = true
            }
            if (datevalide==false || userOccupation==""){
                setUserOccupationClicked(true)
            } else if(datevalide = true && userOccupation!="") {
                setUserOccupationClicked(false)
                setAlerte("")
            }    
               
        }12
        VerifData()
      }, [dateDebut,dateFin,userOccupation]);

        console.log(dateDebut)
    
    // fonction qui renvoie vers le bon formulaire + envoie la data dans les params
    const validFirstStep=()=> {

        var occupation = userOccupation;
    props.navigation.navigate(`${occupation}CollaborateurScreen` , {date_start: dateDebut , date_end : dateFin , occupation :userOccupation})
    }


    
    return (

        <View style={styles.container}>

<View style={{marginTop: 50 }}>


            <Text>Date de début</Text>
            <DateField
                labelDate="JJ"
                labelMonth="MM"
                labelYear="AAAA"
                styleInput={styles.inputDate}
                
                onSubmit={(value) => setDateDebut(value)}
            />

            <Text>Date de fin</Text>
            <DateField
                labelDate="JJ"
                labelMonth="MM"
                labelYear="AAAA"
                styleInput={styles.inputDate}
                
                onSubmit={(value) => setDateFin(value)}
            />

</View>

<Text>{alerte}</Text>
            
             
    
<View style={{ marginTop:20 }}><Text>Collaborateur du projet  </Text></View>
        <View style={{ marginTop:20 }}><Text>De qui avez vous besoin  </Text></View>


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
        width:100,
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
