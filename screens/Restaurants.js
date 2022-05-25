import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView } from 'react-native';
import RestaurantItem from '../RestaurantItem';

// bearer token hidden for commit to gitHub, will eventually replace with proper solution
const YELP_API_KEY = '-';

function RestaurantScreen() {
    const getDataFromYelp = () => {
      const yelpURL = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=Singapore';
    
  
    const apiOptions = {
      headers: {
        Authorization : `Bearer ${YELP_API_KEY}`,
      }
    }
  
      return fetch(yelpURL,apiOptions).then((res) => res.json())
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <Text>Here are the restaurants !</Text>
        <ScrollView showsVerticalScrollIndication = {true}>
          <RestaurantItem />
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
  
  export default RestaurantScreen;