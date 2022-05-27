import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import PriceScreen from './Price';
import Restaurtants from './Restaurants';
import { LogBox } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from './BottomBar'


LogBox.ignoreAllLogs(true)
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};

export default function App() {
  return (
    <NavigationContainer   independent={true}>
      <Stack.Navigator screenOptions={screenOptions}  options={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Price" component={PriceScreen} />
        <Stack.Screen name="Restaurant" component={Restaurtants} />
      </Stack.Navigator>
      <BottomBar navigation={HomeScreen.navigation}/>
    </NavigationContainer>
  );
}