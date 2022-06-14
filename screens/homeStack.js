import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import FilterScreen from './FilterOrder';
import Restaurtants from './Restaurants';
import Profile from "./ProfilePage";


import { LogBox } from "react-native"
import BottomBar from './BottomBar'


LogBox.ignoreAllLogs(true)
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};

export default function App({route,navigation}) {
  const handleSignOut = () => {
    navigation.navigate('Login')
  }

  return (
    <NavigationContainer   independent={true}>
      
      <Stack.Navigator screenOptions={screenOptions}  options={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Price" component={FilterScreen} />
        <Stack.Screen name="Restaurant" component={Restaurtants} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
      <BottomBar navigation={HomeScreen.navigation} email = {route.params.Email} username = {route.params.Username} user = {route.params.User} masternav = {navigation}/>
    </NavigationContainer>
  );
}