import { authentication } from "../firebase/firebase-config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, applyActionCode} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {SafeAreaView,Text} from 'react-native';
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
    if(route.params.User.emailVerified) {
      navigation.navigate('HomeStack', {Email: route.params.Email, Username: route.params.Username})
    } else {
      sendEmailVerification(authentication.currentUser)
    }
  }


    return (
      <SafeAreaView >
        <Text>Please verify your email!</Text>
        <StdButton text = "Send anther email" onPress={sendEmail} />
        <StdButton text = "I'm verified !" onPress={handleSignIn} />
      </SafeAreaView>
    );
  }