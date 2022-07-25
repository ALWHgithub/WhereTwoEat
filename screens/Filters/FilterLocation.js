import React, { useEffect, useState } from "react";
import StdButton from "../components/button";


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
  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  
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
    sleep(1000).then(() => {
      if(location.coords == null || location.coords == undefined){
        alert("Unable to get device location.Ensure that location permissions are enabled")
      } else {
        let curLoc = `&longitude=${JSON.stringify(location.coords.longitude)}&latitude=${JSON.stringify(location.coords.latitude)}`
        navigation.navigate('Restaurant', {room:false, term:'restaurant', price: route.params.price, loc:curLoc, cat: route.params.cat})
      }
      
    })
    
  }


  const toRestraunt = () => {
    let curLoc = `&location=${loc}`
    navigation.navigate('Restaurant', {room:false, term:'restaurant', price: route.params.price, loc: curLoc, cat: route.params.cat,})
  }

  return (
    <View style={styles.container}>
      <View style={{width:'90%'}}>
      <Text style={{fontSize: 18, textAlign:'center'}}>Please fill in the name of the location below {'\n'}(eg. Yishun)</Text>
      
      <TextInput placeholder = "Name of Location"  onChangeText = {text => setLoc('Singapore,' + text)} style = {styles.input} />
      <StdButton text = "Search Location" onPress={() => toRestraunt()} />
      <StdButton text = "Use Current Location" onPress={() => useMyLocation()} />
      </View>
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
    backgroundColor: '#e9e9e9',
    // borderColor: '#e8e8e8',
    // borderWidth: 1,
    height: 50,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  }, 

});
 
  
 
  