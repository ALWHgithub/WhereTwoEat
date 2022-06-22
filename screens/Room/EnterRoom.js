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

export default function App({route,navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <StdButton text = "Create Room" onPress={() => createRoom(route.params.username, navigation)}/>
        <StdButton text = "Enter Existing Room" />
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