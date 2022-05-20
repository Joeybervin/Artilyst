// ^ Wanings messages
import { LogBox, StatusBar } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//^ Screens
/* connexion screens */
import ConnectionScreen from './screens/connection/ConnectionScreen';
import ConnectionFormScreen from './screens/connection/ConnectionFormScreen';
/* Register screens */
import RegisterFormScreen1 from './screens/connection/RegisterFormScreen1';
import RegisterFormScreen2 from './screens/connection/RegisterFormScreen2';

/* project screens */
import CreerUnProjetScreen from './screens/project/CreerUnProjetScreen'; // Étape 1/4
/* Formulaire de création de projet */
import CollaborateurDuProjetScreen from './screens/project/CollaborateurDuProjetScreen'; // Étape 2/4

import PhotographCollaborateurScreen from './screens/project/PhotographCollaborateurScreen';  // Étape 3/4
import StylisteCollaborateurScreen from './screens/project/StylisteCollaborateurScreen'; // Étape 3/4
import ComedienCollaborateurScreen from './screens/project/ComedienCollaborateurScreen'; // Étape 3/4
import ModeleCollaborateurScreen from './screens/project/ModeleCollaborteurScreen'; // Étape 3/4
import RealisateurCollaborateurScreen from './screens/project/RealisateurCollaborateurScreen'; // Étape 3/4

import CategorieDuProjetScreen from './screens/project/CategorieDuProjetScreen'; // Étape 3/4

/* Recherhce screens */
import CreationAnnonceScreen from './screens/project/CreationAnnonceScreen';
import ArtisteCorrespondantScreen from './screens/project/ArtisteCorrespondantScreen';

/* bottom tab bar screens */
import CreationProjectScreen from './screens/CreationProjectScreen';
import AnnoncesScreen from './screens/AnnoncesScreen';
import LikesScreen from './screens/LikesScreen';

/* headers screens */
// profil
import ProfilScreen from './screens/profile/ProfilScreen';
import ProfileEditScreen from './screens/profile/ProfileEditScreen';
import AllMyProfilePicturesScreen from './screens/profile/AllMyProfilePicturesScreen'

// messagerie
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
import { Button, Badge } from '@rneui/base';


import { MenuProvider } from 'react-native-popup-menu';

// * _______________________________________________________ TAB BOTTOM NAVIGATION _______________________________________________________
// *
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

         {/* ------------------------ BOTTOM TAB BAR ------------------------ */}
        <TabNavigator.Screen name="Mes projets" component={CreationProjectScreen}  />
        <TabNavigator.Screen name="Annonces" component={AnnoncesScreen}  options={{ initialRouteName: true }}  />
        <TabNavigator.Screen name="Likes" component={LikesScreen}  options={{ tabBarBadge: 0 , tabBarBadgeStyle:{backgroundColor:"#1ADBAC", color:"#fff"}}}  />

        {/* ------------------------ HEADER TAB ------------------------ */}
        {/* PROFIL */}
        <TabNavigator.Screen name="ProfilScreen" component={ProfilScreen}  options={{ tabBarButton: () => null }} />
        <TabNavigator.Screen name="ProfileEditScreen" component={ProfileEditScreen}  options={{ tabBarButton: () => null}}/>
        {/* MESSAGERIE */}
        <TabNavigator.Screen name="MessagesScreen" component={MessagesScreen}  options={{ tabBarButton: () => null }}/>

        {/*  ------------------------ PROJECT ------------------------ */}
        {/* FORMULAIRE :  Étape 1/4 */}
        <TabNavigator.Screen name="CreerUnProjetScreen" component={CreerUnProjetScreen}  options={{ tabBarButton: () => null }}/> 
        {/* FORMULAIRE :  Étape 2/4 */}
        <TabNavigator.Screen name="CollaborateurDuProjetScreen" component={CollaborateurDuProjetScreen}  options={{ tabBarButton: () => null }}/>
        {/* FORMULAIRE :  Étape 3/4 */}
        <TabNavigator.Screen name="ComedienCollaborateurScreen" component={ComedienCollaborateurScreen}  options={{ tabBarButton: () => null }}/>
        <TabNavigator.Screen name="PhotographeCollaborateurScreen" component={PhotographCollaborateurScreen}  options={{ tabBarButton: () => null }}/>
        <TabNavigator.Screen name="PhotographCollaborateurScreen" component={PhotographCollaborateurScreen}  options={{ tabBarButton: () => null}}/>
        <TabNavigator.Screen name="ModeleCollaborateurScreen" component={ModeleCollaborateurScreen}  options={{ tabBarButton: () => null }}/>
        <TabNavigator.Screen name="RealisateurCollaborateurScreen" component={RealisateurCollaborateurScreen}  options={{ tabBarButton: () => null }}/>
        <TabNavigator.Screen name="StylisteCollaborateurScreen" component={StylisteCollaborateurScreen}  options={{ tabBarButton: () => null}}/>
        {/* FORMULAIRE :  Étape 4/4 */}
        <TabNavigator.Screen name="CategorieDuProjetScreen" component={CategorieDuProjetScreen}  options={{ tabBarButton: () => null}}/>

         {/* ------------------------ SEARCH ------------------------ */}
        <TabNavigator.Screen name="CreationAnnonceScreen" component={CreationAnnonceScreen}  options={{  tabBarButton: () => null }}/>
        <TabNavigator.Screen name="ArtisteCorrespondantScreen" component={ArtisteCorrespondantScreen}  options={{ tabBarButton: () => null }}/>

        <TabNavigator.Screen name="AllMyProfilePicturesScreen" component={AllMyProfilePicturesScreen}  options={{ tabBarButton: () => null }}/>

      </TabNavigator.Navigator>

  );
} 




// * _______________________________________________________ STACK NAVIGATION _______________________________________________________
// *
const StackNavigator = createStackNavigator();

export default function App() {
  return (
    <MenuProvider>
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#333333" />
      <NavigationContainer >
        <StackNavigator.Navigator >

           {/* ------------------------ CONNEXION ------------------------ */}
          <StackNavigator.Screen  name="ConnectionScreen" component={ConnectionScreen} options={{headerShown: false}} />
          {/* SIGN-IN */}
          <StackNavigator.Screen  name="ConnectionFormScreen" component={ConnectionFormScreen} options={{headerShown: false}} />
          {/* SIGN-UP */}
          <StackNavigator.Screen  name="RegisterFormScreen1" component={RegisterFormScreen1} options={{headerShown: false}} />
          <StackNavigator.Screen  name="RegisterFormScreen2" component={RegisterFormScreen2} options={{headerShown: false}} />
          
           {/* ------------------------ HEADER TAB BAR ------------------------ */}
          <StackNavigator.Screen  name="PagesStacks" component={PagesStacks} 
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
          headerLeft: () => ( // PROFIL
            <Button
              icon={<Ionicons name={"person"} size={20} color="white" />}
              buttonStyle= {{marginHorizontal : 25, borderRadius : 100}}
              color="#BBBBBB"
              onPress={() => navigation.navigate('ProfilScreen')}
            />
          ),
          headerRight: () => ( // MESSAGERIE
            <Button
              icon={<Ionicons name={"mail"} size={20} color="white" />}
              buttonStyle= {{marginHorizontal : 25, borderRadius : 100}}
              color="#BBBBBB"
              onPress={() => navigation.navigate('MessagesScreen')}
            >
              {/* Badge de notification */}
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
    </MenuProvider>
  );
}

