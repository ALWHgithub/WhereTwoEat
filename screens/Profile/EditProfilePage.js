import { authentication } from "../../firebase/firebase-config";
import {sendEmailVerification} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {SafeAreaView,Text,StyleSheet,Alert, View,Button,Dimensions } from 'react-native';
import StdButton from '../components/button';
import {StdButtonBlue} from '../components/button'; 
import Password from '../Profile/ChangePassword'; 

import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc,setDoc,doc
} from 'firebase/firestore'

export default function EditProfilePage({ navigation,route}) {
  const db = getFirestore()
  const colRef = collection(db,'Users')
  const [state, setState] = useState(0)
  const [rooms, setRooms] = useState([])
  const [msg,setMsg] = useState(`Send password reset email to ${global.user.email}`)

  const changePassword = () => {
    sendPasswordResetEmail(authentication,global.user.email).then(() => {
      setMsg(`Password sent. Please check ${global.user.email}`)
    })
  }
  
  const setSettingTrue = (setting) => {
    global[setting] = true;
    console.log(global[setting])
    setState(state+1)
    updateDoc(doc(db,'Users',global.user.uid),{[setting]: global[setting] })
  }

  const setSettingFalse = (setting) => {
    global[setting] = false;
    console.log(global[setting])
    setState(state+1)
    updateDoc(doc(db,'Users',global.user.uid),{[setting]: global[setting] })
  }


  const renderSwitchButton = (setting,name) => {
    if (global[setting]) {
      return <StdButtonBlue text = {name} onPress={() =>setSettingFalse(setting)} />
    } else {
      return <StdButton text = {name} onPress={() =>setSettingTrue(setting)} />
    }
  }
  
  return (
    <SafeAreaView style = {styles.container}>
      <Text style={{fontSize:18}}>Change your dietry prefrences here</Text>
      <View style={{flexDirection:"row",height: windowHeight/5}}>
         {renderSwitchButton("vegetarian","Vegetarian")}
         {renderSwitchButton("vegan","Vegan")}
         {renderSwitchButton("halal","Halal")}
      </View>
      <View >
      <Text style={{fontSize:15}}>{msg}</Text>
      <StdButton text = "Change Password" onPress={changePassword} />
      </View>
    </SafeAreaView>
  );
  }
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingVertical: 14,
      paddingHorizontal: 10,
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
    text: {

    }
  });