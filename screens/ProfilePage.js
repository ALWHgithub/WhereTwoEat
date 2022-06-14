import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView } from 'react-native';
import StdButton from '../button';

export default function Profile({ navigation,route,props }) {
  const handleSignOut = () => {
    route.params.MasterNav.navigate("Login")
  }


    return (
    <SafeAreaView style={styles.container}>
        <Text>Hey there, {route.params.Username} !</Text>
        <Text>Your email is {route.params.User.email}</Text>
        <StdButton text = "Logout ?" onPress={handleSignOut} />
    </SafeAreaView>
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