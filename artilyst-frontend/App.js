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

/* bottom tabbar screens */
import CreationProjectScreen from './screens/CreationProjectScreen';
import AnnoncesScreen from './screens/AnnoncesScreen';
import LikesScreen from './screens/LikesScreen';

/* headers screens */
import UserScreen from './screens/UserScreen';
import MessagesScreen from './screens/MessagesScreen';

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
import {IoniconsHeaderButton} from './screens/components/header/headerButtonsComponent'

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

        


        <TabNavigator.Screen name="Mes projets" component={CreationProjectScreen}  />
        <TabNavigator.Screen name="Annonces" component={AnnoncesScreen} />
        <TabNavigator.Screen name="Likes" component={LikesScreen} />

        <TabNavigator.Screen name="UserScreen" component={UserScreen}  options={{
        tabBarButton: () => null
        }} />
          <TabNavigator.Screen name="MessagesScreen" component={MessagesScreen}  options={{
        tabBarButton: () => null

    }}/>
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

         
          <StackNavigator.Screen  name="PagesStacks" component={PagesStacks} 
          /* Créer une navigation depuis le header de l'app pour naviguer vers la page du profil + la page messages */
          options={({ navigation }) => ({
            title: "ARTILYST",
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#333333',
              height : 70, 
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',
            },
          headerLeft: () => (
            <Button
              icon={<Ionicons name={"person"} size={20} color="white" />}
              buttonStyle= {{marginHorizontal : 25, borderRadius : 100}}
              color="#BBBBBB"
              onPress={() => navigation.navigate('UserScreen')}
            />
          ),
          headerRight: () => (
            <Button
              icon={<Ionicons name={"mail"} size={20} color="white" />}
              buttonStyle= {{marginHorizontal : 25, borderRadius : 100}}
              color="#BBBBBB"
              onPress={() => navigation.navigate('MessagesScreen')}
            />
          ),
      })}/>


        
        </StackNavigator.Navigator>
      </NavigationContainer>
      </Provider>
  );
}

