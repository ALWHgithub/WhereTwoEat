import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView } from 'react-native';
import StdButton from '../components/button';

export default function Profile({ navigation,route}) {
  const handleSignOut = () => {
    route.params.masternav.navigate("Login")
  }
  const handleEditProfilePage = () => {
    navigation.navigate('EditProfile', {user: route.user, username: route.params.username, email: route.params.user.email});
  }
  const handleFavourites = () => {
    navigation.navigate('Favourites', {user: route.user, username: route.params.username, email: route.params.user.email});
  }

    return (
    <SafeAreaView style={styles.container}>
      <Text>Hey there, {route.params.username} !</Text>
      <Text>Your email is {global.user.email}</Text>
    <SafeAreaView>
      <StdButton text = "Edit Profile" onPress={handleEditProfilePage} />
      <StdButton text = "See Favourites" onPress={handleFavourites} />
      <StdButton text = "Logout ?" onPress={handleSignOut} />
    </SafeAreaView>
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