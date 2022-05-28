import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView } from 'react-native';

export default function Profile({ route }) {
    return (
    <SafeAreaView style={styles.container}>
        <Text>Hey there, {route.params.Username} !</Text>
        <Text>Your email is {route.params.Email}</Text>
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