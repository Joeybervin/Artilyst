import * as React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
//^ module bonus (icons)
import { Ionicons } from '@expo/vector-icons';


export default IoniconsHeaderButton = (props) => {
    return <HeaderButton
            buttonStyle= {{marginHorizontal : 20, borderRadius : 5}}
            icon={<Ionicons name={"person"} size={20} color="white" />}
            size={20}
            color="#BBBBBB"
            onPress={() =>  {props.navigation.navigate('UserScreen')}}
                {...props}
            />;
};
