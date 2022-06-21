import { authentication } from "../firebase/firebase-config";
import {sendEmailVerification} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {SafeAreaView,Text,StyleSheet,Alert, View } from 'react-native';
import StdButton from './components/button'; 
import Profile from "./ProfilePage";

export default function EditProfilePage({ navigation,route}) {

  const doNothing = () => {
  }

  const handleSaveProfile = () => {
    // navigation.navigate('Profile', {user: route.user, username: route.params.username, email: route.params.user.email});
    // iunno pls halp
  }
  

  return (
    <SafeAreaView style = {styles.container}>
      <Text style={{paddingLeft:10,paddingTop:10,}}>Change Profile Picture</Text>
      <View style={{flexDirection:"row",}}>
        <StdButton text = "in progress" onPress={doNothing} />
        <StdButton text = "in progress" onPress={doNothing} />
      </View>

      <Text style={{paddingLeft:10,paddingTop:10,}}>Change Password</Text>
      <View style={{flexDirection:"row",}}>
        <StdButton text = "View" onPress={doNothing} />
        <StdButton text = "Change" onPress={doNothing} />
      </View>

      <Text style={{paddingLeft:10,paddingTop:10,}}>Do you want only Halal Certified Eateries? {'\n'}
      Current Choice: ...</Text>
      <View style={{flexDirection:"row",}}>
        <StdButton text = "Halal" onPress={doNothing} />
        <StdButton text = "Non-Halal" onPress={doNothing} />
      </View>

      <Text style={{paddingLeft:10,paddingTop:10,}}>Any Dietary Restrictions?{'\n'}
      Current Choice: ...</Text>
      <View style={{flexDirection:"row",}}>
        <StdButton text = "Vegetarian" onPress={doNothing} />
        <StdButton text = "No Seafood" onPress={doNothing} />
        <StdButton text = "No Nuts" onPress={doNothing} />
      </View>

      <Text style={{paddingLeft:10,paddingTop:10,}}>Spice Tolerance?{'\n'}
      Current Choice: ...</Text>
      <View style={{flexDirection:"row",flexWrap:'wrap'}}>
        <StdButton text = "No Spice" onPress={doNothing} />
        <StdButton text = "Little Spice" onPress={doNothing} />
        <StdButton text = "Medium Spice" onPress={doNothing} />
        <StdButton text = "Large Spice" onPress={doNothing} />
      </View>

      <StdButton text = "Save" onPress={handleSaveProfile} />
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