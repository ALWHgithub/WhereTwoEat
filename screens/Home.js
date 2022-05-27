import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet,Text,SafeAreaView, Divider } from 'react-native';
import StdButton from '../button';
import BottomTabs from './BottomBar';

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Start new order ?</Text>
      <StdButton
        text="Start New Order ?" 
        onPress={() => navigation.navigate('Price')}
      />
      <StatusBar style="auto" />
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

export default HomeScreen;
