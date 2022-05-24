import React from 'react';

// ^ Wanings messages
import { LogBox, Button, ScrollView } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */

export default function ArtisteCorrespondantScreen(props) {

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

                <Text>Artiste Correspondant à votre recherche </Text>

                <View style={{ flexDirection: 'row', marginTop: 50, width: 300, height: 200 }} >
                    <View style={{ borderColor: 'black', borderWidth: 1, width: 140, height: 200, }} >
                        <View style={{  borderWidth: 1, width: 140, height: 120, }}  >
                        <Text>image profil</Text>
                        </View>
                        <Text>Nom</Text>
                        <Text>Domaine </Text>
                        <Button style={{ width: 20, height: 20 }} title="recruter  " />
                    </View>

                    <View style={{ borderColor: 'black', borderWidth: 1, width: 140, height: 200, marginLeft: 18 }} >
                    <View style={{  borderWidth: 1, width: 140, height: 120, }}  >
                        <Text>image profil</Text>
                        </View>
                        <Text>Nom</Text>
                        <Text>Domaine </Text>
                        <Button style={{ width: 20, height: 20 }} title="recruter  " />
                    </View>


                </View>


                <View style={{flexDirection: 'row', marginTop: 50, width: 300,height: 200}} >
                <View style={{ borderColor: 'black', borderWidth: 1, width: 140, height: 200, }} >
                        <View style={{  borderWidth: 1, width: 140, height: 120, }}  >
                        <Text>image profil</Text>
                        </View>
                        <Text>Nom</Text>
                        <Text>Domaine </Text>
                        <Button style={{ width: 20, height: 20 }} title="recruter  " />
                    </View>

                    <View style={{ borderColor: 'black', borderWidth: 1, width: 140, height: 200, marginLeft: 18 }} >
                    <View style={{  borderWidth: 1, width: 140, height: 120, }}  >
                        <Text>image profil</Text>
                        </View>
                        <Text>Nom</Text>
                        <Text>Domaine </Text>
                        <Button style={{ width: 20, height: 20 }} title="recruter  " />
                    </View>
                </View>

                <View style={{flexDirection: 'row', marginTop: 50, width: 300,height: 200}} >
                <View style={{ borderColor: 'black', borderWidth: 1, width: 140, height: 200, }} >
                        <View style={{  borderWidth: 1, width: 140, height: 120, }}  >
                        <Text>image profil</Text>
                        </View>
                        <Text>Nom</Text>
                        <Text>Domaine </Text>
                        <Button style={{ width: 20, height: 20 }} title="recruter  " />
                    </View>

                    <View style={{ borderColor: 'black', borderWidth: 1, width: 140, height: 200, marginLeft: 18 }} >
                    <View style={{  borderWidth: 1, width: 140, height: 120, }}  >
                        <Text>image profil</Text>
                        </View>
                        <Text>Nom</Text>
                        <Text>Domaine </Text>
                        <Button style={{ width: 20, height: 20 }} title="recruter  " />
                    </View>
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
