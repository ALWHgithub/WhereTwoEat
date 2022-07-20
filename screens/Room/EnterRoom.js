import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView,Dimensions, Button, TextInput, ImageBackground } from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc,doc
} from 'firebase/firestore'
import StdButton from '../components/button';

import * as Location from 'expo-location';


export default function App({route,navigation}) {
  if(global.room != '') {
    navigation.navigate('Room',{name: global.room, navigation})
  }

  const [name,setName] = useState('')
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
  

const getLocation = () => {
    setLocPerm(locPerm+1)
}

  return (
    <SafeAreaView style={styles.parentContainer}>
      {/* <ImageBackground source={require('../../assets/WhereTwoEatGroupOrderSimple.png')} resizeMode="cover" style = {styles.image}> */}
        
        <Text style={{ textAlign: "center", fontSize:30, fontWeight:'bold',}}>Join the room! {'\n'}</Text>

        <View style={{ padding:5, margin: 10, borderRadius: 5, flexDirection: 'row', }}>
        <TextInput placeholder = "Name"  onChangeText = {text => setName(text)} style = {styles.roomNameInput} />
        <View style={{ left: windowWidth - 245, padding:5.7, margin: 5, position: `absolute` }}>
        <StdButton text = "Enter" onPress={() => enterRoom(name, navigation)}/>
        </View>
        </View>
        <View style={styles.bottomButton}>
        <StdButton text = "Create a new Room" onPress={() => createRoom(name, navigation)} />
        </View>
      {/* </ImageBackground> */}
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
      backgroundColor: '#e9e9e9',
      // borderColor: '#e8e8e8',
      // borderWidth: 1,
      height: 60,
      width: windowWidth - 150,
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 15,
      // specifically for text to not clash with enter button
      paddingRight: 100,
      margin: 5,
    },
    bottomButton : {
      position: 'absolute',
      bottom:30,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: 'center',
    },
    image: {
      flex: 1,
      justifyContent: "center",
      width: windowWidth,
    },
  });