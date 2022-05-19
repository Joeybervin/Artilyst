import React, { useState } from 'react';



// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
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
        <View style={styles.container}>

            <View><Text> Catégorie du projet </Text></View>


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