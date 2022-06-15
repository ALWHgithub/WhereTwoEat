import { authentication } from "../firebase/firebase-config";
import {sendEmailVerification} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {SafeAreaView,Text,StyleSheet,Alert} from 'react-native';
import StdButton from '../button';

export default function Verification({ navigation,route}) {
  const actionCodeSettings = {
    url: 'https://www.google.com',
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  }

  const sendEmail = () => {
    sendEmailVerification(authentication.currentUser)
  }

  const handleSignIn = () => {
    if(route.params.user.emailVerified) {
      navigation.navigate('HomeStack', {user: route.params.user, email: route.params.email, username: route.params.username})
    } else {
      sendEmailVerification(authentication.currentUser)
    }
  }


    return (
      <SafeAreaView style = {styles.container}>
        <Text style={{textAlign:"center",}}>Please verify your email!</Text>
        <StdButton text = "Send anther email" onPress={sendEmail} />
        <StdButton text = "I'm verified !" onPress={handleSignIn} />
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
  });