import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import StdButton from "../components/button";
import Slider from '@react-native-community/slider'; 

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

import * as Location from 'expo-location';

export default function FilterLoc({navigation,route}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loc, setLoc] = useState('Singapore');
  let useLoc = false;
  let long = '';
  let lat = ''
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  
  if (errorMsg) {
    long = errorMsg;
  } else if (location) {
    long = JSON.stringify(location.coords.longitude);
    lat = JSON.stringify(location.coords.latitude);
  }

  const useMyLocation = () => {
    let curLoc = `&longitude=${JSON.stringify(location.coords.longitude)}&latitude=${JSON.stringify(location.coords.latitude)}`
    navigation.navigate('Restaurant', {room:false, term:restaurant, price: route.params.price, loc:curLoc, cat: route.params.cat})
  }


  const toRestraunt = () => {
    let curLoc = `&location=${loc}`
    navigation.navigate('Restaurant', {room:false, term:restaurant, price: route.params.price, loc: curLoc, cat: route.params.cat,})
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder = "Name of Place"  onChangeText = {text => setLoc('Singapore,' + text)} style = {styles.input} />
      <StdButton text = "Search Location" onPress={() => toRestraunt()} />
      <StdButton text = "Proceed" onPress={() => useMyLocation()} />
    </View>
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
  input: {
    backgroundColor: 'white',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
  }, 
});
 
  
 
  