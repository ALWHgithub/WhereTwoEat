import React, { useEffect, useState, Component,useFocusEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet,SafeAreaView, Divider, ScrollView, View } from 'react-native';
import StdButton from './components/button';
import RestaurantItem from './components/RestaurantItem';
import { localRestaurants} from './components/RestaurantItem';
import {yelpKey} from '../config'
import {
  getFirestore,collection,getDocs,
} from 'firebase/firestore'

const YELP_API_KEY = yelpKey.API_KEY_YELP
global.offset = 0

function HomeScreen({ navigation }) {
  const [restaurantData,setRestaurantData] = useState(localRestaurants)
  const db = getFirestore()
	const colRef = collection(db,'Users')
  const [state, setState] = useState(0)

  const getDataFromYelp = () => {
    const yelpURL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=Singapore&offset=${offset}&limit=30`
    const apiOptions = {
      headers: {
        Authorization : `Bearer ${YELP_API_KEY}`,
      },
    }
    
    return fetch(yelpURL, apiOptions)
    .then((res) => res.json())
    .then((json) =>setRestaurantData(
      json.businesses
      ))
    .catch(error => alert(error.message));
  };
  
  if(global.fav == undefined){
	  getDocs(colRef)
      .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
      if(doc.id == global.user.uid){
          global.doc = doc
          global.fav = doc.data().fav
          global.vegetarian = doc.data().vegetarian
        }
      })
     })
	.then(()=>{
		setState(state+1)
	 })
	}
  

  useEffect(() => {
      getDataFromYelp();
    }, []);


  return (
    <SafeAreaView style={styles.container}>

      {/* <ScrollView 
      showsHorizontalScrollIndication = {false} 
      horizontal
      // ref = {scroll_ref}
      contentContainerStyle = {{alignItems: 'center',}}
      >
        <VertRestaurantItem restaurantData = {restaurantData}/>
      </ScrollView> */}
      <ScrollView>
        <RestaurantItem restaurantData = {restaurantData} navigation = {navigation}/>
      </ScrollView>

      {/* <View style={{justifyContent: 'center', alignItems:'center', backgroundColor: 'rgba(255, 255, 255, 0.8)'}}> */}
      <View style={{position: 'absolute', bottom: 0, }}>
      
      <StdButton
        text="Start New Search ?" 
        onPress={() => {
          global.offset = 0
          navigation.navigate('Cat')
        }
          
        }
      />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
