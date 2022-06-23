import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView } from 'react-native';
import RestaurantItem from './components/RestaurantItem';
import { localRestaurants } from './components/RestaurantItem';
import GetLocation from 'react-native-get-location'
import config from '../config'
import StdButton from './components/button';

const YELP_API_KEY = config.API_KEY;

export default function Reviews({ navigation,route}) {
  const [reviews, setReviews] = useState('')
  const apiOptions = {
    headers: {
      Authorization : `Bearer ${YELP_API_KEY}`,
    },
  }
  let yelpURL = `https://api.yelp.com/v3/businesses/${route.params.restaurant.id}/reviews`


  const getDataFromYelp = () => {
    let data = fetch(yelpURL, apiOptions)
      .then((res) => res.json())
      .then((json) => setReviews(json))
  }

  useEffect(() => {
    getDataFromYelp();
  }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Text>{JSON.stringify(reviews)}</Text>
        </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

