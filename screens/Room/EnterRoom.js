import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView,Dimensions, Button, TextInput } from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc
} from 'firebase/firestore'
import StdButton from '../components/button';




export default function App({route,navigation}) {
  if(global.room != '') {
    console.log(global.room)
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
    <SafeAreaView style={styles.parentContainer}>
        <Text>Enter a room!</Text>
        <TextInput placeholder = "Name"  onChangeText = {text => setName(text)} style = {styles.roomNameInput} />
        <StdButton text = "Enter Existing Room" onPress={() => enterRoom(name, navigation)}/>
        <View style={styles.bottomButton}>
        <StdButton text = "Create a new Room" onPress={() => createRoom(name, navigation)} />
        </View>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    parentContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    roomNameInput: {
      backgroundColor: 'white',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      margin: 5,
    },
    bottomButton : {
      position: 'absolute',
      bottom:30,
    }
  });