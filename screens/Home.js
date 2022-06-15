import React, { useEffect, useState, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet,Text,SafeAreaView, Divider, ScrollView } from 'react-native';
import StdButton from './components/button';
import BottomTabs from './BottomBar';
import RestaurantItem from '../RestaurantItem';
import { localRestaurants, VertRestaurantItem } from '../RestaurantItem';
import GetLocation from 'react-native-get-location'
import config from '../config'

const YELP_API_KEY = config.API_KEY;


function HomeScreen({ navigation }) {

  let offset = 0
  const [restaurantData,setRestaurantData] = useState(localRestaurants)
     
    
  const getDataFromYelp = () => {
    const yelpURL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=Singapore&offset=${offset}&limit=50`
    
    const apiOptions = {
      headers: {
        Authorization : `Bearer ${YELP_API_KEY}`,
      },
    }
    
    return fetch(yelpURL, apiOptions)
    .then((res) => res.json())
    .then((json) =>setRestaurantData(
      json.businesses
      ))
    .catch(error => alert(error.message));
  };

  useEffect(() => {
      getDataFromYelp();
    }, []);


  return (
    <SafeAreaView style={styles.container}>

        <ScrollView 
        showsHorizontalScrollIndication = {false} 
        horizontal
        // ref = {scroll_ref}
        contentContainerStyle = {{alignItems: 'center',}}
        >
          <VertRestaurantItem restaurantData = {restaurantData}/>
        </ScrollView>
      <Text>   </Text>
      <StdButton
        text="Start New Order ?" 
        onPress={() => navigation.navigate('Price')}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// const autoScroll = () => {
//   this.refs[scroll_ref].scrollTo({x: 50});
// }

// componentDidMount() {
//   this.autoScroll;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
