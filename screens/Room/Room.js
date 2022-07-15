import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView, Button, TextInput} from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import Slider from '@react-native-community/slider'; 
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc,doc
} from 'firebase/firestore'
import StdButton from '../components/button';
import { clearUpdateCacheExperimentalAsync } from "expo-updates";


export default function App({route,navigation}) {
  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  const [rooms, setRooms] = useState([])
  const [range, setRange] = useState(1);
  const [votePrice, setVotePrice] = useState(0)
  const [cat, setCat] = useState('Chinese')

  getDocs(colRef).then((snapshot) => {
    let temp = []
    snapshot.docs.forEach((doc) => {
      if(doc.id == route.params.name){
        temp.push({...doc.data(), id: doc.id})
      }
    })
    return temp
  })
  .then((temp) => {
    setRooms(temp)
  })
  .catch(err => {
    console.log(err);
  })

  const renderRoomName = () => {
    if (rooms.length == 0) {
      return <Text>Please Wait!</Text>
    } else {
      return <Text>{JSON.stringify(rooms[0].id)}</Text>
    }
  }

  const renderCountPrice = () => {    
    if(rooms.length == 0) {
      return <Text>Please Wait!</Text>
    } else {
      return <View style = {styles.cat}>
      <Text>Current Tally: </Text>
      <Text>$: {rooms[0][1]} $$: {rooms[0][2]} $$$: {rooms[0][3]} $$$$: {rooms[0][4]}</Text>
      </View>
    }
  }

  const renderCountCat = () => {
    if(rooms.length == 0) {
      return <Text>Please Wait!</Text>
    } else {
      return <View style = {styles.cat}>
      <Text>Current Tally: </Text>
      <Text>Chinese: {rooms[0]['Chinese']} Japanese: {rooms[0]['Japanese']} Italian: {rooms[0]['Italian']} Others: {rooms[0]['Others']}</Text>
      </View>
    }
  }

  const renderCurrentVotePrice = () => {
    if (votePrice == 0) {
      return <Text></Text>
    } else {
      return <Text>Current Vote:  {"$".repeat(votePrice)}</Text>
    }
  }

  const castVote = () => {
    let name = global.user.uid
    let first = rooms[0][name] == undefined
    if(first) {
      firstTime()
      setVotePrice(range)
      setRooms(rooms)
    } else {
      let prevPrice = rooms[0][name][0]
      let prevCat = rooms[0][name][1]
      if(prevPrice != range){
        updatePrice()
      }
      if(prevCat != cat){
        updateCat()
      }
    }
  }

  const updatePrice = () => {
    let name = global.user.uid
    let prev = rooms[0][name][0]
    let prevCount = rooms[0][prev]
    let priceCount = rooms[0][range]
    updateDoc(doc(db,'RoomIDs',rooms[0].id),{  [prev] : prevCount -1 })
    updateDoc(doc(db,'RoomIDs',rooms[0].id),{ [name] : [range,cat] , [range] : priceCount +1})
    setVotePrice(range)
    setRooms(rooms)
  }

  const updateCat = () => {
    let name = global.user.uid
    let prev = rooms[0][name][1]
    let prevCount = rooms[0][prev]
    let catCount = rooms[0][cat]
    updateDoc(doc(db,'RoomIDs',rooms[0].id),{  [prev] : prevCount -1 })
    updateDoc(doc(db,'RoomIDs',rooms[0].id),{ [name] : [range,cat] , [cat] : catCount +1})
    setRooms(rooms)
  }

  const firstTime = () => {
    let name = global.user.uid
    let priceCount = rooms[0][range]
    let catCount = rooms[0][cat]
    updateDoc(doc(db,'RoomIDs',rooms[0].id),{ [name] : [range,cat], [range] : priceCount +1, [cat] : catCount +1 })
  }

  const exit = () => {
    global.room = ''
    navigation.navigate('EnterRoom')
  }

  const getHighestCat = () => {
    let max = 0.1;
    let cat = ''
    if(rooms[0]['Chinese']> max) {
      max = rooms[0]['Chinese']
      cat  = 'chinese'
    } 
    else if(rooms[0]['Chinese'] ==  max) {
      cat += ',' + 'chinese'
    }
    if(rooms[0]['Japanese']> max) {
      max = rooms[0]['Japanese']
      cat  = 'japanese'
    } 
    else if(rooms[0]['Japanese'] == max) {
      cat += ',' + 'japanese'
    }
    if(rooms[0]['Italian']> max) {
      max = rooms[0]['Italian']
      cat  = 'italian'
    } 
    else if(rooms[0]['Italian'] == max) {
      cat += ',' + 'italian'
    }
    if(rooms[0]['Others']> max) {
      max = rooms[0]['Others']
      cat  = 'others'
    }
    else if(rooms[0]['Others'] == max) {
      cat += ',' + 'others'
    }
    return cat
  }

  const getHighestPrice = () => {
    let max = 0.1
    let price = ""
    for (let i = 0; i < 4; i++) {
      if(rooms[0][i]> max) {
        max = rooms[0][i]
        price  = JSON.stringify(i)
      } else if(rooms[0][i] == max) {
        price += ',' + JSON.stringify(i)
      }
    }
    return price
  }

  const getResults = () => {
    let highestCat =  getHighestCat()
    let highestPrice = getHighestPrice()
    console.log(highestCat)
    console.log(highestPrice)
    

    navigation.navigate('Restaurant', {price: highestPrice, cat: highestCat, lat: 1.3521, long:103.8198, range: 10000, loc: 'Singapore'})
  }


  return (
    <SafeAreaView style={styles.container}>
        {renderCountPrice()}
        {renderCountCat()}
        {renderCurrentVotePrice()}
        <Text>Currently Selected:  {"$".repeat(range)}, {cat}</Text>
        <Slider
        style={{width: 200, height: 40}}
        minimumValue={1}
        maximumValue={4}
        step={1}
        thumbTintColor="orange"
        onValueChange={value => setRange(parseInt(value))}
        maximumTrackTintColor="#000000"        
        minimumTrackTintColor = 'orange'
      />
      <View style={{flexDirection: 'row'}}>
      <StdButton text = "Chinese" onPress={() => setCat('Chinese')} />
      <StdButton text = "Japanese" onPress={() => setCat('Japanese')} />
      <StdButton text = "Italian" onPress={() => setCat('Italian')} />
      <StdButton text = "Others" onPress={() => setCat('Others')} />
      </View>
      <StdButton text = "Cast Vote!" onPress={() => castVote()} />
      <StdButton text = "Get Results" onPress={() => getResults()}/>
      <StdButton text = "Exit Room" onPress={() => exit()}/>
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
    priceButton: {
      flex: 1,
      color: 'orange',
      borderRadius: '25px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: 'white',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      margin: 5,
    },
    cat: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      margin: 5,
    },
  });