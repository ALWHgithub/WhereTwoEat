import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {TextInput, KeyboardAvoidingView,StyleSheet,Text,View, Button ,TouchableOpacity} from 'react-native';
import { authentication } from "../firebase/firebase-config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";



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
           <Text>Login here!</Text>
           <TextInput placeholder = "Email" value = {email} onChangeText = {text => setEmail(text)} />
           <TextInput placeholder = "Password" secureTextEntry value = {password} onChangeText = {text => setPassword(text)}/>

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
  });

  export default LoginScreen;