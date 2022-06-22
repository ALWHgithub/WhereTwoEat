import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import StdButton from "../components/button";
import Slider from '@react-native-community/slider'; 



function FilterPrice({ navigation,route }) {
  const [finalPrice, setPrice] = useState('');
  const [range, setRange] = useState(1);

  const handlePrice = (fig) => {
    setPrice(fig);
    navigation.navigate('Cat', {price: fig})
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text>What price ? {"$".repeat(range)} </Text>
      <View>
      {/* <View style={{flexDirection: 'row'}}>
      <StdButton text = "$$$$" onPress={() =>handlePrice('$$$$')} />
      <StdButton text = "$$$" onPress={() =>handlePrice('$$$')} />
      <StdButton text = "$$" onPress={() =>handlePrice('$$')} />
      <StdButton text = "$" onPress={() =>handlePrice('$')} /> */}

      <Slider
        style={{width: 200, height: 40}}
        minimumValue={1}
        maximumValue={4}
        step={1}
        thumbTintColor="orange"
        onValueChange={value => setRange(parseInt(value))}
        maximumTrackTintColor="#000000"        
        minimumTrackTintColor = 'orange'
      />

      <StdButton text = "Confirm" onPress={() =>handlePrice("$".repeat(range))} />

      </View>
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
  priceButton: {
    flex: 1,
    color: 'orange',
    borderRadius: '25px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FilterPrice;