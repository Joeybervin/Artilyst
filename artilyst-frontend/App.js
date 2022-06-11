// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true)

import { StyleSheet, StatusBar} from 'react-native';

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
import ProjectsScreen from './screens/ProjectsScreen';
/* Formulaire de création de projet */
import ProjectCreationScreen1 from './screens/project/ProjectCreationScreen1'; 
import ProjectCreationScreen2 from './screens/project/ProjectCreationScreen2';
import ProjectCreationScreen3 from './screens/project/ProjectCreationScreen3'; 
import ProjectCreationScreen4 from './screens/project/ProjectCreationScreen4';

/* Recherhce artistes */
import ArtisteCorrespondantScreen from './screens/project/ArtisteCorrespondantScreen';

/* bottom tab bar screens */
import AnnoncesScreen from './screens/AnnoncesScreen';
import LikesScreen from './screens/LikesScreen';

/* headers screens */
// profil
import ProfileScreen from './screens/profile/ProfileScreen';
import ProfileEditScreen from './screens/profile/ProfileEditScreen';
import OtherUserProfileScreen from './screens/profile/OtherUserProfileScreen';
/* Gallery */
import GalleryScreen from './screens/profile/gallery/GalleryScreen'
import PortfoliosScreen from './screens/profile/gallery/PortfoliosScreen'
import PictureZoomScreen from './screens/profile/gallery/PictureZoomScreen'

// messagerie
import MessagesScreen from './screens/MessagesScreen';

//^ Redux
/* reducers */
import user from './reducers/userReducer';
import ListProjet from './reducers/Project.reducer';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
/* store */
const store = createStore(combineReducers({ user, ListProjet }));

//^ module bonus (style + icons)
import { Ionicons } from '@expo/vector-icons';
import { Button, Badge } from '@rneui/base';

import { MenuProvider } from 'react-native-popup-menu';

import Svg, { Path } from "react-native-svg"
// Import néomorphisme 


// * _______________________________________________________ TAB BOTTOM NAVIGATION _______________________________________________________
// *
const TabNavigator = createBottomTabNavigator();

function PagesStacks(props) {

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

          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel : false,
        activeTintColor: '#1ADBAC',
        inactiveTintColor: '#FFFFFF',
        style: {
          position : 'absolute',
          bottom : 25,
          left : 20,
          right : 20,
          elevation : 0, 
          backgroundColor: '#333333',
          borderTopWidth: 0,
          borderRadius : 100,
          height : 70,
          blurRadius : 2,
          ...styles.shadow
        }
      }}>

         {/* ------------------------ BOTTOM TAB BAR ------------------------ */}
        <TabNavigator.Screen name="Mes projets" component={ProjectsScreen}  />
        <TabNavigator.Screen name="Annonces" component={AnnoncesScreen}  options={{ initialRouteName: true }}  />
        <TabNavigator.Screen name="Likes" component={LikesScreen}  options={{tabBarBadge: 0 , tabBarBadgeStyle:{backgroundColor:"#1ADBAC", color:"#fff"}}}  />

        {/* ------------------------ HEADER TAB ------------------------ */}
        {/* PROFIL */}
        <TabNavigator.Screen name="ProfileScreen" component={ProfileScreen} initialParams={{ user: "current" }}  options={{ tabBarButton: () => null }} />
        <TabNavigator.Screen name="OtherUserProfileScreen" component={OtherUserProfileScreen} initialParams={{ user: "current" }}  options={{ tabBarButton: () => null }} />
        <TabNavigator.Screen name="ProfileEditScreen" component={ProfileEditScreen}  options={{ tabBarButton: () => null}}/>
        {/* GALLERY */}
        <TabNavigator.Screen name="GalleryScreen" component={GalleryScreen}  options={{ tabBarButton: () => null }}/>
        <TabNavigator.Screen name="PortfoliosScreen" component={PortfoliosScreen}  options={{ tabBarButton: () => null }}/>

        {/* MESSAGERIE */}
        <TabNavigator.Screen name="MessagesScreen" component={MessagesScreen}  options={{ tabBarButton: () => null }}/>

        {/*  ------------------------ PROJECT ------------------------ */}
        {/* FORMULAIRE  */}
        <TabNavigator.Screen name="ProjectCreationScreen1" component={ProjectCreationScreen1}  options={{ tabBarButton: () => null }}/>
        <TabNavigator.Screen name="ProjectCreationScreen2" component={ProjectCreationScreen2}  options={{ tabBarButton: () => null}}/>
        <TabNavigator.Screen name="ProjectCreationScreen3" component={ProjectCreationScreen3}  options={{ tabBarButton: () => null}}/>
        <TabNavigator.Screen name="ProjectCreationScreen4" component={ProjectCreationScreen4}  options={{  tabBarButton: () => null }}/>

         {/* ------------------------ SEARCH ARTISTS FOR PROJECT ------------------------ */}
        <TabNavigator.Screen name="ArtisteCorrespondantScreen" component={ArtisteCorrespondantScreen}  options={{ tabBarButton: () => null }}/>

        

      </TabNavigator.Navigator>

  );
}

const SvgComponent = (props) => (
  <Svg
    id="Calque_1"
    xmlns="http://www.w3.org/2000/svg"
    x={0}
    y={0}
    viewBox="0 0 277.2 62.3"
    style={{
      enableBackground: "new 0 0 277.2 62.3",
    }}
    xmlSpace="preserve"
    {...props}
  >

    <Path
      className="st0"
      d="M24.5 48.2H11.6L9.2 61.4H0L11.6.9h12.9l12.2 60.5h-9.6l-2.6-13.2zm-1.6-8.6-5-27.1-4.8 27.1h9.8zM52.5 36.6v24.8h-9.4V.9h14.7c5.2 0 9.2 1.2 12 3.6 3.6 3.1 5.4 7.7 5.4 13.7 0 7.7-2.7 12.9-8.2 15.7l8.9 27.4h-9.8l-8-24.8h-5.6zm0-8.7h3.4c2.6 0 4.4-.2 5.5-.7 2.7-1.2 4.1-4 4.1-8.5 0-3.3-.8-5.7-2.3-7.2-.9-.9-2-1.5-3.2-1.7-1.1-.2-2.5-.3-4.1-.3h-3.4v18.4zM100.1 9.5v51.9h-9.4V9.5H78.9V.9h32.8v8.6h-11.6zM126.7.9v60.5h-9.4V.9h9.4zM145.3.9v51.9h18.6v8.6h-28V.9h9.4zM189.5 37.8v23.6h-9.4V37.8L166.6.9h10.3l8.1 25.6L193.4.9h10.2l-14.1 36.9zM241.4 15.1l-9 2.7c-1.4-6-4.1-9-8.1-9-1.7 0-3.1.6-4.3 1.7-1.2 1.2-1.8 2.7-1.8 4.5 0 2.2.8 4.2 2.5 6.1 1.1 1.2 3.8 3.4 8 6.6 4.3 3.4 7.4 6.1 9 8.1 2.6 3.2 3.9 6.9 3.9 11.1 0 4.5-1.5 8.1-4.5 11-3 2.9-7.1 4.4-12.1 4.4-10.3 0-16.5-5.7-18.4-17l9-2.6c1.2 7.2 4.4 10.9 9.4 10.9 2.1 0 3.8-.6 5.1-2 1.2-1.3 1.9-2.9 1.9-5s-.8-4.1-2.3-5.9c-1.3-1.5-3.5-3.5-6.6-5.9-4.6-3.5-7.3-5.8-8.2-6.6-4.2-4-6.3-8.5-6.3-13.3 0-4.8 1.7-8.5 5.1-11.3 2.9-2.4 6.4-3.6 10.7-3.6 8.8 0 14.4 5 17 15.1zM265.5 9.5v51.9h-9.4V9.5h-11.7V.9h32.8v8.6h-11.7z"
      style={{
        fill: "#fff",
      }}
    />
  </Svg>
)


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
              {/* ACCUEIL */}
              <StackNavigator.Screen name="ConnectionScreen" component={ConnectionScreen} options={{ headerShown: false }} />
              {/* SIGN-IN */}
              <StackNavigator.Screen name="ConnectionFormScreen" component={ConnectionFormScreen} options={{ headerShown: false }} />
              {/* SIGN-UP */}
              <StackNavigator.Screen name="RegisterFormScreen1" component={RegisterFormScreen1} options={{ headerShown: false }} />
              <StackNavigator.Screen name="RegisterFormScreen2" component={RegisterFormScreen2} options={{ headerShown: false }} />
              {/* Profil ==> Gallery */}
              <TabNavigator.Screen name="PictureZoomScreen" component={PictureZoomScreen} options={{ headerShown: false }} />

              {/* ------------------------ HEADER TAB BAR ------------------------ */}
              <StackNavigator.Screen name="PagesStacks" component={PagesStacks}
                options={({ navigation }) => ({
                  title: "ARTILYST",
                  
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#333333',
                    height: 70,
                    borderBottomWidth : 2.5, 
                    borderColor : '#9E9E9E61',
                    elevation : 0,
                    shadowOpacity : 0           
                  },
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                  },
                  headerLeft: () => ( // PROFIL
                    <Button
                      icon={<Ionicons name={"person"} size={25} color="white" />}
                      buttonStyle={{ marginHorizontal: 25, borderRadius: 100 , ...styles.shadow , width : 45}}
                      color ="#706F6F"
                      onPress={() => navigation.navigate('ProfileScreen')}
                      
                    />
                  ),
                  headerRight: () => ( // MESSAGERIE
                    <Button
                      icon={<Ionicons name={"mail"} size={25} color="white" />}
                      buttonStyle={{ marginHorizontal: 25, borderRadius: 100 , ...styles.shadow , width : 45}}
                      color="#706F6F"
                      onPress={() => navigation.navigate('MessagesScreen')}
                    >
                      {/* Badge de notification */}
                      <Badge
                        badgeStyle={{ backgroundColor: "#1ADBAC" }}
                        value={0}
                        containerStyle={{ position: 'absolute', top: 0, left: 34, ...styles.shadow }}
                      />
                    </Button>
                  ),
                })} />

            </StackNavigator.Navigator>
          </NavigationContainer>
        </Provider>

      </MenuProvider>
  );
}

const styles = StyleSheet.create({
  shadow: {
     shadoColor : '#D8D8D8',
     shaddowOffset : {
      width : 0, 
      height : 10,
     },
     shadowOpacity : 0.25,
     shadowRadius : 3.5,
     elevation : 5
  },




});