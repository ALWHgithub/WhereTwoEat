import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import StdButton from "../components/button";

function FilterCat({ navigation }) {
  const [finalPrice, setPrice] = useState('$$');

  const handlePrice = (fig) => {
    setPrice(fig);
    navigation.navigate('Cat', {Price: finalPrice})
    }


  return (
    <SafeAreaView style={styles.container}>
      <Text>What price ?</Text>
      <View style={{flexDirection: 'row'}}>
      <StdButton text = "$$$$" onPress={() =>handlePrice('$$$$')} />
      <StdButton text = "$$$" onPress={() =>handlePrice('$$$')} />
      <StdButton text = "$$" onPress={() =>handlePrice('$$')} />
      <StdButton text = "$" onPress={() =>handlePrice('$')} />
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

export default FilterCat;