import React, { useState } from 'react';



// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Divider } from '@rneui/base';


export default function CategorieDuProjetScreen(props) {

    //****************variable d'etat **************/
    const [category, setCategory]=useState('')

    //*********** Récuperation des params de l'ecran précédent ************/
    var ParamsProject2=props.route.params;
    console.log('params2',ParamsProject2)

    //*****************Functions**********************/
    ParamsProject2['category']=category;
  const addCategory =(catego) => {
      setCategory(catego)
      props.navigation.navigate('CreationAnnonceScreen', ParamsProject2)
  }



    return (
        <ScrollView style={{backgroundColor: '#fff',}}>
    
        <View style={styles.container}>
                
            {/* Progress bar */}
            <View style={{ marginTop : 40, marginBottom : 40, borderWidth: 0.5, borderColor: '#000000', borderRadius: 50, width: "80%", height: 10 }}>
                <View style={{ borderWidth: 0.5, borderColor: '#000000', borderRadius: 50, width: "98%", height: 10, backgroundColor: '#000000' }}></View>
            </View>
    
            <Text style={{marginBottom : 50, fontWeight: 'bold', fontSize : 20}}> Catégorie du projet </Text>


            <View dir="row" align="center" spacing={4}>

                <Button
                    buttonStyle={{ backgroundColor: '#1ADBAC' }}
                    title="Création Textile"
                    onPress={() => addCategory("Création Textile")}
                
                />

                <Button
                    buttonStyle={{ backgroundColor: '#16B88F' }}
                    title="Défilé"
                    onPress={() => addCategory("Défilé")}
                />
                <Button
                    buttonStyle={{ backgroundColor: '#109171' }}
                    title="Evènement/Vernissage"
                    onPress={() => addCategory("Evènement/Vernissage")}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#0B664F' }}
                    title="Court Métrage"
                    onPress={() => addCategory("Court Métrage")}
                />

                <Button

                    buttonStyle={{ backgroundColor: '#074233' }}
                    title="Long Métrage"
                    onPress={() => addCategory("Long Métrage")}
                />

                <Button
                
                buttonStyle={{ backgroundColor: '#074233' }}
                title="Série"
                onPress={() => addCategory("Série")}
            />

                <Button
                
                buttonStyle={{ backgroundColor: '#074233' }}
                title="Spot Publicitaire "
                onPress={() => addCategory("Spot Publicitaire ")}
            />

            <Button
                
                buttonStyle={{ backgroundColor: '#074233' }}
                title="Shooting"
                onPress={() => addCategory("Shooting")}
            />


            </View>




            <View style={{ flexDirection: 'row', marginTop: 50 }}>

                <Button
                    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                    title="retour"
                    onPress={() => props.navigation.navigate('PhotographeCollaborateurScreen')}
                />

                <Button
                    buttonStyle={{ backgroundColor: '#3268DD', margin: 5 }}
                    title="Créer mon projet"
                    onPress={() =>  console.log("projet créer")}
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