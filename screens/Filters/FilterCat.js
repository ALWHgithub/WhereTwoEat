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

  const catButton = (num,thisCat,name) => {
    if(cat == thisCat){
      return <StdButtonBlue text = {name} onPress={() =>setCat(thisCat)} />
    } else {
      return <StdButtonRandomColor text = {name} num={num} onPress={() =>setCat(thisCat)} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{fontSize:18, textAlign: 'center'}}>You have chosen : {"$".repeat(route.params.price)}> */}
      <Text  style={{fontSize:18,}}>What price ? </Text>
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
        {catButton(0,'chinese','Chinese')}
        {catButton(1,'japanese','Japanese')}
        {catButton(2,'italian','Italian')}
        {catButton(3,'cafes','Cafes')}
        {catButton(0,'hotdogs','Fast food')}
        {catButton(1,'indian','Indian')}
        {catButton(2,'kopitiam','Kopitiam')}
        {catButton(3,'korean','Korean')}
        {catButton(0,'malaysian','Malaysian')}
        {catButton(1,'mexican','Mexican')}
        {catButton(2,'thai','Thai')}
        {catButton(3,'vietnamese','Vietnamese')}
        {catButton(1,'restaurant','All')}
      </View>
      <View style={styles.nestedViewStyle}><Text>{'     '}</Text></View>
      <StdButton text = "Filter Based on Location" onPress={() =>toLoc(cat)} icon = "map-marker"/>
      <StdButton text = "Apply Filters !" onPress={() =>toRes(cat)} />
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