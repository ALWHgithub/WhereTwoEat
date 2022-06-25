import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Button } from 'react-native';
import StdButton from "../components/button";
 

function FilterCat({ navigation,route }) {
  const [cat, setCat] = useState('Others')
  const price = route.params.price
  const toLoc = (cat) => {
      navigation.navigate('Loc', {price: route.params.price, cat: cat})
  }

  const toRes = (cat) => {
      navigation.navigate('Restaurant', {price: route.params.price, cat: cat, lat: 1.3521, long:103.8198, range: 10})

    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
      <Text>You have chosen : {route.params.price} </Text>
      </View>

      <Text>What Cuisine ?</Text>

      <View style={{flexDirection: 'row'}}>
      <StdButton text = "Chinese" onPress={() =>setCat('Chinese')} />
      <StdButton text = "Japanese" onPress={() =>setCat('Japanese')} />
      <StdButton text = "All" onPress={() =>setCat('Others')} />
      </View>
      <View style={styles.nestedViewStyle}><Text>{'     '}</Text></View>
      <StdButton text = "Filter Based on Location" onPress={() =>toLoc(cat)} />
      <StdButton text = "Get Results !" onPress={() =>toRes(cat)} />
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
  priceButton: {
    flex: 1,
    color: 'orange',
    borderRadius: '25px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nestedViewStyle: {
    width: 0,
    borderBottomWidth: 1,
    marginVertical: 5
  },
});

export default FilterCat;