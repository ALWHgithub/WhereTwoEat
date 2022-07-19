import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView, FlatList, View,Alert } from 'react-native';
import RestaurantItem from './components/RestaurantItem';
import { localRestaurants } from './components/RestaurantItem';
import GetLocation from 'react-native-get-location'
import config from '../config'
import StdButton from './components/button';
import { useIsFocused } from '@react-navigation/native';

  
const YELP_API_KEY = config.API_KEY

export default function Restaurants({ navigation,route }) {
    const [pastRestaurantData,setPastRestaurantData] = useState(localRestaurants)
    const [restaurantData,setRestaurantData] = useState(localRestaurants)
    const price = route.params.price
    let cat = route.params.cat
    let loc = route.params.loc
    let term = route.params.term
    
    term = ''

    if (global.vegetarian) {
      term += ',vegetarian'
      cat += ',vegetarian'
    }
    if (global.vegan) {
      term += ',vegan'
      cat += ',vegan'
    }
    if (global.halal) {
      term += ',halal'
      cat += ',halal'
    }

    if(term.length > 1){
      term = term.substring(1);
    } else {
      term = 'restaurant'
    }
    

    

    let yelpURL = `https://api.yelp.com/v3/businesses/search?term=${term}${loc}&price=` + price + '&categories=' + cat + `&offset=${offset}&limit=50`
    console.log("hi")

    function refresh() {
      global.offset += 50
      yelpURL = `https://api.yelp.com/v3/businesses/search?term=${term}${loc}&price=` + price + '&categories=' + cat + `&offset=${offset}&limit=50`
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
        <View style={{flexDirection: 'row',}}>
      </View>
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
      backgroundColor: '#E9E9E9',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
  });
  


