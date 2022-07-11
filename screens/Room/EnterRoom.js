import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView, Button, TextInput } from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc
} from 'firebase/firestore'
import StdButton from '../components/button';




export default function App({route,navigation}) {
  if(global.room != '') {
    navigation.navigate('Room',{name: global.room, navigation})
  }

  const [name,setName] = useState()
  let temp = []

const createRoom = (username,navigation) => {
    navigation.navigate('CreateRoom', {username: username})
}

const enterRoom = (code,navigation) => {
  let valid = false
  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if(doc.id == name){
        valid = true
        global.room = code
        navigation.navigate('Room',{name: code})
      }
    })
    return temp
  }).then(() => {
    if(!valid) {
      alert("No room with that name")
    }
  })
}



  return (
    <SafeAreaView style={styles.container}>
        <Text>You can create a new room for you and your friends !</Text>
        <StdButton text = "Create Room" onPress={() => createRoom(route.params.username, navigation)}/>
        <Text>Or enter the name of a room you want to enter!</Text>
        <TextInput placeholder = "Name"  onChangeText = {text => setName(text)} style = {styles.input} />
        <StdButton text = "Enter Existing Room" onPress={() => enterRoom(name, navigation)}/>
        
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
    input: {
      backgroundColor: 'white',
      
      borderColor: '#e8e8e8',
      borderWidth: 1,
      

      borderRadius: 5,
      padding: 10,
      margin: 5,


    },
  });