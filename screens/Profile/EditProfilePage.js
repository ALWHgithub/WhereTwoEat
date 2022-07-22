import { authentication } from "../../firebase/firebase-config";
import {sendEmailVerification} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {SafeAreaView,Text,StyleSheet,Alert, View,Button,Dimensions,TouchableOpacity,Linking } from 'react-native';
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
      <View style = {{paddingVertical: 50}}>
        <Text style={{fontSize:40,}}>Edit your Profile!</Text> 
      </View> 
      <View style = {[styles.container, 
        {borderTopLeftRadius:70, 
        borderTopRightRadius:70, 
        backgroundColor: '#fff',
        height: 0.8 * windowHeight} ]}>
      <Text style={{fontSize:18}}>Change your dietary prefrences here</Text>
      <View style={{flexDirection:"row",height: windowHeight/5}}>
         {renderSwitchButton("vegetarian","Vegetarian")}
         {renderSwitchButton("vegan","Vegan")}
         {renderSwitchButton("halal","Halal")}
      </View>
      <View >
      <Text style={{fontSize:15}}>{msg}</Text>
      <StdButton text = "Change Password" onPress={changePassword} />
      </View>
        {/* Questionable text that does nothing other than to reduce whitespace */}
        <View style={{bottom:10, position: 'absolute' ,flexDirection:'row'}}>
        <TouchableOpacity  onPress={() => {Linking.openURL('https://docs.google.com/document/d/1sVSfM3ns2Fub6Dxdra0PnMcqfz-OeUFZKz-QKTHpEkk/edit?usp=sharing')}}>
         <Text>About</Text>
        </TouchableOpacity>
        <Text> • </Text>
        <TouchableOpacity  onPress={() => {Linking.openURL('https://github.com/samuelcheongws/WhereTwoEat')}}>
         <Text>Source Code</Text>
        </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
  }
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1e1bf',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
      // paddingTop: 20,
      // paddingVertical: 14,
      // paddingHorizontal: 10,
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