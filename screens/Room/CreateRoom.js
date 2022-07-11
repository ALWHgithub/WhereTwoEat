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
  let exists = false

  const createRoom = () => {
    const db = getFirestore()
    const colRef = collection(db,'RoomIDs')
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
        setDoc(doc(db,'RoomIDs',code),{name: code, 1:0, 2:0, 3:0, 4:0, Chinese:0, Japanese:0, Italian:0, Others:0})
        navigation.navigate('Room',{name: code})
      }
    })
    
  }

  const changeText = (text) => {
    exists = false
    setCode(text)
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text>Pick a Name for your room!</Text>
        <TextInput placeholder = "Name"  onChangeText = {text => changeText(text)} style = {styles.input} />
        <StdButton text = "Create Room" onPress={() => createRoom()}/>
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
      backgroundColor: 'white',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      margin: 5,
    },
  });