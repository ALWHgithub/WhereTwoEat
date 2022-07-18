import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, ScrollView, Dimensions, Image,View, Linking } from 'react-native';
import RestaurantItem from './components/RestaurantItem';
import { localRestaurants } from './components/RestaurantItem';
import GetLocation from 'react-native-get-location';
import config from '../config';
import StdButton from './components/button';
import RestaurantAbout from './components/RestaurantAbout';
import { TouchableOpacity } from "react-native-web";

const YELP_API_KEY = config.API_KEY

export default function Reviews({ navigation,route}) {
  const [reviews, setReviews] = useState(['Please Wait!','Please Wait!','Please Wait!'])
  const [count,setCount] = useState(0)
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
    if(reviews.error != undefined){
      console.log(reviews.error)
      for (let i = 0; i < 12; i++) {
        temp[i] = "Error"
      }
      setReviews(temp)
    } else {
    // Original code. The lack of JSON.stringify mgiht lead to errors
    // temp[0] = JSON.stringify(reviews['reviews'][0]['rating'])
    // temp[1] = JSON.stringify(reviews['reviews'][0]['time_created'])
    // temp[2] = JSON.stringify(reviews['reviews'][0]['text'])

    // temp[3] = JSON.stringify(reviews['reviews'][1]['rating'])
    // temp[4] = JSON.stringify(reviews['reviews'][1]['time_created'])
    // temp[5] = JSON.stringify(reviews['reviews'][1]['text'])

    // temp[6] = JSON.stringify(reviews['reviews'][2]['rating'])
    // temp[7] = JSON.stringify(reviews['reviews'][2]['time_created'])
    // temp[8] = JSON.stringify(reviews['reviews'][2]['text'])

    temp[0] = reviews['reviews'][0]['rating']
    temp[1] = reviews['reviews'][0]['time_created']
    temp[2] = reviews['reviews'][0]['text']

    temp[3] = reviews['reviews'][1]['rating']
    temp[4] = reviews['reviews'][1]['time_created']
    temp[5] = reviews['reviews'][1]['text']

    temp[6] = reviews['reviews'][2]['rating']
    temp[7] = reviews['reviews'][2]['time_created']
    temp[8] = reviews['reviews'][2]['text']

    // If these doesn't work to comment it out and there shall be no picture
    temp[9] = reviews['reviews'][0]['user']['image_url']
    temp[10] = reviews['reviews'][1]['user']['image_url']
    temp[11] = reviews['reviews'][2]['user']['image_url']

    setReviews(temp)
    }
    
  }

  const renderReview = (offset,image) => {
    return <View style={styles.reviewStyle}>

              <View style ={{ flexDirection : "row"}}>
                <Image source={{uri : reviews[image] }} style={{height: 60,width: 60, marginBottom: 10, marginRight: 10, borderRadius: 30}}/>
                <Text>
                  Rating: {reviews[offset]} {'\n'}
                  Date Reviewed: {reviews[offset+1]}  {'\n'}
                </Text>
              </View>
              <Text>{reviews[offset+2]}</Text>
            </View>
  }
  
  useEffect(() => {getDataFromYelp()},[])

    return (
        // Note that I won't be using safe area view here
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Image source={{ uri: route.params.image }} style={{ width: "100%", height: 180 }} />
            <RestaurantAbout route={route}/>
            
            {/* Whats oop? :thinking: */}
            {/* To make this into a ReviewItem class soonTM */}
            {renderReview(0,9)}
            {renderReview(3,10)}
            {renderReview(6,11)}
            
            <View style={{paddingHorizontal: 10}}>
              <StdButton text = "See More!" onPress={() => {Linking.openURL('https://www.yelp.com/biz/' + route.params.alias)}}/>
            </View>

              {/* Keeping this in case the above code with image stops working */}

              {/* <Text style={styles.reviewStyle}>
              Rating: {reviews[0]} {'\n'}
              Date Reviewed: {reviews[1]}  {'\n'}{'\n'}
              {reviews[2]}</Text>

              <Text style={styles.reviewStyle}>
              Rating: {reviews[3]} {'\n'}
              Date Reviewed: {reviews[4]}  {'\n'}{'\n'}
              {reviews[5]}</Text>

              <Text style={styles.reviewStyle}>
              Rating: {reviews[6]} {'\n'}
              Date Reviewed: {reviews[7]}  {'\n'}{'\n'}
              {reviews[8]}</Text> */}

          </ScrollView>
        </SafeAreaView>
        )
}

// const convertStrToLink = (content) =>  {
//   return <div dangerouslySetInnerHTML={{__html: content}} />;

// }
const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    reviewStyle: {
      padding: 10,
      marginTop: 0,
      margin: 15,
      borderRadius: 5, 
      backgroundColor: '#eee',
    }
  });

