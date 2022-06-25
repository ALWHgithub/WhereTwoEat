import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView, Button, TextInput } from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import Slider from '@react-native-community/slider'; 
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc,doc
} from 'firebase/firestore'
import StdButton from '../components/button';


export default function App({route,navigation}) {
  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  const [rooms, setRooms] = useState([])
  const [range, setRange] = useState(1);

  getDocs(colRef).then((snapshot) => {
    let temp = []
    snapshot.docs.forEach((doc) => {
      if(doc.id == route.params.name){
        temp.push({...doc.data(), id: doc.id})
      }
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
      return <Text>{JSON.stringify(rooms[0].id)}</Text>
    }
  }

  const renderCount = () => {    
    if(rooms.length == 0) {
      return <Text>Please Wait!</Text>
    } else {
      return <Text>$: {rooms[0][1]} $$: {rooms[0][2]} $$$: {rooms[0][3]} $$$$: {rooms[0][4]}</Text>
    }
  }

  const castVote = () => {
    let name = global.user.uid
    let count = rooms[0][range]
    let valid = rooms[0][name] == undefined
    if(valid) {
      updateDoc(doc(db,'RoomIDs',rooms[0].id),{ [name] : true, [range] : count +1 })
      setRooms(rooms)
      console.log(rooms)
    } else {
      alert("No double voting!")
    }
    
  }

  


  return (
    <SafeAreaView style={styles.container}>
        {renderCount()}
        {renderRoomName()}
        <Text>Currently Selected:  {"$".repeat(range)}</Text>
        <Slider
        style={{width: 200, height: 40}}
        minimumValue={1}
        maximumValue={4}
        step={1}
        thumbTintColor="orange"
        onValueChange={value => setRange(parseInt(value))}
        maximumTrackTintColor="#000000"        
        minimumTrackTintColor = 'orange'
      />
      <StdButton text = "Cast Vote!" onPress={() => castVote()} />
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