import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './screens/homeStack';
import LoginScreen from './screens/Login'
import { LogBox } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from './screens/BottomBar'


LogBox.ignoreAllLogs(true)
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};
export default function App() {
  return (
    <NavigationContainer   independent={true}>
      <Stack.Navigator screenOptions={screenOptions}  options={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="HomeStack" component={HomeStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

