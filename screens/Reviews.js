import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView, Dimensions, Image,View } from 'react-native';
import RestaurantItem from './components/RestaurantItem';
import { localRestaurants } from './components/RestaurantItem';
import GetLocation from 'react-native-get-location';
import config from '../config';
import StdButton from './components/button';
import RestaurantAbout from './components/RestaurantAbout';

const YELP_API_KEY = config.API_KEY;

export default function Reviews({ navigation,route}) {
  const [reviews, setReviews] = useState(['Please Wait!','Please Wait!','Please Wait!'])
  const apiOptions = {
    headers: {
      Authorization : `Bearer ${YELP_API_KEY}`,
    },
  }
  let yelpURL = `https://api.yelp.com/v3/businesses/${route.params.restaurant.id}/reviews`


  const getDataFromYelp = () => {
    let data = fetch(yelpURL, apiOptions)
      .then((res) => res.json())
      .then((json) => parseReviews(json))
      .catch(error => alert(error.message))
  }

  const parseReviews = (reviews) => {
    let temp = []
    temp[0] = JSON.stringify(reviews['reviews'][0]['text'])
    temp[1] = JSON.stringify(reviews['reviews'][1]['text'])
    temp[2] = JSON.stringify(reviews['reviews'][2]['text'])
    setReviews(temp)
  }

  useEffect(() => {
    getDataFromYelp()
  })

    return (
        // Note that I won't be using safe area view here
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Image source={{ uri: route.params.image }} style={{ width: "100%", height: 180 }} />
            <RestaurantAbout route={route}/>

            {/* To make this into a ReviewItem class soonTM */}
            <Text>{reviews[0]}</Text>
            <Text>{reviews[1]}</Text>
            <Text>{reviews[2]}</Text>
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

