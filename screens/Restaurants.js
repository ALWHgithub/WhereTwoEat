import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Button, ScrollView, View} from 'react-native';
import RestaurantItem from './components/RestaurantItem';
import { localRestaurants } from './components/RestaurantItem';
import config from '../config'
import {renderRestrauntsText} from './components/RestaurantComponents'
import StdButton from "./components/button";
  
const YELP_API_KEY = config.API_KEY

export default function Restaurants({ navigation,route }) {
    const [pastRestaurantData,setPastRestaurantData] = useState(localRestaurants)
    const [restaurantData,setRestaurantData] = useState(localRestaurants)
    const [msg,setMsg] = useState('')
    const price = route.params.price
    let cat = route.params.cat
    let loc = route.params.loc
    
    let term = ''
    if (global.vegetarian) {
      term += ',vegetarian'
    }
    if (global.vegan) {
      term += ',vegan'
    }
    if (global.halal) {
      term += ',halal'
    }

    if(term.length > 1){
      term = term.substring(1);
    } else {
      term = 'restaurants'
    }
    

    let yelpURL = `https://api.yelp.com/v3/businesses/search?term=${term}${loc}&price=` + price + '&categories=' + cat + `&offset=${offset}&limit=50`
    console.log(yelpURL)

    function refresh() {
      global.offset += 50
      if(global.offset > 999){
        alert("No more results")
      } else {
        yelpURL = `https://api.yelp.com/v3/businesses/search?term=${term}${loc}&price=` + price + '&categories=' + cat + `&offset=${offset}&limit=50`
        getDataFromYelp();
      }
    }

    const getDataFromYelp = () => {
      const addJson = (json) => {
        if(json.hasOwnProperty('error')){
          alert(json.error.description)
        } else if(json.total == 0){
          alert("No results found. Consider relaxing your criteria")
          setMsg('none')
        }
        else {
          setRestaurantData(pastRestaurantData.concat(json.businesses))
          setMsg('')
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

    const renderButton = () => {
      if(restaurantData == undefined || restaurantData.length == 0){
        return 
      } else {
        return <StdButton onPress = {refresh} text = "Get more results"></StdButton>
      }
    }


    return (
      <SafeAreaView style={styles.container}>
        {renderRestrauntsText(restaurantData,msg)}
        <View style={{flexDirection: 'row',}}>
      </View>
        <ScrollView showsVerticalScrollIndication = {false}>
        <RestaurantItem restaurantData = {restaurantData} navigation = {navigation}></RestaurantItem>
          {renderButton()}
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
  


