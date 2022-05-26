import React, { useEffect, useState } from 'react';
import { expoUrlJoey } from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@rneui/base';

// ^Redux
import { connect } from 'react-redux';
import { log } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Styles
import { FullBtn, PostulerBtn, RecruterBtn } from '../components/ButtonsStyles';
import { pageBackground, subTitle, textRegular, title, cardTitle, cardText } from '../components/GlobalStyles';

function ConnectionScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    const [userData, setUserData] = useState({})
    /* VARIABLES */
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    useEffect(() => {
        async function loadData() {
            const rawResponse = await fetch(`http://${expoUrlJoey}/user_profile`, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `token=i0-7QTBGTbbi81PmAZq_sh-e8C_qvPKT` // KWXlcU4sPT_mj9eDlkaawYfPyX1-okID
            })
            let response = await rawResponse.json();
            let responseCopy = { ...response }
            setUserData(responseCopy)
            console.log('logloglog', response)

        }
        loadData();
    }, []);

    console.log("ffukufulyglgiugu")

    // * ___________________________ PAGE ___________________________

    return (
        <View style={styles.pageBackground}>


            <Text style={styles.title}>Test de titre !</Text>
            <Text style={styles.subTitle}>Test de sous-titre</Text>
            <Text style={styles.textRegular}>Test de texteTest de texteTest de texteTest de texteTest de texte</Text>


            <Text onPress={() => {
                props.getUserInformations(userData)
                console.log(userData)
                props.navigation.navigate('PagesStacks')
            }}>ConnectionScreen</Text>

            <Button
                title="Se connecter"
                onPress={() => props.navigation.navigate('ConnectionFormScreen')}
                containerStyle={{ margin: 5 }}
            />

            <Button
                title="Créer un compte"
                onPress={() => props.navigation.navigate('RegisterFormScreen1')}
                containerStyle={{ margin: 5 }}
            />

            

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

    // -- GLOBAL STYLE ----------
   



});

// * ___________________________ REDUX ___________________________
function mapDispatchToProps(dispatch) {
    return {
        getUserInformations: function (user) {
            dispatch({ type: 'userConnection', user })

        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ConnectionScreen);