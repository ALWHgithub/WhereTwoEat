import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import { authentication } from "../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc
} from 'firebase/firestore'

export default function App({route,navigation}) {
  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  getDocs(colRef).then((snapshot) => {
    let rooms = []
    snapshot.docs.forEach((doc) => {
      rooms.push({...doc.data(), id: doc.id})
    })
    console.log(rooms)
  })
  .catch(err => {
    console.log(err);
  })

  addDoc(colRef,{
    Username1: "test",
    email1: "test",
  })


  return (
    <SafeAreaView style={styles.container}>
        <Text>Hello!</Text>
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
  });