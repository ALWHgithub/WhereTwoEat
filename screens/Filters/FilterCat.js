import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Button } from 'react-native';
import StdButton from "../components/button";
import {StdButtonBlue, StdButtonRandomColor} from '../components/button';
import catButton from '../components/button';
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
      navigation.navigate('Restaurant', {room:false ,term:'restaurant', price: handlePrice(range), cat: cat, loc: `&location=Singapore`})
  }


  const renderButton = (price) => {
    let op = 0.5;
    if(price <= range){
      op = 1;
    }
    return <TouchableOpacity  onPress={() => {setRange(price)}}>
    <FontAwesome name="dollar" size ={55} color = "#000000" style ={{opacity : op , borderWidth: 10, borderColor: 'white'}}/>
		</TouchableOpacity>
  }

  const catButton = (thisCat,name) => {
    if(cat == thisCat){
      return <StdButtonBlue text = {name} onPress={() =>setCat(thisCat)} />
    } else {
      return <StdButtonRandomColor text = {name} onPress={() =>setCat(thisCat)} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{fontSize:18, textAlign: 'center'}}>You have chosen : {"$".repeat(route.params.price)}> */}
      <Text  style={{fontSize:18,}}>What price ? {"$".repeat(range)} {'\n'} </Text>
      <View>
      {/* <View style={{flexDirection: 'row'}}>
      <StdButton text = "$$$$" onPress={() =>handlePrice('$$$$')} />
      <StdButton text = "$$$" onPress={() =>handlePrice('$$$')} />
      <StdButton text = "$$" onPress={() =>handlePrice('$$')} />
      <StdButton text = "$" onPress={() =>handlePrice('$')} /> */}
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
      {renderButton(1)}
      {renderButton(2)}
      {renderButton(3)}
      {renderButton(4)}
      </View>
  


      </View>
      <View style={{flexDirection: 'row'}}>
      </View>
      <Text style={{fontSize:18,}}>{'\n'}What Cuisine ?</Text>

      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'}}>
        {catButton('chinese','Chinese')}
        {catButton('japanese','Japanese')}
        {catButton('italian','Italian')}
        {catButton('cafes','Cafes')}
        {catButton('hotdogs','Fast food')}
        {catButton('indian','Indian')}
        {catButton('kopitiam','Kopitiam')}
        {catButton('korean','Korean')}
        {catButton('malaysian','Malaysian')}
        {catButton('mexican','Mexican')}
        {catButton('thai','Thai')}
        {catButton('vietnamese','Vietnamese')}
        {catButton('restaurant','All')}
      </View>
      <View style={styles.nestedViewStyle}><Text>{'     '}</Text></View>
      <StdButton text = "Filter Based on Location" onPress={() =>toLoc(cat)} icon = "map-marker"/>
      <StdButton text = "Apply Filter !" onPress={() =>toRes(cat)} />
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