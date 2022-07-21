import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView,Image } from 'react-native';
import StdButton from '../components/button';
import { authentication } from "../../firebase/firebase-config";
import {sendPasswordResetEmail} from "firebase/auth";

export default function Password({ navigation,route}) {
  const [msg,setMsg] = useState(`Click to send an email to ${global.user.email}`)

  const changePassword = () => {
    sendPasswordResetEmail(authentication,global.user.email).then(() => {
      setMsg(`Password sent. Please check ${global.user.email}`)
    })
  }

    return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:23}}>{msg}</Text>
      <StdButton text = "Change Password" onPress={changePassword} />
    </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fff',
      paddingBottom: 20,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  });