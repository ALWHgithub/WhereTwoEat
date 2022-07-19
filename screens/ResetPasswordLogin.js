import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView,Image,TextInput } from 'react-native';
import StdButton from './components/button';
import { authentication } from "../firebase/firebase-config";
import {sendPasswordResetEmail} from "firebase/auth";

export default function Password({ navigation,route}) {
  const [email,setEmail] = useState(``)

  const changePassword = () => {
    sendPasswordResetEmail(authentication,email).then(() => {
      alert(`Password sent. Please check ${email}`)
      navigation.navigate('Login', {})
    })
  }

    return (
    <SafeAreaView style={styles.container}>
      <Text>Please enter your email. A password reset email will be sent to you.</Text>
      <TextInput placeholder = "Email"  onChangeText = {text => setEmail(text)} style = {styles.input} />
      <StdButton text = "Send email" onPress={changePassword} />
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
    inputContainer: {
      flex: 1,
      backgroundColor: '#FFDA84', // to put an image here
      width: '100%',

      justifyContent: 'center',
      // paddingHorizontal: 10,
      // marginVertical: 5,
    }, 
  });