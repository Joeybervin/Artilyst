import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Divider } from '@rneui/base';




export function SmallBadge(props) {

    const [userSelection, setUserSelection] = useState(''); // STRING : ce que l'utilisateur à sélectioné

    const onSelectHandler = (value) => {
        props.onPressHandler(value); // envoie de la valeur au parent
        setUserSelection(value);
    };

    return (
        <View>
            <TouchableOpacity
                    style={{...styles.smallBadge,  backgroundColor : props.title === userSelection ?  styles.badgeSelectColor : props.badgeColor|| styles.smallBadgeDefaultColor }}
                    onPress={() => onSelectHandler(props.title)}
            >
                <Text style={{...styles.badgeText,  color : props.title === userSelection ?  styles.BadgeSelectTextColor : props.badgeTextColor || styles.badgeTextDefaultColor }}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}


export function SmallBadges(props) {

    const [userSelection, setUserSelection] = useState(''); // STRING : ce que l'utilisateur à sélectioné

    const onSelectHandler = (value) => {
        props.onPressHandler(value); // envoie de la valeur au parent
        setUserSelection(value);
    };
    
    return (
        <View>
            {props.data.map((element, index) => {
                 return (
                    <TouchableOpacity
                    key={index}
                        style={{...styles.smallBadge,  backgroundColor : element === userSelection ?  styles.badgeSelectColor : props.badgeColor || styles.smallBadgeDefaultColor }}
                        onPress={ () => onSelectHandler(element) }
                    >
                        <Text
                            style={{...styles.badgeText,  color : element === userSelection ?  styles.BadgeSelectTextColor : props.badgeTextColor || styles.badgeTextDefaultColor }}>
                            {element}
                        </Text>

                    </TouchableOpacity>
                 );
            })}
        </View>
    );
}

export function SmallBadgesPlus(props) {

    const [userSelection, setUserSelection] = useState(''); // STRING : ce que l'utilisateur à sélectioné

    const onSelectHandler = (value) => {
        props.onPressHandler(value); // envoie de la valeur au parent
        setUserSelection(value);
    };
    
    return (
        <View>
            {props.data.map((element, index) => {
                let badgeColor = props.badgeColor
                let badgeTextColor = props.badgeTextColor
                if (element === "option") {

                    element = props.option
                    badgeColor = props.badgeColorOption
                    badgeTextColor = props.badgeTextColorOption
                }

                return (
                    <TouchableOpacity
                    key={index}
                        style={{...styles.smallBadge,  backgroundColor : element === userSelection ?  styles.badgeSelectColor : badgeColor || styles.smallBadgeDefaultColor }}
                        onPress={ () => onSelectHandler(element) }
                    >
                        <Text
                            style={{...styles.badgeText,  color : element === userSelection ?  styles.BadgeSelectTextColor : badgeTextColor || styles.badgeTextDefaultColor }}>
                            {element}
                        </Text>

                    </TouchableOpacity>
                 );
            })}
            
            
            
        </View>
    );
}




const styles = StyleSheet.create({
    // BADGE
    smallBadge: {
        alignItems: 'center',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0,
        width: "100%",
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        padding: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    smallBadgeDefaultColor :  '#f4f4f4'
    , 
    badgeSelectColor : '#597ee7' ,
    // TEXT
    badgeText : {
        fontSize: 15,
        fontWeight: 'bold'},
    badgeTextDefaultColor :'#000000' ,
    BadgeSelectTextColor : "#ffffff",
    
   
})