import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';


let currRequest = null;
export default function App() {
  
  //const handleNewOrder = () => currRequest = new Request(0,0);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>Start new order ?</Text>
      <Button title = "Price ?" onPress = {handleNewOrder} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function handleNewOrder() {
  currRequest = new Request(0,0);
  console.log(currRequest.price);
}

class Request {
  price = 0;
  distance = 0;
  constructor(price,distance) {
    this.price = price;
    this.distance = distance;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
