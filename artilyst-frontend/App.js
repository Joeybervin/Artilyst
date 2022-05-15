// ^ Wanings messages
import { LogBox, StatusBar } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//^ Components
/* connexion screens */
import ConnectionScreen from './screens/connection/ConnectionScreen';
import ConnectionFormScreen from './screens/connection/ConnectionFormScreen';
import RegisterFormScreen1 from './screens/connection/RegisterFormScreen1';
import RegisterFormScreen2 from './screens/connection/RegisterFormScreen2';

/* app screens */
import CreationProjectScreen from './screens/CreationProjectScreen';
import AnnoncesScreen from './screens/AnnoncesScreen';
import LikesScreen from './screens/LikesScreen';

import UserScreen from './screens/UserScreen';

//^ Redux
/* reducers */
import user from './reducers/userReducer';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
/* store */
const store = createStore(combineReducers({user}));

//^ module bonus (style + icons)
import { Ionicons } from '@expo/vector-icons'; 

import { Button } from '@rneui/base';


// * LINK NAVIGATION
const StackNavigator = createStackNavigator();

// * BOTTOMTAB NAVIGATION
const TabNavigator = createBottomTabNavigator();

function PagesStacks() {

  
  return (
    
      <TabNavigator.Navigator 
      
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Mes projets') {
            iconName = 'ios-create'
            
          } else if (route.name === 'Annonces') {
            iconName = 'ios-search'
          }
          else if (route.name === 'Likes') {
            iconName = 'ios-heart'
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
        
      })}
      tabBarOptions={{
        activeTintColor: '#9AB6FF',
        inactiveTintColor: '#FFFFFF',
        style: {
          backgroundColor: '#000000'
        }
        
      
      }}>

        <TabNavigator.Screen name="Mes projets" component={CreationProjectScreen} />
        <TabNavigator.Screen name="Annonces" component={AnnoncesScreen} />
        <TabNavigator.Screen name="Likes" component={LikesScreen} />
      </TabNavigator.Navigator>
  );
} 


export default function App(props) {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#333333" />
      <NavigationContainer >
        <StackNavigator.Navigator screenOptions={{headerShown: true}}>

          {/* Connexion screens */}
          <StackNavigator.Screen  name="ConnectionScreen" component={ConnectionScreen}/>
          <StackNavigator.Screen  name="ConnectionFormScreen" component={ConnectionFormScreen}/>
          <StackNavigator.Screen  name="RegisterFormScreen1" component={RegisterFormScreen1}/>
          <StackNavigator.Screen  name="RegisterFormScreen2" component={RegisterFormScreen2}/>

          <StackNavigator.Screen name="UserScreen" component={UserScreen} />

          <StackNavigator.Screen  name="PagesStacks" component={PagesStacks} 
          options={{
            headerTitle: "ARTILYST",
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#333333',
              height : 70, 
            },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginHorizontal: 'auto'
          },
          headerLeft: () => (
            <Button
              icon={<Ionicons name={"person"} size={20} color="white" />}
              buttonStyle= {{marginHorizontal : 20, borderRadius : 5}}
              color="#BBBBBB"
              onPress={() =>  {props.navigation.navigate('UserScreen')}}
            />
          ),
          headerRight: () => (
            <Button
              icon={<Ionicons name={"mail"} size={20} color="white" />}
              buttonStyle= {{marginHorizontal : 20, borderRadius : 5}}
              color="#BBBBBB"
              onPress={() => alert('This is a button!')}
            />
          ),
      }}/>


        
        </StackNavigator.Navigator>
      </NavigationContainer>
      </Provider>
  );
}

