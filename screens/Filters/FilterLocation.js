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

  let long = '';
  let lat = ''
  if (errorMsg) {
    long = errorMsg;
  } else if (location) {
    long = JSON.stringify(location.coords.longitude);
    lat = JSON.stringify(location.coords.latitude);
  }

  const toRestraunt = () => {
    navigation.navigate('Restaurant', {price: route.params.price,
       loc: loc,
       cat: route.params.cat,
       long: JSON.stringify(location.coords.longitude),
       lat: JSON.stringify(location.coords.latitude),
      })
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder = "Name of Place"  onChangeText = {text => setLoc('Singapore,' + text)} style = {styles.input} />
      <StdButton text = "Confirm" onPress={() => toRestraunt()} />
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
 
  
 
  