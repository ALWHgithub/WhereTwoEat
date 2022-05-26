import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import StdButton from '../button';

function PriceScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text>What price ?</Text>
      <View style={{flexDirection: 'row'}}>
      <StdButton text = "$$$$" onPress={() =>handlePrice("$$$$",navigation)} />
      <StdButton text = "$$$" onPress={() =>handlePrice("$$$",navigation)} />
      <StdButton text = "$$" onPress={() =>handlePrice("$$",navigation)} />
      <StdButton text = "$" onPress={() =>handlePrice("$",navigation)} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function handlePrice(price,navigation) {
  navigation.navigate('Restaurant', {Price: price})
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceButton: {
    flex: 1,
    color: 'orange',
    borderRadius: '25px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PriceScreen;