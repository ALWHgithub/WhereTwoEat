import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView,Dimensions, Button, TextInput } from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc,doc
} from 'firebase/firestore'
import StdButton from '../components/button';

import * as Location from 'expo-location';


export default function App({route,navigation}) {
  if(global.room != '') {
    console.log(global.room)
    navigation.navigate('Room',{name: global.room, navigation})
  }

  const [name,setName] = useState()
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locPerm, setLocPerm] = useState(0);
  const [long,setLong] =useState(0)
  const [lat,setLat] = useState(0)
  let temp = []

  const createRoom = (username,navigation) => {
    navigation.navigate('CreateRoom', {username: username,long:long, lat:lat})
  }

 const enterRoom = (name,navigation) => {
  let valid = false
  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((Doc) => {
      if(Doc.id == name){
        valid = true
        global.room = name
        console.log(long)
        console.log(lat)
        navigation.navigate('Room',{name: name, long:long, lat:lat})
      }
    })
    return temp
  }).then(() => {
    if(!valid) {
      alert("No room with that name")
    }
  })
 }

 useEffect(() => {
  if(locPerm != 0)
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
}, [locPerm]);


  useEffect(()=> {
    if (errorMsg) {
      long = errorMsg;
    } else if (location) {
     setLong(location.coords.longitude)
     setLat(location.coords.latitude)
    }
  },[location])
  
  console.log(long)

const getLocation = () => {
    setLocPerm(locPerm+1)
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