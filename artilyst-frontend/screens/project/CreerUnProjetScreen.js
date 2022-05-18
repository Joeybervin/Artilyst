import React from 'react';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet,  View , ScrollView, TouchableOpacity } from 'react-native';
import { Text, Divider, Button, Tile, Image  } from '@rneui/base';
import { Ionicons } from '@expo/vector-icons';

export default function CreerUnProjetScreen(props) {

    // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
    /* VARIABLES D'ÉTAT  */
    /* VARIABLES */
    // * ___________________________ INITIALISATION DE LA PAGE ___________________________
    /* PREMIÈRE */
    /* SECONDE */
    // * ___________________________ FUNCTIONS ___________________________
    // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
    /* MAP */


    // * ___________________________ PAGE ___________________________
    
    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>

        <View style={{ marginTop: 30, width: "90%" }}   >
            <Text style={{fontWeight: "bold", fontSize: 20}}>Creer un nouveau projet </Text>

            <Button  
            raised 
              type="solid"
              containerStyle={{ borderWidth: 2, borderRadius : 10, borderColor: 'transparent' ,width: "40%" , marginTop: 30,   }}
              buttonStyle={{ borderRadius : 8,height: 140, backgroundColor: '#1ADBAC'}}
              >
              <Ionicons
                style={styles.icon}
                color='white'
                name="add"
                size={50}
                 onPress={() => props.navigation.navigate('CollaborateurDuProjetScreen')}
              />
            </Button>
        </View>


        <Divider
          style={{ width: "100%", margin: 20 }}
          color="#d3d3d3"
          insetType="middle"
          width={1}
          orientation="horizontal"
        />

        <View  style={{ width: "100%"}}>

        <Text style={{fontWeight: "bold" , fontSize: 20, marginBottom : 25, width: "90%",  marginLeft : 20 }}>Mes projets </Text>

        <TouchableOpacity style={{flex:1, justifyContent:"center",alignItems:"center"}} onPress={() => console.log("PROJET !!")} >
  
          <View style={{opacity:0.7, width: "90%", backgroundColor : "black", height:200, marginBottom : 20, borderRadius : 10}}  >
        
            <Image
              style={{width: "100%", height: "100%", borderRadius : 10 }}
              source={{uri : "https://www.mediastorehouse.com/p/191/sunset-porthmeor-beach-st-ives-cornwall-11702500.jpg.webp"}}
            />

          </View>
          <Ionicons name="ellipsis-vertical" color="#FFFFFF" size={30} style={{ position: 'absolute', top: 5, right: 25, padding : 15 }}
          onPress={() => console.log("ICON !!")} />


          <Text  style={{fontSize: 25, fontWeight: "bold",position : "absolute",color:"white", padding : 15}} >Puma : Shooting pout la nouvelle collection 
          </Text>
        </TouchableOpacity>
     

        

          </View>
        </View>
        </ScrollView>

    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
  scrollView : {
    flex: 1,
        backgroundColor: '#fff',
       
  },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

// * ___________________________ REDUX ___________________________
