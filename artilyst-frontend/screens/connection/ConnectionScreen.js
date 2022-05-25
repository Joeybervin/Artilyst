import React, { useEffect, useState } from 'react';
import { expoUrlRaf } from '../../ExpoUrl';

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
import { CreeUnCompteBtn, FullBtn, PostulerBtn, RecruterBtn, SeConnecterBtn } from '../components/ButtonsStyles';
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
            const rawResponse = await fetch(`http://${expoUrlRaf}/user_profile`, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `token=KWXlcU4sPT_mj9eDlkaawYfPyX1-okID` // i0-7QTBGTbbi81PmAZq_sh-e8C_qvPKT
            })
            let response = await rawResponse.json();
            let responseCopy = { ...response }
            setUserData(responseCopy)
            console.log('logloglog', response)

        }
        loadData();
    }, []);

    // * ___________________________ PAGE ___________________________

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Bienvenue sur Artilyst.</Text>

            <SeConnecterBtn onPressHandler={() => props.navigation.navigate('ConnectionFormScreen')} />
            <CreeUnCompteBtn onPressHandler={() => props.navigation.navigate('RegisterFormScreen1')} />

            {/* <Button
                title="Se connecter"
                onPress={() => props.navigation.navigate('ConnectionFormScreen')}
                containerStyle={{ margin: 5 }}
            />
            <Button
                title="Créer un compte"
                onPress={() => props.navigation.navigate('RegisterFormScreen1')}
                containerStyle={{ margin: 5 }}
            /> */}

            <Text style={{marginTop: 70}} onPress={() => {
                props.getUserInformations(userData)
                console.log(userData)
                props.navigation.navigate('PagesStacks')
            }}>--</Text>



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
    pageBackground: {
        ...pageBackground
    },
    title: {
        ...title
    },
    subTitle: {
        ...subTitle
    },
    textRegular: {
        ...textRegular
    },
    cardTitle: {
        ...cardTitle
    },
    cardText: {
        ...cardText
    }


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