import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView, Image } from 'react-native';
import RestaurantItem from './components/RestaurantItem';
import { localRestaurants } from './components/RestaurantItem';
import GetLocation from 'react-native-get-location';
import config from '../config';
import StdButton from './components/button';
import RestaurantAbout from './components/RestaurantAbout';

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
        // Note that I won't be using safe area view here
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Image source={{ uri: route.params.image }} style={{ width: "100%", height: 180 }} />
            <RestaurantAbout route={route}/>

            {/* To make this into a ReviewItem class soonTM */}
            {/* <Text>{JSON.stringify(reviews)}</Text> */}
            
            <Text>{JSON.stringify(reviews['reviews'][0]['rating'])}</Text>
            <Text>{JSON.stringify(reviews['reviews'][0]['time_created'])}</Text>
            <Image source={{ uri: reviews['reviews'][0]['user']['image_url'] }} style={{ width: 50, height: 50 }} />
            {/* <Text>{JSON.stringify(reviews['reviews'][0]['user']['image_url'])}</Text> */}
            <Text>{reviews['reviews'][0]['text']}</Text>

            <Text>{JSON.stringify(reviews['reviews'][1]['rating'])}</Text>
            <Text>{JSON.stringify(reviews['reviews'][1]['time_created'])}</Text>
            <Image source={{ uri: reviews['reviews'][1]['user']['image_url'] }} style={{ width: 50, height: 50 }} />
            {/* <Text>{JSON.stringify(reviews['reviews'][0]['user']['image_url'])}</Text> */}
            <Text>{reviews['reviews'][1]['text']}</Text>            
            
            <Text>{JSON.stringify(reviews['reviews'][2]['rating'])}</Text>
            <Text>{JSON.stringify(reviews['reviews'][2]['time_created'])}</Text>
            <Image source={{ uri: reviews['reviews'][2]['user']['image_url'] }} style={{ width: 50, height: 50 }} />
            {/* <Text>{JSON.stringify(reviews['reviews'][0]['user']['image_url'])}</Text> */}
            <Text>{reviews['reviews'][2]['text']}</Text>

            <Text></Text>
          </ScrollView>
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

