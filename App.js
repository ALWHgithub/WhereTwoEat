import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Start new order ?</Text>
      <Button title = "New Order" onPress = {handleNewOrder(navigation)} />
      <Button
        title="Go to Price"
        onPress={() => navigation.navigate('Price')}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function PriceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>What price ?</Text>
      <Button title = "New Order" onPress = {handleNewOrder} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
let currRequest = null;
export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Price" component={PriceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
