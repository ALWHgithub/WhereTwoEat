import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import PriceScreen from './screens/Price';
import Restaurtants from './screens/Restaurants';
import LoginScreen from './screens/Login'

const Stack = createNativeStackNavigator();
let currRequest = null;


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Price" component={PriceScreen} />
        <Stack.Screen name="Restaurant" component={Restaurtants} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

