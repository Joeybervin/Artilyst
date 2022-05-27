import React, { useEffect, useState } from 'react';
import { expoUrlRaf } from '../../ExpoUrl';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/base';
// ^Redux
import { connect } from 'react-redux';


import Svg, { Path } from "react-native-svg"


// Styles
import { CreeUnCompteBtn, SeConnecterBtn } from '../components/ButtonsStyles';
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
                body: `token=i0-7QTBGTbbi81PmAZq_sh-e8C_qvPKT` // i0-7QTBGTbbi81PmAZq_sh-e8C_qvPKT
            })
            let response = await rawResponse.json();
            let responseCopy = { ...response }
            setUserData(responseCopy)
            

        }
        loadData();
    }, []);

    // * ___________________________ FUNCTIONS ___________________________

    /* Component pour afficher le logo */
    const SvgComponent = (props) => (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 323.4 533.2"
            width={70}
            height={70}
            style={{
                enableBackground: "new 0 0 323.4 533.2",

            }}
            xmlSpace="preserve"
            {...props}
        >
            <Path
                d="m216 417.2-135.2 116H0L102.3 0h113.3l107.8 533.2h-84.8l-22.6-116zM201.9 341l-43.7-238.7L115.6 341h86.3z"
                style={{
                    fill: "#000",
                }}
            />
        </Svg>
    )

    // * ___________________________ PAGE ___________________________

    return (
        <View style={styles.container}>



            <SvgComponent />
            <Text style={styles.title}>Bienvenue sur Artilyst.</Text>


            <SeConnecterBtn onPressHandler={() => {
                props.getUserInformations(userData)
                props.navigation.navigate('PagesStacks')
                //props.navigation.navigate('ConnectionFormScreen'
            }} />
            <CreeUnCompteBtn onPressHandler={() => props.navigation.navigate('RegisterFormScreen1')} />

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