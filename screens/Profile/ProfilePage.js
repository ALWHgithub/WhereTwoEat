import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView,Image,View } from 'react-native';
import StdButton from '../components/button';
import { authentication } from "../../firebase/firebase-config";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut} from "firebase/auth";
import Favourites from "./Favourites";

export default function Profile({ navigation,route}) {
  const handleSignOut = () => {
    signOut(authentication)
    route.params.masternav.navigate("Login")
  }
  const handleEditProfilePage = () => {
    navigation.navigate('EditProfile', {user: route.user, username: route.params.username, email: route.params.user.email});
  }
  const handleFavourites = () => {
    navigation.navigate('Favourites', {user: route.user, username: route.params.username, email: route.params.user.email});
  }
  const changePassword = () => {
    navigation.navigate('Password', {});
  }

    return (
    <SafeAreaView style={styles.container}>
      <Text style= {{fontSize:25, padding: 20, fontWeight:'bold'}}>Hey there, {route.params.username} !</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap' }}>
        <StdButton text = "Edit Profile" onPress={handleEditProfilePage} />
        {/* <StdButton text = "See Favourites" onPress={handleFavourites} /> */}
        {/* <StdButton text = "Change Password" onPress={changePassword} /> */}
        <StdButton text = "Logout ?" onPress={handleSignOut} />
      </View>
      <Text style= {{fontSize:14, padding:10, color:'orange', fontWeight:'bold'}}>Favourites</Text>
      <View style={{backgroundColor:'orange', width:150, height:2}}></View>
      <Favourites navigation = {navigation}/>
    </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });