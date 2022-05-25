import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView } from 'react-native';
import RestaurantItem from '../RestaurantItem';
import { localRestaurants } from '../RestaurantItem';
import config from '../config'

const YELP_API_KEY = config.API_KEY;

export default function Restaurants() {
    const [restaurantData,setRestaurantData] = useState(localRestaurants)
    const getDataFromYelp = () => {
      const yelpURL = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=Singapore';
      const apiOptions = {
        headers: {
          Authorization : `Bearer ${YELP_API_KEY}`,
        },
      }
  
      return fetch(yelpURL, apiOptions)
      .then((res) => res.json())
      .then((json) =>setRestaurantData(json.businesses));
    };

    useEffect(() => {
      getDataFromYelp();
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
        <Text>Here are the restaurants !</Text>
        <ScrollView showsVerticalScrollIndication = {false}>
          <RestaurantItem restaurantData = {restaurantData}/>
        </ScrollView>
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
  });
  
