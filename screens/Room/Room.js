import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView, Button, TextInput } from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc
} from 'firebase/firestore'
import StdButton from '../components/button';


export default function App({route,navigation}) {
  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  const [rooms, setRooms] = useState([])

  getDocs(colRef).then((snapshot) => {
    let temp = []
    snapshot.docs.forEach((doc) => {
      temp.push({...doc.data(), id: doc.id})
    })
    return temp
  })
  .then((temp) => {
    setRooms(temp)
  })
  .catch(err => {
    console.log(err);
  })

  const renderRoomName = () => {
    if (rooms.length == 0) {
      return <Text>Please Wait!</Text>
    } else {
      return <Text>{JSON.stringify(rooms[0].Username1)}</Text>
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        {renderRoomName()}
        <TextInput placeholder = "Nickname"  onChangeText = {text => setUsername(text)} style = {styles.input} />
        <StdButton text = "Add to room" />
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