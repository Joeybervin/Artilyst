// ^ Wanings messages
import { LogBox } from 'react-native';
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


// * LINK NAVIGATION
const StackNavigator = createStackNavigator();

export default function App() {
  return (
    
      <NavigationContainer >
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>

          {/* Sign-in / Sign-up nested navigation */}
          <StackNavigator.Screen  name="ConnectionScreen" component={ConnectionScreen}/>
          <StackNavigator.Screen  name="ConnectionFormScreen" component={ConnectionFormScreen}/>
          <StackNavigator.Screen  name="RegisterFormScreen1" component={RegisterFormScreen1}/>
          <StackNavigator.Screen  name="RegisterFormScreen2" component={RegisterFormScreen2}/>


          <StackNavigator.Screen  name="PagesStacks" component={PagesStacks}/>

        </StackNavigator.Navigator>
      </NavigationContainer>
  
  );
}

