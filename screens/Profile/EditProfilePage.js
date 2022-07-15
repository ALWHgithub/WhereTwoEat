import { authentication } from "../../firebase/firebase-config";
import {sendEmailVerification} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {SafeAreaView,Text,StyleSheet,Alert, View,Button } from 'react-native';
import StdButton from '../components/button';
import {StdButtonBlue} from '../components/button'; 
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc,setDoc,doc
} from 'firebase/firestore'

export default function EditProfilePage({ navigation,route}) {
  const db = getFirestore()
  const colRef = collection(db,'Users')
  const [state, setState] = useState(0)
  const [rooms, setRooms] = useState([])
  
  const setVegetarianTrue = () => {
    global.vegetarian = true;
    console.log(global.vegetarian)
    setState(state+1)
    updateDoc(doc(db,'Users',global.user.uid),{vegetarian: global.vegetarian })
  }

  const setVegetarianFalse = () => {
    global.vegetarian = false;
    console.log(global.vegetarian)
    setState(state+1)
    updateDoc(doc(db,'Users',global.user.uid),{vegetarian: global.vegetarian })
  }


  const renderVegetarian = () => {
    if (global.vegetarian) {
      return <StdButtonBlue text = "Vegetarian" onPress={setVegetarianFalse} />
    } else {
      return <StdButton text = "Vegetarian" onPress={setVegetarianTrue} />
    }
  }

  const saveChanges = () => {
    updateDoc(doc(db,'Users',global.user.uid),{vegetarian: global.vegetarian })
  }
  

  return (
    <SafeAreaView style = {styles.container}>
      <Text style={{paddingLeft:10,paddingTop:10,}}>Any Dietary Restrictions?</Text>
      <View style={{flexDirection:"row",}}>
         {renderVegetarian()}
      </View>
      <StdButton text = "Save changes" onPress={() =>saveChanges()}/>
    </SafeAreaView>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
    blue: {
      borderRadius: 5,
      paddingVertical: 14,
      paddingHorizontal: 10,
      backgroundColor: 'blue',
      marginHorizontal: 5,
      alignItems: "center",
      justifyContent: 'center',
      marginVertical: 5,
    },
  });