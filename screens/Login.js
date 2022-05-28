import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {TextInput, KeyboardAvoidingView,StyleSheet,Text,View, Button ,TouchableOpacity} from 'react-native';
import { authentication } from "../firebase/firebase-config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import StdButton from '../button';


function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('Anonymous User');
  const [email, setEmail] = useState('');
  const [password, setPassword,] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication,email,password)
    .then(re => {
      setIsSignedIn(true)
      navigation.navigate('HomeStack', {Email: email, Username: username})
    })
    .catch(error => alert(error.message))
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication,email,password)
    .then(re => {
      setIsSignedIn(true)
      navigation.navigate('HomeStack', {Email: email, Username: username})
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