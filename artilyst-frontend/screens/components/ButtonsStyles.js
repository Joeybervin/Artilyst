import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';


// A COPIER :
// import { FullBtn, PostulerBtn, RecruterBtnn, RejeterBtn } from '../components/ButtonsStyles';

// FULL BUTTON ------------------------
export function FullBtn(props) {

    return (
        <View>
            <TouchableOpacity
                activeOpacity={.7}
                onPress={props.onPressHandler}
                style={styles.btn}
            >
                <Text style={styles.textBtn}>Text</Text>
            </TouchableOpacity>
        </View>
    );
}

// BORDERED BUTTON ------------------------
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
                    margin: 3
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
                    style={styles.EmptyButton} >
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
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    // GRADIENT BUTTON
    btn: {
        padding: 16,
        borderRadius: 16,
        margin: 14,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: '#232323',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    // BORDERED BUTTON
    EmptyButton: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
        margin: 0,
        backgroundColor: '#282828',
        justifyContent: 'center'
    },
    EmptyButtonLight: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
        margin: 0,
        backgroundColor: '#353535',
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

