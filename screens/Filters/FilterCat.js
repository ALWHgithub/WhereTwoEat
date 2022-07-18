import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Button } from 'react-native';
import StdButton from "../components/button";
import Slider from '@react-native-community/slider'; 
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

function FilterCat({ navigation,route }) {
  const [cat, setCat] = useState('Restaurant')
  const [range, setRange] = useState(1);
  
  const handlePrice = (fig) => {
    return JSON.stringify(fig)
  }

  const toLoc = (cat) => {
      navigation.navigate('Loc', {price: handlePrice(range), cat: cat})
  }

  const toRes = (cat) => {
      navigation.navigate('Restaurant', {room:false , price: handlePrice(range), cat: cat, loc: `&location=Singapore`})
  }


  const renderButton = (price) => {
    return <TouchableOpacity  onPress={() => {setRange(price)}} >
    <FontAwesome5 name="dollar-sign" size ={25} color = "#000000"/>
		</TouchableOpacity>
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
      <View style={{flexDirection: 'row',}}>
      {renderButton(1)}
      {renderButton(2)}
      {renderButton(3)}
      {renderButton(4)}
      </View>
  


      </View>
      <View style={{flexDirection: 'row'}}>
      </View>
      <Text>What Cuisine ?</Text>

      <View style={{flexDirection: 'row'}}>
      <StdButton text = "Chinese" onPress={() =>setCat('chinese')} />
      <StdButton text = "Japanese" onPress={() =>setCat('japanese')} />
      <StdButton text = "Italian" onPress={() =>setCat('italian')} />
      <StdButton text = "All" onPress={() =>setCat('restaurant')} />
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