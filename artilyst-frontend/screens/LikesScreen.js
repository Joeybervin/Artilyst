import React from 'react';

// ^ Wanings messages
import { LogBox, ScrollView, Image, Button } from 'react-native';
LogBox.ignoreLogs(['Warning: ...', "EventEmitter.removeListener('keyboardDidHide', ...):"]);

//^ Module de balise
import { StyleSheet, Text, View } from 'react-native';
/* import { Text } from '@rneui/base'; */

export default function LikesScreen(props) {

    const images = ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920", "https://images.unsplash.com/photo-1571590946238-a0ba990d12a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzdGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNob290aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvb3Rpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1607692605098-2b3cd0ebdd08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2VyaWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1559694204-61edb596dab1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN0eWxpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1501699169021-3759ee435d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c3R5bGlzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60", "https://images.unsplash.com/photo-1632643871772-b68cfd34b303?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687", "https://images.unsplash.com/photo-1540320865252-e4abf9e80004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FzdGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"]

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
        <ScrollView style={{ backgroundColor: '#fff', }}>
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                    <Text style={{ fontWeight: 'bold' }}> Ils ont postulé à vos projets  </Text>
                </View>

                {/* profile intéressé par  les projet de l'utilisateur */}
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, justifyContent: 'space-between' }}>
                    <ScrollView horizontal={true}>

                        {/* profil 1 */}
                        <View style={{ flexDirection: 'column', borderColor: 'black', borderWidth: 0.5, borderRadius: 7, width: 180, height: 210, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10 }}>
                            {/* image profil */}
                            <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: "center" }}>
                                <Image style={{ width: 170, height: 140, borderRadius: 7 }} source={{ uri: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387' }} />
                            </View>

                            {/* Nom et domaine */}
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingBottom:3 }} >
                                <Text style={{ fontWeight: 'bold' }}> Sarah  </Text>
                                <Text style={{ fontWeight: 'bold' }}> Photographe </Text>
                            </View>
                            {/* Bouton rejeter /recruter */}
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5  }} >
                                <Button
                                    color='#1ADBAC'
                                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                    title="recruter" />
                                <Button
                                    color='#1ADBAC'
                                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                    title="rejeter" />
                            </View>
                        </View>

                        {/* profil 2 */}
                        {/* https://images.unsplash.com/photo-1579112314617-0036fb38082d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887 */}
                        <View style={{ flexDirection: 'column', borderColor: 'black', borderWidth: 0.5, borderRadius: 7, width: 180, height: 210, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10 }}>
                            {/* image profil */}
                            <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: "center" }}>
                                <Image style={{ width: 170, height: 140, borderRadius: 7 }} source={{ uri: 'https://images.unsplash.com/photo-1579112314617-0036fb38082d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887' }} />
                            </View>

                            {/* Nom et domaine */}
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingBottom:3 }} >
                                <Text style={{ fontWeight: 'bold' }}> Pierre  </Text>
                                <Text style={{ fontWeight: 'bold' }}> Photographe </Text>
                            </View>
                            {/* Bouton rejeter /recruter */}
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5  }} >
                                <Button
                                    color='#1ADBAC'
                                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                    title="recruter" />
                                <Button
                                    color='#1ADBAC'
                                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                    title="rejeter" />
                            </View>
                        </View>

                        {/* profil 3 */}
                        {/* https://images.unsplash.com/photo-1604684116250-e79276b241fd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436 */}
                        <View style={{ flexDirection: 'column', borderColor: 'black', borderWidth: 0.5, borderRadius: 7, width: 180, height: 210, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10 }}>
                            {/* image profil */}
                            <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, marginTop: 5, alignItems: "center" }}>
                                <Image style={{ width: 170, height: 140, borderRadius: 7 }} source={{ uri: 'https://images.unsplash.com/photo-1604684116250-e79276b241fd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436' }} />
                            </View>

                            {/* Nom et domaine */}
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingBottom:3 }} >
                                <Text style={{ fontWeight: 'bold' }}> Bechir </Text>
                                <Text style={{ fontWeight: 'bold' }}> Photographe </Text>
                            </View>
                            {/* Bouton rejeter /recruter */}
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5  }} >
                                <Button
                                    color='#1ADBAC'
                                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                    title="recruter" />
                                <Button
                                    color='#1ADBAC'
                                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                    title="rejeter" />
                            </View>
                        </View>



                    </ScrollView>
                </View>


                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15 }}>
                    <Text style={{ fontWeight: 'bold' }}> Projets voulant vous recruter   </Text>
                </View>


                {/* projet voulant recruter l'utilisateur  */}

                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, justifyContent: 'space-between' }}>
                    <ScrollView horizontal={true}>

                        {/* Projet 1 */}

                        <View style={{ borderColor: 'black', borderWidth: 0.5, borderRadius: 7, width: 340, height: 200, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10 }}>

                            {/* image et texte  */}
                            <View style={{ width: 340, height: 160, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, flexDirection: 'row' }}>
                                {/* image  */}
                                <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 0, marginRight: 0, marginTop: 10, }}>
                                    <Image style={{ width: 130, height: 130, borderRadius: 7 }} source={{ uri: 'https://images.unsplash.com/photo-1554881070-74595ca2b74c?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170' }} />
                                </View>

                                {/* texte  */}
                                <View style={{ marginTop: 5, marginLeft: 5, width: 200, height: 100, marginRight: 5, }}>
                                    <Text style={{ fontWeight: 'bold', marginRight: 5,  paddingBottom:5 }}> Recherche Modele pour défilé </Text>
                                    <Text style={{ marginRight: 3, }} >La Marque LOREM IPSUM recherche modele , Femme et Homme  pour La Fashion Week. </Text>
                                </View>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', width: 340, justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }}>
                                <Button
                                    color='#1ADBAC'
                                    Style={{ backgroundcolor: '#1ADBAC', marginBottom: 10, marginRight: 10, marginLeft: 10 }}
                                    title="postuler"
                                />
                                <Button
                                    color='#1ADBAC'
                                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                    title="rejeter"
                                />
                            </View>

                        </View>

                        {/* Projet 2 */}

                        {/* https://images.unsplash.com/photo-1614778265188-dff1832ae5a2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464 */}
                        {/* Recherche Mannequin Homme Femme  */}
                        {/* Pour sa nouvelle campagne publicitaire, Artilyst Recherche, mannequin. */}

                        <View style={{ borderColor: 'black', borderWidth: 0.5, borderRadius: 7, width: 340, height: 200, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10 }}>

                    {/* image et texte  */}
                        <View style={{ width: 340, height: 160, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, flexDirection: 'row' }}>
    {/* image  */}
    <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 0, marginRight: 0, marginTop: 10, }}>
        <Image style={{ width: 130, height: 130, borderRadius: 7 }} source={{ uri: 'https://images.unsplash.com/photo-1614778265188-dff1832ae5a2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464' }} />
    </View>

    {/* texte  */}
    <View style={{ marginTop: 5, marginLeft: 5, width: 200, height: 100, marginRight: 5, }}>
        <Text style={{ fontWeight: 'bold', marginRight: 5,  paddingBottom:5 }}> Recherche Mannequin Homme Femme </Text>
        <Text style={{ marginRight: 3, }} >Pour sa nouvelle campagne publicitaire, Artilyst Recherche, mannequin. </Text>
    </View>

</View>

<View style={{ flex: 1, flexDirection: 'row', width: 340, justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }}>
    <Button
        color='#1ADBAC'
        Style={{ backgroundcolor: '#1ADBAC', marginBottom: 10, marginRight: 10, marginLeft: 10 }}
        title="postuler"
    />
    <Button
        color='#1ADBAC'
        buttonStyle={{ backgroundcolor: '#1ADBAC' }}
        title="rejeter"
    />
</View>

</View>

                        

                        {/* Projet 3 */}
                        {/* https://images.unsplash.com/photo-1574446615002-35ec8a8f0da2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070 */}
                        {/* TItre projet    */}
                        {/* lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla */}

                        <View style={{ borderColor: 'black', borderWidth: 0.5, borderRadius: 7, width: 340, height: 200, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10 }}>

                            {/* image et texte  */}
                            <View style={{ width: 340, height: 160, backgroundcolor: '#1ADBAC', marginLeft: 10, marginRight: 10, flexDirection: 'row' }}>
                                {/* image  */}
                                <View style={{ height: 140, backgroundcolor: '#1ADBAC', marginLeft: 0, marginRight: 0, marginTop: 10, }}>
                                    <Image style={{ width: 130, height: 130 }} source={{ uri: 'https://images.unsplash.com/photo-1574446615002-35ec8a8f0da2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070' }} />
                                </View>

                                {/* texte  */}
                                <View style={{ marginTop: 5, marginLeft: 5, width: 200, height: 100 }}>
                                    <Text style={{ fontWeight: 'bold', paddingBottom:5 }}> TItre projet   </Text>
                                    <Text> lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla lorem ipsum blabla bla   </Text>

                                </View>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', width: 340, justifyContent: "space-between", paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }}>
                                <Button
                                    color='#1ADBAC'
                                    Style={{ backgroundcolor: '#1ADBAC', marginBottom: 10, marginRight: 10, marginLeft: 10 }}
                                    title="postuler"
                                />
                                <Button
                                    color='#1ADBAC'
                                    buttonStyle={{ backgroundcolor: '#1ADBAC' }}
                                    title="rejeter"
                                />
                            </View>

                        </View>





                    </ScrollView>
                </View>

                {/* projet voulant recruter l'utilisateur  */}



            </View>

            {/* </ScrollView> */}
        </ScrollView>
    );
}

// * ___________________________ STYLES ___________________________

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        //   backgroundColor: '#fff',

    },
    container: {
        flex: 1,
        //   backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

// * ___________________________ REDUX ___________________________
