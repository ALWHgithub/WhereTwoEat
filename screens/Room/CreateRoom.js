import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView, Button, TextInput } from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc,doc
} from 'firebase/firestore'
import StdButton from '../components/button';


export default function App({route,navigation}) {
  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  const [code,setCode] = useState()
  const [roomSettings,setRoomSettings] = useState('restaurant')
  let exists = false
  const long = route.params.long
  const lat = route.params.lat

  const createRoom = () => {
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
        setDoc(doc(db,'RoomIDs',code),{name: code, 1:0, 2:0, 3:0, 4:0, Chinese:0, Japanese:0, Italian:0, Others:0, term:roomSettings, long:0 ,lat:0, num:0,})
        navigation.navigate('Room',{name: code, long:long, lat:lat})
      }
    })
  }

  const changeText = (text) => {
    exists = false
    setCode(text)
  }

  const setVegetarian = () => {
    setRoomSettings('vegetarian')
  }

  const defaultValue = () => {
    if(global.username == undefined){
      return "Your room!"
    } else {
      return global.username + '\'s Room'
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Pick a Name for your room!</Text>
        <TextInput  defaultValue={defaultValue()}  onChangeText = {text => changeText(text)} style = {styles.input} />
        
        <Text style={styles.text}>Room Options</Text>
        <StdButton text = "Vegetarian" onPress={() => setVegetarian()}/>
        <View style={styles.bottomButton}>
        <StdButton text = "Create Room" onPress={() => createRoom()}/>
        </View> 
    </SafeAreaView>
  );
}

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
    },
    text: {
      textAlign: "center", 
      fontSize:20,
      padding: 10,
    },
    bottomButton : {
      position: 'absolute',
      bottom:30,
    }
  });