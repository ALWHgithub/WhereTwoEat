import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView } from 'react-native';
import RestaurantItem from '../RestaurantItem';
import { localRestaurants } from '../RestaurantItem';
import GetLocation from 'react-native-get-location'
import config from '../config'
import StdButton from '../button';

const YELP_API_KEY = config.API_KEY;
let offset = 0

export default function Restaurants({ route }) {
    const [pastRestaurantData,setPastRestaurantData] = useState(localRestaurants)
    const [restaurantData,setRestaurantData] = useState(localRestaurants)
    const [price, setPrice] = useState(route.params.Price);
    const [cat, setCat] = useState(route.params.Cat)
    
    let yelpURL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=Singapore&offset=${offset}&limit=50`
    function refresh() {
      console.log(offset)
      offset += 50
      yelpURL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=Singapore&offset=${offset}&limit=50`
      getDataFromYelp();
    }

    const getDataFromYelp = () => {
      const filter = (business,price,cat) => {
        let filterPrice = business.price == price;
        let filterCat =true;
        if(cat == 'Others'){
          filterCat = !(business.categories.find(element => element.title == cat) != undefined)
        } else if (cat != 'Others'){
            filterCat = business.categories.find(element => element.title == cat) != undefined
          }
          return filterPrice && filterCat
        }
        
      const addJson = (json) => {
        setRestaurantData(pastRestaurantData.concat(json.businesses.filter((business) =>filter(business,price,cat)))
          )
        return json
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
    }, [restaurantData])
    

    

    return (
      <SafeAreaView style={styles.container}>
        <Text>Here are the restaurants !</Text>
        <ScrollView showsVerticalScrollIndication = {false}>
          <RestaurantItem restaurantData = {restaurantData}>
          </RestaurantItem>
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
    },
  });
  
