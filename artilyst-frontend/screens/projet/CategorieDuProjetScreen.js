import React, { useState } from 'react';



// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Button, Text, Divider } from '@rneui/base';


export default function CategorieDuProjetScreen(props) {


    return (
        <View style={styles.container}>

            <View><Text> Catégorie du projet </Text></View>


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


            </View>




            <View style={{ flexDirection: 'row', marginTop: 50 }}>

                <Button
                    buttonStyle={{ backgroundColor: '#000000', margin: 5 }}
                    title="retour"
                    onPress={() => props.navigation.navigate('PhotographCollaborateurScreen')}
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