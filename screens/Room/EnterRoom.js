import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView, Button, TextInput } from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc
} from 'firebase/firestore'
import StdButton from '../components/button';

const createRoom = (username,navigation) => {
    navigation.navigate('CreateRoom', {username: username})
}

const enterRoom = (code,navigation) => {
  navigation.navigate('Room',{name: code})
}

export default function App({route,navigation}) {
  const [code,setCode] = useState()
  return (
    <SafeAreaView style={styles.container}>
        <StdButton text = "Create Room" onPress={() => createRoom(route.params.username, navigation)}/>
        <TextInput placeholder = "Name"  onChangeText = {text => setCode(text)} style = {styles.input} />
        <StdButton text = "Enter Existing Room" onPress={() => enterRoom(code, navigation)}/>
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
  });