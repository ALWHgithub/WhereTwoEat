import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, View,TextInput } from 'react-native';
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
      <Text style={{fontSize:18, textAlign:'center'}}>Please enter your email. {'\n'}A password reset email will be sent to you.</Text>
      <View style={{width: '90%'}}>
      <TextInput placeholder = "Email"  onChangeText = {text => setEmail(text)} style = {styles.input} />
      <StdButton text = "Send email" onPress={changePassword} />
      </View>
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
    input: {
      fontSize: 15,
      margin: 10,
      marginBottom: 3,
      borderBottomColor: "grey",
      borderBottomWidth: 1,
    }
  });