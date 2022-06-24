import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView, Dimensions, Image } from 'react-native';
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
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    getDataFromYelp();
  }, [])

  const renderReviews = () => {
    if (reviews == undefined) {
      return <Text>Please wait!</Text>
    } else {
      return <Text>{JSON.stringify(reviews)}</Text>
    }
  }


  // JSON.stringify(reviews);
    return (
        // Note that I won't be using safe area view here
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Image source={{ uri: route.params.image }} style={{ width: "100%", height: 180 }} />
            <RestaurantAbout route={route}/>

            {/* To make this into a ReviewItem class soonTM */}
            {renderReviews()}
            
            

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

