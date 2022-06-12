import React, { useState } from 'react';
import { CheckBox } from "@rneui/base";
import { View } from 'react-native';

export function CheckBox(props) {

    const [userSelection, setUserSelection] = useState(''); // STRING : ce que l'utilisateur à sélectioné

    const onSelectHandler = (value) => {
        props.onPressHandler(value); // envoie de la valeur au parent
        setUserSelection(value);
    };
    
    return (
        <View>
            {props.data.map((element, index) => {
                 return (
                    <CheckBox
                    key={index}
                    center
                    checkedColor='#000000'
                    title={element}
                    onPress={() => {
                        onSelectHandler(element)
                    }}
                    checked={userSelection === element ? true : false}
                />
                 );
            })}
        </View>
    );
}