import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';


function PriceScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text>What price ?</Text>
      <Button 
        title = "$$$" 
        onPress={() => handlePrice(3)} />
        <Button
        title="Go to Restaurant"
        onPress={() => navigation.navigate('Restaurant')}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function handlePrice(price) {
  currRequest = new Request(price,0);
  console.log(price);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PriceScreen;