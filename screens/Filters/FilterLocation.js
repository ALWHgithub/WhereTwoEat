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
  const [range, setRange] = useState(1);
  const [loc, setLoc] = useState('');
  
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

  let long = 'Waiting..';
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
        range: range})
  }

  return (
    <View style={styles.container}>
      <Text>I am willing to travel {range} m from the location</Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={1000}
        maximumValue={10000}
        step={1000}
        thumbTintColor="orange"
        onValueChange={value => setRange(parseInt(value))}
        maximumTrackTintColor="#000000"        
        minimumTrackTintColor = 'orange'
      />
      <TextInput placeholder = "Name of Place"  onChangeText = {text => setLoc(text)} style = {styles.input} />
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
 
  