import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';


// A COPIER :
// import { FullBtn, PostulerBtn, RecruterBtnn, RejeterBtn } from '../components/ButtonsStyles';

// FULL BUTTON ------------------------
export function PortfolioBtn(props) {

    const [isPressed, setIsPressed] = useState(false)

    return (
        <View>
            <TouchableOpacity
                activeOpacity={.7}
                onPress={props.onPressHandler}
                style={styles.btn}
            >
                <Text style={styles.textBtn}>Portfolio</Text>
            </TouchableOpacity>
        </View>
    );
}

export function ModifierProfilBtn(props) {

    return (
        <View>
            <TouchableOpacity
                activeOpacity={.7}
                onPress={props.onPressHandler}
                style={styles.btn}
            >
                <Text style={styles.textBtn}>Modifier mon profil</Text>
            </TouchableOpacity>
        </View>
    );
}

// export function ConnexionBtn(props) {

//     return (
//         <View>
//             <TouchableOpacity
//                 activeOpacity={.7}
//                 onPress={props.onPressHandler}
//                 style={{
//                     padding: 16,
//                     borderRadius: 16,
//                     backgroundColor: '#1ADBAC',
//                     borderRadius: 16,
//                     shadowColor: 'black',
//                     shadowOffset: { width: 2, height: 2 },
//                     shadowOpacity: 0.2, shadowRadius: 2
//                 }}
//             >
//                 <Text style={styles.textBtn}>Connexion</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

export function SinscrireBtn(props) {

    return (
        <View>
            <TouchableOpacity
                activeOpacity={.7}
                onPress={props.onPressHandler}
                style={styles.btn}
            >
                <Text style={styles.textBtn}>Modifier mon profil</Text>
            </TouchableOpacity>
        </View>
    );
}

export function SuivantBtn(props) {

    return (
        <View>
            <TouchableOpacity
                activeOpacity={.7}
                onPress={props.onPressHandler}
                style={styles.btn}
            >
                <Text style={styles.textBtn}>Suivant</Text>
            </TouchableOpacity>
        </View>
    );
}


// BORDERED BUTTON ------------------------

export function CreeUnCompteBtn(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 42, width: 250,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    margin: 7

                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButton}
                >
                    <Text style={styles.textBtn}>Créer un compte</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function SeConnecterBtn(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 42, width: 250,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    margin: 7

                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButton}
                >
                    <Text style={styles.textBtn}>Se connecter</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function EnvoyerUnMessageBtn(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 42, width: 250,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    margin: 7

                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButton}
                >
                    <Text style={styles.textBtn}>Envoyer un message</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function ContinuerLaRechercheBtn(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 42, width: 250,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    margin: 7

                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButton}
                >
                    <Text style={styles.textBtn}>Continuer la recherche</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function ConnexionBtn(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 42, width: 200,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    margin: 10

                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButton}
                >
                    <Text style={styles.textBtn}>Connexion</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function PostulerBtn(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 38, width: 135,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,

                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButton}
                >
                    <Text style={styles.textBtn}>Postuler</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function PostulerBtnLight(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 38, width: 135,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    margin: 3
                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButtonLight}
                >
                    <Text style={styles.textBtn}>Postuler</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function RecruterBtn(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 38, width: 135,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    margin: 3
                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButtonLight} >
                    <Text style={styles.textBtn}>Recruter</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function RejeterBtn(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 38, width: 135,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    margin: 3
                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButton}
                >
                    <Text style={styles.textBtn}>Rejeter</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function LancerRechercheBtn(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 38, width: 250,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    marginBottom: 15
                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButton}
                >
                    <Text style={styles.textBtn}>Lancer la recherche</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

// BOUTON NEOMORPH ------------------
export function NeomorphBtn(props) {

    const navigation = useNavigation()

    const [isDown, setIsDown] = useState(false);

    const handlePressIn = useCallback(() => {
        setIsDown(true)
    }, [setIsDown])

    const handlePressOut = useCallback(() => {
        setIsDown(false)
    }, [setIsDown])

    const gradColors = isDown ? ['#222', '#444'] : ['#444', '#222'];

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={props.onPressHandler}
        >
            <View style={styles.btnOut}>
                <View style={styles.btnIn}>
                    <LinearGradient
                        colors={gradColors}
                        start={[0.4, 0.4]}
                        style={styles.linear}>
                        <Text style={styles.textBtn}>Text</Text>
                    </LinearGradient>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

// FEUILLES DE STYLES

const styles = StyleSheet.create({
    // TEXTES
    textBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal : 8
    },
    // FULL BUTTON
    btn: {
        padding: 16,
        borderRadius: 16,
        margin: 14,
        backgroundColor: '#1ADBAC',
        borderRadius: 16,
        shadowColor: 'black',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
            },
    // BORDERED BUTTON
    EmptyButton: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
        margin: 0,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    EmptyButtonLight: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
        margin: 0,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center'
    },
    // NEOMORPH BUTTON
    btnOut: {
        margin: 14,
        borderRadius: 16,
        shadowColor: '#333333',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    btnIn: {
        margin: 14,
        backgroundColor: '#333333',
        borderRadius: 16,
        shadowColor: '#333333',
        shadowOffset: { width: -7, height: -7 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
    },
    linear: {
        padding: 16,
        borderRadius: 16,
    }
});

