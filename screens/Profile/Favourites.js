import React, { useEffect, useState, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet,Text,SafeAreaView, Divider, ScrollView } from 'react-native';
import StdButton from '../components/button';
import BottomTabs from '../BottomBar';
import RestaurantItem from '../components/RestaurantItem';
import { localRestaurants} from '../components/RestaurantItem';
import GetLocation from 'react-native-get-location'
import config from '../../config'
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc,doc
} from 'firebase/firestore'

const YELP_API_KEY = config.API_KEY;


function Favourites({ navigation }) {
  const [restaurantData,setRestaurantData] = useState(localRestaurants)
  const [fav,setFav] = useState([])
  const [favData,setFavData] = useState([])
  const db = getFirestore()
  const colRef = collection(db,'Users')
  const apiOptions = {
    headers: {
      Authorization : `Bearer ${YELP_API_KEY}`,
    },
  }

  const getFavs = () => {
    getDocs(colRef)
    .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if(doc.id == global.user.uid){
          setFav(doc.data().fav)
        }
      })
    })
  }
  
  useEffect(() => {
    getFavs();
  }, []);

  const getFavsData = () => {
    let temp = []
    fav.map((fav) => {
    let yelpURL = `https://api.yelp.com/v3/businesses/${fav}`
    fetch(yelpURL, apiOptions)
    .then((res) => res.json())
    .then((json) => {
      temp.push(json)
    })
    .catch(error => alert(error.message))
    .then(() => {
      setFavData(temp)
    })
    
  })

}

useEffect(() => {
  getFavsData();
}, [fav]);



const renderItems = () => {
  console.log(favData)
  if(favData.length == 0) {
    return <Text>You dont seem to have any Favourites</Text>
  } else {
    return <RestaurantItem restaurantData = {favData}/>
  }
}


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderItems()}
      </ScrollView>
      <Text>   </Text>
    </SafeAreaView>
  );
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

export default Favourites;
