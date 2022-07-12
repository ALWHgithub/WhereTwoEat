import React, { useEffect, useState, Component, useCallback } from 'react';
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
  const [favID,setFavID] = useState([])
  const [allFavData,setAllFavData] = useState([])
  const [newfavData,setNewFavData] = useState([])
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
          setFavID(doc.data().fav)
        }
      })
    })
  }

  const updateFav = () => {
      if(favID != undefined) {
        favID.map((id) => {
        let yelpURL = `https://api.yelp.com/v3/businesses/${id}`
        fetch(yelpURL, apiOptions)
        .then((res) => res.json())
        .then((json) => {setNewFavData(json)})
        .catch(error => alert(error.message))})
      }
      
  }

  const updateAllData = () => {
    if(favID.length > allFavData.length){
      setAllFavData(allFavData.concat(newfavData))
    }
    
  }
  
  useEffect(() => {
      getFavs();
  }, []);

  useEffect(() => {
    updateFav();
  }, [favID]);

  useEffect(() => {
    updateAllData();
  }, [newfavData]);

  console.log(allFavData.length)

  const renderData = () => {
    if(allFavData == undefined || favID == undefined || allFavData.length != favID.length) {
      return <Text>You dont seem to have any Favourites</Text>
    } else {
      return <RestaurantItem restaurantData = {allFavData}/>
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {renderData()}
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
