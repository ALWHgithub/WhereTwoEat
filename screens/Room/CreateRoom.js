import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView, Button, TextInput, Dimensions } from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc,doc
} from 'firebase/firestore'
import StdButton from '../components/button';
import {StdButtonBlue} from '../components/button';

export default function App({route,navigation}) {
  const defaultValue = () => {
    if(global.username == undefined){
      return "Your room!"
    } else {
      return global.username + '\'s Room'
    }
  }


  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  const [code,setCode] = useState(defaultValue())
  const [state, setState] = useState(0)

  let exists = false
  const long = route.params.long
  const lat = route.params.lat
  const [loc,setLoc] = useState('Singapore')

  const createRoom = () => {
    let roomSetting = ''
        if(global.roomVegetarian){
          roomSetting += ',vegetarian'
        }
        if(global.roomVegan){
          roomSetting += ',vegan'
        }
        if(global.roomHalal){
          roomSetting += ',halal'
        }

        if(roomSetting.length > 1){
          roomSetting = roomSetting.substring(1);
        } else {
          roomSetting = 'restaurant'
        }
    getDocs(colRef)
    .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if(doc.id == code){
        alert("A room with that name already exists")
        exists = true
        }
      })
    })
    .then( () => {
      if(!exists) {
        global.room = code
        console.log(roomSetting)
        setDoc(doc(db,'RoomIDs',code),{name: code, 1:0, 2:0, 3:0, 4:0,
          Chinese:0,
          Japanese:0,
          Italian:0,
          Others:0,
          Cafe:0,
          Fastfood:0,
          Indian:0,
          term:roomSetting, loc: loc, num:0,})
        navigation.navigate('Room',{name: code, long:long, lat:lat})
      }
    })
  }

  const changeText = (text) => {
    exists = false
    setCode(text)
  }

  const setSettingTrue = (setting) => {
    global[setting] = true;
    console.log(global[setting])
    setState(state+1)
  }

  const setSettingFalse = (setting) => {
    global[setting] = false;
    console.log(global[setting])
    setState(state+1)
  }

  const renderSwitchButton = (setting,name) => {
    if (global[setting]) {
      return <StdButtonBlue text = {name} onPress={() =>setSettingFalse(setting)} />
    } else {
      return <StdButton text = {name} onPress={() =>setSettingTrue(setting)} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Pick a Name for your room!</Text>
        <TextInput  defaultValue={defaultValue()}  onChangeText = {text => changeText(text)} style = {styles.input} />
        
        <Text style={styles.text}>{'\n'}Room Options</Text>
        <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>
        {renderSwitchButton("roomVegetarian","vegetarian")}
        {renderSwitchButton("roomVegan","vegan")}
        {renderSwitchButton("roomHalal","halal")}
        </View>

        <Text style={styles.text}>{'\n'}Search specific locations (eg. Yishun). 
        Please restrict your selection to a place in Singapore</Text>
        <TextInput  defaultValue="Singapore"  onChangeText = {text => setLoc(text)} style = {styles.input} />
        <View style={styles.bottomButton}>
        <StdButton text = "Create Room" onPress={() => createRoom()}/>
        </View> 
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    priceButton: {
      flex: 1,
      color: 'orange',
      borderRadius: '25px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: '#e9e9e9',
      // borderColor: '#e8e8e8',
      // borderWidth: 1,
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 15,
      margin: 5,
      minWidth: '60%',
      textAlign: 'center',
      // color: "pink",
      fontSize: 15,
    },
    text: {
      textAlign: "center", 
      fontSize:20,
      padding: 10,
    },
    bottomButton : {
      position: 'absolute',
      // bottom:30,
      top: windowHeight - 150,
    }
  });