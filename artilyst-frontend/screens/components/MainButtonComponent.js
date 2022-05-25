import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';

// BOUTON 1 ------------------------
export function PlainButton() {
    
    // const navigation = useNavigation()

    return (
        <View>
            <TouchableOpacity activeOpacity={.7}>
                <LinearGradient
                    colors={['#36e599', '#597ee7', '#b44be0']}
                    end={[1, 0.5]}
                    style={styles.btn}>
                    <Text style={styles.textBtn}>Text</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}

// BOUTON VIDE ------------------------
export function EmptyButton() {

    // const navigation = useNavigation()

    return (
        <View>
            <LinearGradient
                colors={['#36e599', '#597ee7', '#b44be0']}
                end={[1, 0.5]}
                style={{
                    height: 38, width: 150,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 2
                }}>
                <TouchableOpacity activeOpacity={.7}
                    style={styles.EmptyButton} >
                    <Text style={styles.textBtn}>Text</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

// BOUTON NEOMORPH ------------------
export function NeomButton() {

    const navigation = useNavigation()

    const [isDown, setIsDown] = useState(false);

    const handlePressIn = useCallback(() => {
        setIsDown(true)
    }, [setIsDown])

    const handlePressOut = useCallback(() => {
        setIsDown(false)
    }, [setIsDown])

    const gradColors = isDown ? ['#185b56', '#1d6c67'] : ['#1d6c67', '#185b56'];

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <View style={styles.btnOut}>
                <View style={styles.btnIn}>
                    <LinearGradient
                        colors={gradColors}
                        start={[0.5, 0.6]}
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

    // PLAIN BUTTON
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

    // EMPTY BUTTON
    EmptyButton: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
        margin: 0,
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    textBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },

    // NEOMORPH BUTTON
    btnOut: {
        margin: 14,
        borderRadius: 16,
        shadowColor: '#103c39',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 1,
        shadowRadius: 15,
    },
    btnIn: {
        margin: 14,
        backgroundColor: '#333333',
        borderRadius: 16,
        shadowColor: '#268e87',
        shadowOffset: { width: -7, height: -7 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
    },
    linear: {
        padding: 16,
        borderRadius: 16,

    }
});

