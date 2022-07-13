import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {TextInput, KeyboardAvoidingView,StyleSheet,Text,View, Button ,TouchableOpacity, ImageBackground} from 'react-native';
import { authentication } from "../firebase/firebase-config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, applyActionCode} from "firebase/auth";
import StdButton from './components/button';

import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc,doc, deleteDoc, getDoc
} from 'firebase/firestore'

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('Anonymous User');
  const [email, setEmail] = useState('');
  const [password, setPassword,] = useState('');
  const db = getFirestore()
  const [code,setCode] = useState()
  
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

  const updateData = (id,user) => {
    const colRef = collection(db,'Users')
    global.user = user
    updateDoc(doc(db,'Users',id),{name: id, email:email})
    getDocs(colRef)
    .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if(doc.id == id){
          global.fav = doc.data().fav
          console.log(global.fav.length)
        }
      })
    })
  }

  const createAccount = () => {
    createUserWithEmailAndPassword(authentication,email,password)
      .then((userCredential) => {
      const user = userCredential.user;
      global.user = user
      setDoc(doc(db,'Users',user.uid),{name: user.uid, email:email, vegetarian: false, fav:[]})
      global.vegetarian = false
      sendEmailVerification(authentication.currentUser)
      navigation.navigate('Verification', {user: user, email: email, username: username})
    })
    .catch(error => alert(handleSignUpError(error.message)))
  }

  const handleSignUp = () => {
    signInWithEmailAndPassword(authentication,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      global.user = user
      updateDoc(doc(db,'Users',user.uid),{name: user.uid, email:email})
      if(user.emailVerified) {
        alert("This email account is already in use")
      } else {
        console.log(user.uid)
        deleteDoc(doc(db,'Users',user.uid)).then(() => {
          user.delete()
          createAccount()
        })
      }
    })
    .catch(error => {
      createAccount()
    })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateData(user.uid,user).then(() => {
        if(user.emailVerified) {
          navigation.navigate('HomeStack', {user: user, email: email, username: username})
        } else {
          sendEmailVerification(authentication.currentUser)
          navigation.navigate('Verification', {user: user, email: email, username: username})
        }
      })
      
    })
    .catch(error => alert(handleSignInError(error.message)))
  }

  const handleSignInAdmin = () => {
    navigation.navigate('HomeStack', {user: user, email: email, username: username})
  }

    return (
      <KeyboardAvoidingView 
         style={styles.container}
         behaviour = "padding"
      >
        <View style = {styles.inputContainer}>
          <ImageBackground source={require('../assets/WhereTwoEatLogin.png')} resizeMode="cover" style = {styles.image}>
           {/* <Text style = {{ fontWeight: 'bold', fontSize: 50}} >Where Two Eat!</Text> */}
          <TextInput placeholder = "Nickname"  onChangeText = {text => setUsername(text)} style = {styles.input} />
          <TextInput placeholder = "Email" value = {email} onChangeText = {text => setEmail(text)} style = {styles.input} />
          <TextInput placeholder = "Password" secureTextEntry value = {password} onChangeText = {text => setPassword(text)} style = {styles.input}/>
          <StdButton text = "Login" onPress={handleSignIn} />
          <StdButton text = "Im new!" onPress={handleSignUp} />
          <StdButton text = "Hackerman" onPress={handleSignInAdmin} />
          </ImageBackground>
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
      // paddingHorizontal: 10,
      // marginVertical: 5,
    }, 
    image: {
      flex: 1,
      justifyContent: "center"
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      
      borderColor: '#e8e8e8',
      borderWidth: 1,
      
      borderRadius: 3,
      padding: 10,
      margin: 5,
      // marginHorizontal: 5,
    }, 

  });

  export default LoginScreen;