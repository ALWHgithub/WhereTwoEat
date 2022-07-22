import React, { useEffect, useState, Component, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet,Text,SafeAreaView, Divider, ScrollView,Dimensions } from 'react-native';
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
  const [favID,setFavID] = useState(undefined)
  const [allFavData,setAllFavData] = useState([])
  const [newfavData,setNewFavData] = useState([])
  const db = getFirestore()
  const colRef = collection(db,'Users')
  
  const apiOptions = {
    headers: {
      Authorization : `Bearer ${YELP_API_KEY}`,
    },
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const getFavs = () => {
    getDocs(colRef)
    .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if(doc.id == global.user.uid){
          setFavID(doc.data().fav.filter(onlyUnique))
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
    if(favID != undefined && (favID.length > allFavData.length)){
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

  const renderData = () => {
    if(favID == undefined || allFavData == undefined || allFavData.length != favID.length) {
      return <Text>Loading Favourites...</Text>
    } else if(favID.length == 0 && allFavData.length == 0){
      return <Text>You don't seem to have any favourites.</Text>
    } else {
      return <RestaurantItem restaurantData = {allFavData} navigation = {navigation}/>
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

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#e9e9e9',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
  },
});

export default Favourites;
