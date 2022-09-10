import React, { useEffect, useState } from "react";
import {TextInput, KeyboardAvoidingView,StyleSheet,Text,View, Button ,TouchableOpacity, ImageBackground, ActivityIndicator,Dimensions} from 'react-native';
import { authentication } from "../firebase/firebase-config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut} from "firebase/auth";
import StdButton from './components/button';

import {
  getFirestore,setDoc,doc, deleteDoc
} from 'firebase/firestore'

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword,] = useState('');
  const db = getFirestore()
  const [code,setCode] = useState()
  console.log(authentication.config.apiKey)
  
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

  const createAccount = () => {
    createUserWithEmailAndPassword(authentication,email,password)
      .then((userCredential) => {
      const user = userCredential.user;
      global.user = user
      setDoc(doc(db,'Users',user.uid),{name: user.uid, email:email, vegetarian: false, fav:[]})
      sendEmailVerification(authentication.currentUser)
      navigation.navigate('Verification', {user: user, email: email, username: username, msg: "Please verify your email"})
    })
    .catch(error => alert(handleSignUpError(error.message)))
  }

  const handleSignUp = () => {
    if(password.length < 6) {
      alert("Password must be at least 6 letters")
    } 
    else if(username.length < 4) {
      alert("Please make your username at least 4 letters")
    } else {
    global.username = username
    signInWithEmailAndPassword(authentication,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      global.user = user
      if(user.emailVerified) {
        alert("This email account is already in use")
      } else {
        console.log(user.uid)
        deleteDoc(doc(db,'Users',user.uid)).then(() => {
          createAccount()
        })
      }
    })
    .catch(error => {
      createAccount()
    })
   }
  }

  const handleSignIn = () => {
    if(password.length < 6) {
      alert("Password must be at least 6 letters")
    } else if(username.length < 4) {
      alert("Please make your username at least 4 letters")
    }else{
      
      signInWithEmailAndPassword(authentication,email,password)
      .then((userCredential) => {
        const user = userCredential.user;
        global.user = user
        if(user.emailVerified) {
          global.room = ''
          global.username = username
          navigation.navigate('HomeStack', {user: user, email: email, username: username})
        } else {
          sendEmailVerification(authentication.currentUser)
          navigation.navigate('Verification', {user: user, email: email, username: username, msg: "This email has not been verified."})
        }

    })
      .catch(error => alert(handleSignInError(error.message)))
    }
  }

  const resetPassword = () => {
    navigation.navigate('ResetPasswordLogin', {})
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
          <View style = {styles.bottomButton}>
          <StdButton text = "Forgot Password" onPress={resetPassword}/>
          </View>
          </ImageBackground>
        </View>
        
      </KeyboardAvoidingView>
    );
  }
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    container2: {
      flex: 1,
      justifyContent: "center",
      opacity: 0.7
    },
    bottomButton : {
      width:200,
      position: 'absolute',
      bottom:30,
      right: (windowWidth-200)/2,
    },
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0)',
      
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    inputContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0)', // to put an image here
      width: '100%',

      justifyContent: 'center',
      // paddingHorizontal: 10,
      // marginVertical: 5,
    }, 
    image: {
      flex: 1,
      justifyContent: "center",
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowWidth,
      height: windowHeight,
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