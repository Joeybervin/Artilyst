
import React, { useState, useEffect } from 'react';

import { expoUrlRaf } from '../ExpoUrl';

// ^ Wanings messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', '[Unhandled promise rejection: TypeError: Network request failed]']);

//^ Module de balise
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Divider, Button, Tile, Image } from '@rneui/base';
import { Overlay, CheckBox } from '@rneui/themed';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';

import { subTitle, textRegular, title, cardTitle, cardText } from './components/GlobalStyles';

import { connect } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';


 function CreationProjetScreen(props) {

  // * ___________________________ VARIABLES & VARIABLES D'ÉTAT ___________________________
  /* VARIABLES D'ÉTAT  */
  const [checkBoxStatus, setCheckBoxStatus] = useState(false)
  const [overlayVisibility, setOverlayVisibility] = useState(false)
  const [listProject, setListProject] = useState([])
  let close = false
  /* VARIABLES */
  let userChoiceUncheck = { userChoice: "uncheck" }
  let userChoiceCheck = { userChoice: "check" }


/*   const isFocus = useIsFocused();
  const images = ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920", "https://images.unsplash.com/photo-1571590946238-a0ba990d12a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzdGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNob290aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvb3Rpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1607692605098-2b3cd0ebdd08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2VyaWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1559694204-61edb596dab1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN0eWxpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1501699169021-3759ee435d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3R5bGlzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1632643871772-b68cfd34b303?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687", "https://images.unsplash.com/photo-1540320865252-e4abf9e80004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FzdGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"] */
  // * ___________________________ INITIALISATION DE LA PAGE ___________________________
  /* PREMIÈRE */

  useEffect(() => {
    async function loadCasting() {
      var rawResponse = await fetch(`http://${expoUrlRaf}/displayProjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.user.token}`,
      })
      let response = await rawResponse.json();

      props.OnChangeList(response)
      setListProject(response)
    }
    
    AsyncStorage.getItem("userMessage", function (error, choice) {
      if (choice) {
        let messageStatus = JSON.parse(choice);
        if (messageStatus.userChoice === "uncheck") setOverlayVisibility(true)
        if (messageStatus.userChoice === "check") setOverlayVisibility(false)
        console.log("Choice : ",choice)
      }
      else {
        AsyncStorage.setItem("userMessage", JSON.stringify(userChoiceUncheck))
      }
    });
    loadCasting();
  }, [])
  /* SECONDE */


  // * ___________________________ FUNCTIONS ___________________________
  /* Pour enregisterer le choix de l'utilisateur sur le faite d'afficher le message où non */
  const getMessageStatus = () => {
    if (checkBoxStatus) AsyncStorage.setItem("userMessage", JSON.stringify(userChoiceCheck))
    if (!checkBoxStatus) AsyncStorage.setItem("userMessage", JSON.stringify(userChoiceUncheck))
    close = true
    setOverlayVisibility(false)
  }

  const deleteFunction = async (id, index) => {
    await fetch(`http://${expoUrlRaf}/deleteProject?id=${id}`, {
      method: 'DELETE'
    })
    props.onDelete(index)
  }

  // * ___________________________ AFFICHAGES SUR LA PAGE ___________________________
  /* MAP */

  const allUserProjects = listProject.map((element, index) => { // Tous les prjets de l'utilisateur

    return (
      <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => console.log("PROJET !!")} key={index}>
        <View style={{ opacity: 0.7, width: "90%", backgroundColor: "black", height: 200, marginBottom: 20, borderRadius: 10 }}  >
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={element === null ? {uri : "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg" } : { uri: "https://nopanic.fr/wp-content/themes/soledad/images/no-image.jpg"  }}
          /> 

        </View>
        {/* Menu optionel */}
        <Menu style={{ position: 'absolute', top: 12, right: 32, padding: 12, backgroundColor: '#f4f4f4', borderRadius: 50 }}>
          <MenuTrigger  >
            <Ionicons name="ellipsis-vertical" color='black' size={20} />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionWrapper: { padding: 20 }, optionText: styles.text }}>

            <MenuOption onSelect={() => alert(`Save`)} text='Modifier le projet' />

            <MenuOption onSelect={() => alert(`Not called`)} text='Voir les artistes correspondants' />

            <MenuOption onSelect={() => deleteFunction(element._id, index)} text='Supprimer' />

          </MenuOptions>
        </Menu>


        <Text style={{ fontSize: 25, fontWeight: "bold", position: "absolute", color: "white", padding: 15 }} >{element === null ? "Projet terminé" : element.title}
        </Text>
      </TouchableOpacity>
    )
  })


  // * ___________________________ PAGE ___________________________

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

        {/* Overlay */}
        <Overlay overlayStyle={{ alignItems: 'center', justifyContent: "center", width: "95%" }}
          isVisible={overlayVisibility} >
          <View style={{ width: "90%", height: "85%", alignItems: 'center' }}>
            <Text style={{ marginBottom: 30, marginLeft: "auto", marginRight: "auto", fontSize: 30 }}>ARTILYST</Text>

            <Text style={{ marginBottom: 30 }}>Cher(e) Artiste, ici vous allez pouvoir créer des ANNONCES pour vos projets</Text>

            <Text style={{ marginBottom: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis magna sem, nec lobortis orci vestibulum id. Donec consectetur sagittis ex, non dictum ex convallis in. Donec eu faucibus est. Maecenas vitae eros ac dui aliquida auctor risus, et viverra quam cursus sed. Cras vitae laoreet lorem, iaculis sodales magna. Morbi justo metus, fermentum quis laoreet quis, molestie non ligula.</Text>

            <Text style={{ marginBottom: 15 }} t>Etiam lobortis mi elit, in faucibus lectus mattis ut. Praesent a semper arcu. Proin risus orci, vestibulum eget eleifend nec, ullamcorper varius est. Nulla ut purus feugiat, finibus enim in, maximus sapien. S</Text>

            <Text style={{ marginBottom: 15 }}>Praesent sem ligula, gravida vel blandit quis, euismod sit amet mi. Donec vel sodales nibh. Curabitur ut tincidunt arcu, non elementum nibh. Maecenas mollis, nibh at elementum condimentum, mauris turpis imperdiet tortor, ut sodales urna lacus quis nisi. Sed rutrum nisi vel magna vestibulum volutpat.</Text>

          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', width: "90%", borderColor: 'black', borderWidth: 0.5, borderRadius: 5, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                center
                checkedColor='black'
                onPress={() => { setCheckBoxStatus(checkBoxStatus === true ? false : true) }}
                checked={checkBoxStatus === false ? false : true}
              />
              <Text>Ne plus afficher</Text>
            </View>
            <Button
              title="FERMER"
              color='#1ADBAC'
              containerStyle={{ marginRight: 15, backgroundcolor: '#1ADBAC', width: 100 }}
              titleStyle={{ fontSize: 12 }}
              onPress={() => getMessageStatus()}
            />
          </View>



        </Overlay>

        <View style={{ marginTop: 30, width: "90%" }}   >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Créer un nouveau projet </Text>

          <Button
            raised
            type="solid"
            containerStyle={{ borderWidth: 2, borderRadius: 10, borderColor: 'transparent', width: "30%", marginTop: 20, }}
            buttonStyle={{ borderRadius: 8, height: 100, backgroundColor: '#1ADBAC' }}
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
          style={{ width: "80%", margin: 20 }}
          color="#d3d3d3"
          insetType="middle"
          width={1}
          orientation="horizontal"
        />

        <View style={{ width: "100%" }}>

          <Text style={{ fontWeight: "bold", fontSize: 27, marginBottom: 25, width: "90%", marginLeft: 20 }}>Mes projets </Text>

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
    marginBottom : 100
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
)(CreationProjetScreen);