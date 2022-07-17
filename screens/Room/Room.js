import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,SafeAreaView, Button, TextInput} from 'react-native';
import { authentication } from "../../firebase/firebase-config";
import Slider from '@react-native-community/slider'; 
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc,doc,
} from 'firebase/firestore'
import StdButton from '../components/button';
import { clearUpdateCacheExperimentalAsync } from "expo-updates";


export default function App({route,navigation}) {
  const db = getFirestore()
  const colRef = collection(db,'RoomIDs')
  const [rooms, setRooms] = useState()
  const [range, setRange] = useState(1);
  const [votePrice, setVotePrice] = useState(0)
  const [cat, setCat] = useState('Others')
  const [state,setState] = useState(0)


  if(rooms == undefined){
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if(doc.id == route.params.name){
          setRooms(doc.data())
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
  }


  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if(doc.id == route.params.name){
          setRooms(doc.data())
        }
      })
    })
    .then(() => {
      sleep(50000).then(() => {
        setState(state+1)
      })
    })
    .catch(err => {
      alert(err);
    })
  }, [state])
  
  const renderCountPrice = () => {    
    if(rooms == undefined) {
      return <Text>Please Wait!</Text>
    } else {
      return <View style = {styles.cat}>
      <Text>Current Tally: </Text>
      <Text>$: {rooms[1]} $$: {rooms[2]} $$$: {rooms[3]} $$$$: {rooms[4]}</Text>
      </View>
    }
  }

  const renderCountCat = () => {
    if(rooms == undefined) {
      return <Text>Please Wait!</Text>
    } else {
      return <View style = {styles.cat}>
      <Text>Current Tally: </Text>
      <Text>Chinese: {rooms['Chinese']} Japanese: {rooms['Japanese']} Italian: {rooms['Italian']} Others: {rooms['Others']}</Text>
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
    let first = rooms[name] == undefined
    if(first) {
      firstTime()
    } else {
      let prevPrice = rooms[name][0]
      let prevCat = rooms[name][1]
      if(prevPrice != range || prevCat != cat){
        update()
      }
    }
  }

  const update = () => {
    let name = global.user.uid
    let thisDoc = 0
    let prevPrice = 0
    let prevCat = ""
    let prevPriceCount = 0
    let prevCatCount = 0
    let curPriceCount = 0
    let curCatCount = 0
    getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if(doc.id == route.params.name){
          thisDoc = doc.data()
          prevPrice = doc.data()[name][0]
          prevCat = doc.data()[name][1]
          prevPriceCount = doc.data()[prevPrice]
          prevCatCount = doc.data()[prevCat]
        }
      })
    })
    .then(() => {
      updateDoc(doc(db,'RoomIDs',rooms["name"]),{[prevCat] : prevCatCount -1, [prevPrice] : prevPriceCount -1  })
      .then(() => {
        getDocs(colRef)
       .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
        if(doc.id == route.params.name){
          curPriceCount = doc.data()[range]
          curCatCount = doc.data()[cat]
         }
       })
       })
       .then(() => {
        updateDoc(doc(db,'RoomIDs',rooms["name"]),{[name] : [range,cat], [cat] : curCatCount +1, [range] : curPriceCount +1 })
        .then(() => {
          setState(state+1)
        })
       })
      })
    })
  }
  
  const firstTime = () => {
    let name = global.user.uid
    let curPriceCount = 0
    let curCatCount = 0
    getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if(doc.id == route.params.name){
          curPriceCount = doc.data()[range]
          curCatCount = doc.data()[cat]
        }
      })
    })
    updateDoc(doc(db,'RoomIDs',rooms["name"]),{ [name] : [range,cat], [range] :curPriceCount +1, [cat] : curCatCount +1 })
    .then(() => {
      setState(state+1)
    })
  }

  const exit = () => {
    global.room = ''
    navigation.navigate('EnterRoom')
  }

  const getHighestCat = () => {
    let max = 0.1;
    let cat = ''
    if(rooms['Chinese']> max) {
      max = rooms['Chinese']
      cat  = 'chinese'
    } 
    else if(rooms['Chinese'] ==  max) {
      cat += ',' + 'chinese'
    }
    if(rooms['Japanese']> max) {
      max = rooms['Japanese']
      cat  = 'japanese'
    } 
    else if(rooms['Japanese'] == max) {
      cat += ',' + 'japanese'
    }
    if(rooms['Italian']> max) {
      max = rooms['Italian']
      cat  = 'italian'
    } 
    else if(rooms['Italian'] == max) {
      cat += ',' + 'italian'
    }
    if(rooms['Others']> max) {
      max = rooms['Others']
      cat  = 'others'
    }
    else if(rooms['Others'] == max) {
      cat += ',' + 'others'
    }
    return cat
  }

  const getHighestPrice = () => {
    let max = 0.1
    let price = ""
    for (let i = 0; i < 4; i++) {
      if(rooms[i]> max) {
        max = rooms[i]
        price  = JSON.stringify(i)
      } else if(rooms[i] == max) {
        price += ',' + JSON.stringify(i)
      }
    }
    return price
  }

  const getResults = () => {
    let highestCat =  getHighestCat()
    let highestPrice = getHighestPrice()
    navigation.navigate('Restaurant', {room:true, term: rooms[room], price: highestPrice, cat: highestCat, lat: 1.3521, long:103.8198, range: 10000, loc: 'Singapore'})
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
      <StdButton text = "Cast Vote!" onPress={() => 
        {
          castVote()
        }
        } />
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