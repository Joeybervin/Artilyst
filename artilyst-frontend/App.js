
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//^ Components
/* connexion components */
import ConnexionScreen from './screens/ConnexionScreen';
import ConnexionFormScreen from './screens/ConnexionFormScreen';

/* app components */
import CreationProjectScreen from './screens/CreationProjectScreen';
import AnnonceScreen from './screens/AnnonceScreen';
import LikesScreen from './screens/LikesScreen';

//^ Redux
// import {createStore, combineReducers} from 'redux';
// import {Provider} from 'react-redux';
/* store */
//const store = createStore(combineReducers({}));

//^ module bonus (style + icons)
import { Ionicons } from '@expo/vector-icons'; 


// * BOTTOMTAB NAVIGATION
const TabNavigator = createBottomTabNavigator();

function PagesStacks() {
  return (
      <TabNavigator.Navigator  screenOptions={({ route }) => ({
        
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Project') {
            iconName = 'ios-create'
            
          } else if (route.name === 'Annonce') {
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
        <TabNavigator.Screen name="Project" component={CreationProjectScreen} />
        <TabNavigator.Screen name="Annonce" component={AnnonceScreen} />
        <TabNavigator.Screen name="Likes" component={LikesScreen} />
      </TabNavigator.Navigator>
  );
} 


// * LINK NAVIGATION
const StackNavigator = createStackNavigator();

export default function App() {
  return (
    
      <NavigationContainer >
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>

          <StackNavigator.Screen  name="ConnexionScreen" component={ConnexionScreen}/>
          <StackNavigator.Screen  name="ConnexionFormScreen" component={ConnexionFormScreen}/>
          <StackNavigator.Screen  name="PagesStacks" component={PagesStacks}/>

        </StackNavigator.Navigator>
      </NavigationContainer>
  
  );
}

