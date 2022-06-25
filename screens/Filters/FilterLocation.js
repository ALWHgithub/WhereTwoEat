import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import StdButton from "../components/button";
import Slider from '@react-native-community/slider'; 

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
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

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.longitude);
  }

  const toRestraunt = () => {
    navigation.navigate('Restaurant', {price: route.params.price, cat: route.params.cat,
       long: JSON.stringify(location.coords.longitude),
       lat: JSON.stringify(location.coords.latitude),
        range: range})
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Text>All restruants in {range} km </Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={1}
        maximumValue={10}
        step={1}
        thumbTintColor="orange"
        onValueChange={value => setRange(parseInt(value))}
        maximumTrackTintColor="#000000"        
        minimumTrackTintColor = 'orange'
      />
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
});
 
  