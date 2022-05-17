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
import CreerUnProjetScreen from './screens/projet/CreerUnProjetScreen';
import CollaborateurDuProjetScreen from './screens/projet/CollaborateurDuProjetScreen';
import PhotographCollaborateurScreen from './screens/projet/PhotographCollaborateurScreen';
import CategorieDuProjetScreen from './screens/projet/CategorieDuProjetScreen';
import CreationAnnonceScreen from './screens/projet/CreationAnnonceScreen';
import StylisteCollaborateurScreen from './screens/projet/StylisteCollaborateurScreen';


/* bottom tabbar screens */
import CreationProjectScreen from './screens/CreationProjectScreen';
import AnnoncesScreen from './screens/AnnoncesScreen';
import LikesScreen from './screens/LikesScreen';

/* headers screens */
import ProfilScreen from './screens/ProfilScreen';
import MessagesScreen from './screens/MessagesScreen';

import ProfileEditScreen from './screens/ProfileEditScreen';

//^ Redux
/* reducers */
import user from './reducers/userReducer';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
/* store */
const store = createStore(combineReducers({user}));

//^ module bonus (style + icons)
import { Ionicons } from '@expo/vector-icons'; 
import { Button, Badge } from '@rneui/base';


// * BOTTOMTAB NAVIGATION
const TabNavigator = createBottomTabNavigator();

function PagesStacks() {
  return (
    
      <TabNavigator.Navigator 
      
      initialRouteName="Annonces" // Première page qui s'affiche après sign_in / sign-up
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
        activeTintColor: '#1ADBAC',
        inactiveTintColor: '#FFFFFF',
        style: {
          backgroundColor: '#333333'
        }
        
      }}>

        <TabNavigator.Screen name="Mes projets" component={CreationProjectScreen}  />
        <TabNavigator.Screen name="Annonces" component={AnnoncesScreen}  options={{ initialRouteName: true }}  />
        <TabNavigator.Screen name="Likes" component={LikesScreen}  
        options={{
          tabBarBadge: 0 ,
          tabBarBadgeStyle:{backgroundColor:"#1ADBAC", color:"#fff"}}}  />

        <TabNavigator.Screen name="ProfilScreen" component={ProfilScreen}  options={{ tabBarButton: () => null }} />
        <TabNavigator.Screen name="MessagesScreen" component={MessagesScreen}  options={{ tabBarButton: () => null}}/>

        <TabNavigator.Screen name="CreerUnProjetScreen" component={CreerUnProjetScreen}  options={{ tabBarButton: () => null}}/>
        <TabNavigator.Screen name="CollaborateurDuProjetScreen" component={CollaborateurDuProjetScreen}  options={{ tabBarButton: () => null}}/>
        <TabNavigator.Screen name="PhotographCollaborateurScreen" component={PhotographCollaborateurScreen}  options={{ tabBarButton: () => null}}/>
        <TabNavigator.Screen name="CategorieDuProjetScreen" component={CategorieDuProjetScreen}  options={{ tabBarButton: () => null}}/>
        <TabNavigator.Screen name="CreationAnnonceScreen" component={CreationAnnonceScreen}  options={{ tabBarButton: () => null}}/>
        <TabNavigator.Screen name="StylisteCollaborateurScreen" component={StylisteCollaborateurScreen}  options={{ tabBarButton: () => null}}/>
        <TabNavigator.Screen name="ProfileEditScreen" component={ProfileEditScreen}  options={{ tabBarButton: () => null}}/>

      </TabNavigator.Navigator>

  );
} 
// * LINK NAVIGATION
const StackNavigator = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#333333" />
      <NavigationContainer >
        <StackNavigator.Navigator >

          {/* Connexion screens */}
          <StackNavigator.Screen  name="ConnectionScreen" component={ConnectionScreen} options={{headerShown: false}} />
          <StackNavigator.Screen  name="ConnectionFormScreen" component={ConnectionFormScreen} options={{headerShown: false}} />
          <StackNavigator.Screen  name="RegisterFormScreen1" component={RegisterFormScreen1} options={{headerShown: false}} />
          <StackNavigator.Screen  name="RegisterFormScreen2" component={RegisterFormScreen2} options={{headerShown: false}} />
          

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
              onPress={() => navigation.navigate('ProfilScreen')}
            />
          ),
          headerRight: () => (
            <Button
              icon={<Ionicons name={"mail"} size={20} color="white" />}
              buttonStyle= {{marginHorizontal : 25, borderRadius : 100}}
              color="#BBBBBB"
              
              onPress={() => navigation.navigate('MessagesScreen')}
            >
              <Badge
            badgeStyle={{backgroundColor :"#1ADBAC"}}
            value={0}
            containerStyle={{ position: 'absolute', top: 0, left: 30 }}
          />
            </Button>
          ),
      })}/>


        
        </StackNavigator.Navigator>
      </NavigationContainer>
      </Provider>
  );
}

