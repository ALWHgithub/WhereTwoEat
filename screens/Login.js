import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {TextInput, KeyboardAvoidingView,StyleSheet,Text,View, Button ,TouchableOpacity} from 'react-native';
import { authentication } from "../firebase/firebase-config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, applyActionCode} from "firebase/auth";
import StdButton from './components/button';
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc,doc
} from 'firebase/firestore'

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('Anonymous User');
  const [email, setEmail] = useState('');
  const [password, setPassword,] = useState('');
  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  const [code,setCode] = useState()


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


  const handleSignUpError = (err) => {
    if (err == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
      return "Password should be at least 6 characters."
    } else if (err == "Firebase: Error (auth/email-already-in-use).") {
      return "The provided email is already in use by an existing user. Each user must have a unique email."
    } else if (err == "Firebase: Error (auth/invalid-email).") {
      return "The Email used is invalid."
    } else {
      return "An error has occurred, please check your email or password again."
    }
  }

  const handleSignInError = (err) => {
    if (err == "Firebase: Error (auth/wrong-password).") {
      return "Incorrect password."
    } else if (err == "Firebase: Error (auth/user-not-found).") {
      return "User not recognised."
    } else if (err == "Firebase: Error (auth/invalid-email).") {
      return "The Email used is invalid."
    } else if (err == "Firebase: Error (auth/internal-error).") {
      return "Incorrect email or password."
    } else {
      return "An error has occurred, please check your email or password again."
    }
  }



  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      global.user = user
      setDoc(doc(db,'Users',user.uid),{name: user.uid, vegetarian: false })
      global.vegetarian = false
      sendEmailVerification(authentication.currentUser)
      navigation.navigate('Verification', {user: user, email: email, username: username})
    })
    .catch(error => alert(error.message))
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      global.user = user
      updateDoc(doc(db,'Users',user.uid),{name: user.uid})

      if(user.emailVerified) {
        navigation.navigate('HomeStack', {user: user, email: email, username: username})
      } else {
        sendEmailVerification(authentication.currentUser)
        navigation.navigate('Verification', {user: user, email: email, username: username})
      }
    })
    .catch(error => alert(handleSignInError(error.message)))
  }

    return (
      <KeyboardAvoidingView 
         style={styles.container}
         behaviour = "padding"
      >
        <View style = {styles.inputContainer}>
           <Text style = {{ fontWeight: 'bold', fontSize: 50}} >Where Two Eat!</Text>
           <TextInput placeholder = "Nickname"  onChangeText = {text => setUsername(text)} style = {styles.input} />
           <TextInput placeholder = "Email" value = {email} onChangeText = {text => setEmail(text)} style = {styles.input} />
           <TextInput placeholder = "Password" secureTextEntry value = {password} onChangeText = {text => setPassword(text)} style = {styles.input}/>
           <StdButton text = "Login" onPress={handleSignIn} />
           <StdButton text = "Register" onPress={handleSignUp} />

        </View>
        
      </KeyboardAvoidingView>
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
      paddingHorizontal: 10,
      marginVertical: 5,
    }, 
    input: {
      backgroundColor: 'white',
      
      borderColor: '#e8e8e8',
      borderWidth: 1,
      

      borderRadius: 5,
      padding: 10,
      margin: 5,


    }, 
  });

  export default LoginScreen;