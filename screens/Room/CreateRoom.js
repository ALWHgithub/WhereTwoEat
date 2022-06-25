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
  

  const createRoom = () => {
    setDoc(doc(db,'RoomIDs',code),{name: code, 1:0, 2:0, 3:0, 4:0})
    navigation.navigate('Room',{name: code})
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text>Pick a Name for your room!</Text>
        <TextInput placeholder = "Name"  onChangeText = {text => setCode(text)} style = {styles.input} />
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