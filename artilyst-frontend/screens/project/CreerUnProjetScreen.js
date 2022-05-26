import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

//^ Module de balise
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Divider, Button, Tile, Image } from '@rneui/base';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';
import { expoUrlJoey } from '../../ExpoUrl';

import { useIsFocused } from '@react-navigation/native';

function CreerUnProjetScreen(props) {

  // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
  /* VARIABLES D'ÉTAT  */

  const [listProjet, setListProjet] = useState([])
  /* VARIABLES */
  const isFocus = useIsFocused();
  const images = ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920", "https://images.unsplash.com/photo-1571590946238-a0ba990d12a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzdGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNob290aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvb3Rpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1607692605098-2b3cd0ebdd08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2VyaWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1559694204-61edb596dab1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN0eWxpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1501699169021-3759ee435d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3R5bGlzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1632643871772-b68cfd34b303?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687", "https://images.unsplash.com/photo-1540320865252-e4abf9e80004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FzdGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"]
  // * ___________________________ INITIALISATION DE LA PAGE ___________________________
  /* PREMIÈRE */
  /* SECONDE */
  // * ___________________________ FUNCTIONS ___________________________
  // chargement des données pour afficher la liste des projets créés + envoie vers le store
  useEffect(() => {
    async function loadCasting() {
      var rawResponse = await fetch(`http://${expoUrlJoey}/displayProjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.user.token}`,
      })
      let ListProjet = await rawResponse.json();

      props.OnChangeList(ListProjet)
      //console.log("retour",ListProjet)
      setListProjet(ListProjet)


    }
    loadCasting();
  }, []);

  //console.log( "response2",listProjet)
  console.log("props.listproject", props.listproject)
  //console.log("user",props.user)

  // fonction pour supprimer le projet séléctionné
  const deleteFunction = async (id, index) => {
    await fetch(`http://${expoUrlJoey}/deleteProject?id=${id}`, {
      method: 'DELETE'
    })
    props.onDelete(index)
  }
  // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
  /* MAP */

  // ????
  // const allUserProjects = images.map((element, index) => { // Tous les prjets de l'utilisateur
  //   return (
  //     <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => console.log("PROJET !!")} key={index}>

  //       <View style={{ opacity: 0.7, width: "90%", backgroundColor: "black", height: 200, marginBottom: 20, borderRadius: 10 }}  >

  //         <Image
  //           style={{ width: "100%", height: "100%", borderRadius: 10 }}
  //           source={{ uri: element }}
  //         />

  //       </View>
  //       {/* Menu optionel */}
  //       <Menu style={{ position: 'absolute', top: 5, right: 25, padding: 15, backgroundColor: "black", borderRadius: 50 }}>
  //         <MenuTrigger  >
  //           <Ionicons name="ellipsis-vertical" color="#ffffff" size={30} />
  //         </MenuTrigger>
  //         <MenuOptions customStyles={{ optionWrapper: { padding: 20 }, optionText: styles.text }}>

  //           <MenuOption onSelect={() => alert(`Save`)} text='Modifier le projet' />


  // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
  /* MAP */

  const allUserProjects = props.listproject.map((element, index) => { // Tous les prjets de l'utilisateur

    if (element) {
      return (
        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => console.log("PROJET !!")} key={index}>

          <View style={{ opacity: 0.7, width: "90%", backgroundColor: "black", height: 200, marginBottom: 20, borderRadius: 10 }}  >

            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={{ uri: element.photos[0] }}
            />

          </View>
          {/* Menu optionel */}
          <Menu style={{ position: 'absolute', top: 5, right: 25, padding: 15, backgroundColor: "black", borderRadius: 50 }}>
            <MenuTrigger  >
              <Ionicons name="ellipsis-vertical" color="#ffffff" size={30} />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionWrapper: { padding: 20 }, optionText: styles.text }}>

              <MenuOption onSelect={() => alert(`Save`)} text='Modifier le projet' />

              <MenuOption onSelect={() => props.navigation.navigate('ArtisteCorrespondantScreen', { id: element._id })} text='Voir les artistes correspondants' />

              <MenuOption onSelect={() => deleteFunction(element._id, index)} text='Supprimer' />
              {/* {console.log('LOG DE ID', element._id)}; */}

            </MenuOptions>
          </Menu>


          <Text style={{ fontSize: 25, fontWeight: "bold", position: "absolute", color: "white", padding: 15 }} >{element.title}
          </Text>
        </TouchableOpacity>
      )
    }

  })

  // * ___________________________ PAGE ___________________________

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

        <View style={{ marginTop: 30, width: "90%" }}   >
          <Text style={styles.title}>Créer un nouveau projet </Text>

          <Button
            raised
            type="solid"
            containerStyle={{ borderWidth: 2, borderRadius: 10, borderColor: 'transparent', width: "40%", marginTop: 30, }}
            buttonStyle={{ borderRadius: 8, height: 140, backgroundColor: '#1ADBAC' }}
            onPress={() => { props.navigation.navigate('CollaborateurDuProjetScreen') }}
          >
            <Ionicons
              style={styles.icon}
              color='white'
              name="add"
              size={50}
              onPress={() => { props.navigation.navigate('CollaborateurDuProjetScreen') }}
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

        <View style={{ width: "100%" }}>

          <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 25, width: "90%", marginLeft: 20 }}>Mes projets </Text>


          {allUserProjects}


        </View>
      </View>
    </ScrollView>

  );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 // -- GLOBAL STYLE ----------
 
  title: {
    ...title
  },
  subTitle: {
    ...subTitle
  },
  textRegular: {
    ...textRegular
  },
  cardTitle: {
    ...cardTitle
  },
  cardText: {
    ...cardText
  }

});

// * ___________________________ REDUX ___________________________
function mapDispatchToProps(dispatch) {
  return {
    OnChangeList: function (ListProjet) {
      dispatch({ type: 'saveListProject', ListProjet })
    },
    onDelete: function (index) {
      dispatch({ type: 'deletProject', index })
    }
  }
}


function mapStateToProps(state) {
  return { user: state.user, listproject: state.ListProjet }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreerUnProjetScreen);