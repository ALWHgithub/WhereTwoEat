import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView } from 'react-native';
import RestaurantItem from './components/RestaurantItem';
import { localRestaurants } from './components/RestaurantItem';
import GetLocation from 'react-native-get-location'
import config from '../config'
import StdButton from './components/button';

const YELP_API_KEY = config.API_KEY

export default function Restaurants({ navigation,route }) {
    const [pastRestaurantData,setPastRestaurantData] = useState(localRestaurants)
    const [restaurantData,setRestaurantData] = useState(localRestaurants)
    const price = route.params.price
    let cat = route.params.cat
    const [range, setRange] = useState(route.params.range)
    const loc = route.params.loc
    const long = route.params.long
    const lat = route.params.lat
    let term = ''
    if (global.vegetarian) {
      term += 'vegetarian'
    }

    let yelpURL = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${loc}&price=` + price + '&categories=' + cat + `&offset=${offset}&limit=50`
    function refresh() {
      console.log(offset)
      global.offset += 50
      yelpURL = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${loc}&price=` + price + '&categories=' + cat + `&offset=${offset}&limit=50`
      getDataFromYelp();
    }

    const getDataFromYelp = () => {
      const addJson = (json) => {
        if(json.hasOwnProperty('error')){
          alert(json.error.description)
        } else {
          setRestaurantData(pastRestaurantData.concat(json.businesses))
          return json
        }
      }
      const apiOptions = {
        headers: {
          Authorization : `Bearer ${YELP_API_KEY}`,
        },
      }
      
      let data = fetch(yelpURL, apiOptions)
      .then((res) => res.json())
      .then((json) => addJson(json))
      .catch(error => alert(error.message))

      return data
    };

    const updateData = () => {
      setPastRestaurantData(restaurantData);
    }

    useEffect(() => {
        getDataFromYelp();
      }, [])
    useEffect(() => {
      updateData();
    }, [restaurantData]);

    const renderRestrauntsText = () => {
      if(restaurantData.length == 0) {
        return <Text>Sorry, it dosen't seem like there are any restaurants</Text>
      } else {
        return <Text>Here are the Restaurants !</Text>
      }
    }
    

    return (
      <SafeAreaView style={styles.container}>
        {renderRestrauntsText()}
        <ScrollView showsVerticalScrollIndication = {false}>
        <RestaurantItem restaurantData = {restaurantData} navigation = {navigation}></RestaurantItem>
          <Button onPress = {refresh} title = "Refresh"></Button>
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
      paddingTop: 20,
    },
  });
  


