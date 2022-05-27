import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {TextInput, KeyboardAvoidingView,StyleSheet,Text,View, Button ,TouchableOpacity} from 'react-native';
import { authentication } from "../firebase/firebase-config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import StdButton from '../button';


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword,] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication,email,password)
    .then(re => {
      setIsSignedIn(true)
      navigation.navigate('Home')
    })
    .catch(error => alert(error.message))
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication,email,password)
    .then(re => {
      setIsSignedIn(true)
      navigation.navigate('Home')
    })
    .catch(error => alert(error.message))
  }

    return (
      <KeyboardAvoidingView 
         style={styles.container}
         behaviour = "padding"
      >
        <View style = {styles.inputContainer}>
           <Text style = {{ fontWeight: 'bold', fontSize: 50}} >Where Two Eat!</Text>
           <TextInput placeholder = "Email" value = {email} onChangeText = {text => setEmail(text)} style = {styles.input} />
           <TextInput placeholder = "Password" secureTextEntry value = {password} onChangeText = {text => setPassword(text)} style = {styles.input}/>

          
           <TouchableOpacity
              onPress={handleSignIn}
              style = {styles.button}
           >
             <Text>Login</Text>
           </TouchableOpacity>
           <TouchableOpacity
              onPress={handleSignUp}
              style = {styles.button}
           >
             <Text>Register</Text>
           </TouchableOpacity>
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

      borderColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,

      justifyContent: 'center',
      paddingHorizontal: 10,
      marginVertical: 5,
    }, 
    input: {
      backgroundColor: 'white',
      
      borderColor: '#e8e8e8',
      borderWidth: 1,
      
      alignItems: "center",
      justifyContent: 'center',

      borderRadius: 5,
      height: 40,
      paddingHorizontal: 10,
      marginVertical: 5,
    }, 
    button: {
      backgroundColor: 'orange',

      alignItems: "center",
      justifyContent: 'center',

      borderRadius: 5,
      height: 40,
      paddingHorizontal: 10,
      marginVertical: 5,
    },
  });

  export default LoginScreen;