import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';


// A COPIER :
// import { FullBtn, PostulerBtn, RecruterBtnn, RejeterBtn } from '../components/ButtonsComponent';

// FULL BUTTON ------------------------

export function FullButton(props) {

    return (
        <View>
            <TouchableOpacity
                // disabled={props.disabled === true ? true : props.disabled}
                activeOpacity={.7}
                onPress={props.onPressHandler}
                style={{...styles.btn,  backgroundColor : props.buttonColor ? props.buttonColor : styles.btnDefaultColor }}
            >
                <Text style={{...styles.textBtn, color : props.buttonTextColor ? props.buttonTextColor : styles.btnTextDefaultColor}}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}




// BORDERED BUTTON ------------------------


export function BigOutlineButtonLieanerGradient(props) {

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
                    <Text style={styles.textBtn}>{props.title}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

export function SmallOutlineButtonLieanerGradient(props) {

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 38, width: 139,
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
                    <Text style={styles.textBtn}>{props.title}</Text>
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
                    height: 38, width: 139,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 1,
                    // margin: 3
                }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={props.onPressHandler}
                    style={styles.EmptyButton}
                >
                    <Text style={styles.textBtn}>{props.title}</Text>
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
                    height: 38, width: 137,
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
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal : 8
    },
    textBlack : {
        color: '#000000',
    },
    textWhite : {
        color: '#ffffff',
    },
    // FULL BUTTON
    btn: {
        padding: 16,
        borderRadius: 16,
        margin: 14,
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
    btnDefaultColor : '#1ADBAC',
    btnTextDefaultColor : '#000000',
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

