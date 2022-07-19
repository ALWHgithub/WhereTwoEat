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
  const [done,setDone] = useState(0)
  const [highestCat,setHighestCat] = useState('')
  const [highestPrice,setHighestPrice] = useState('')
  let loading = false;
  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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

  useEffect(() => {
    sleep(10000).then(() => {
      setState(state+1)
    })
    .catch(err => {
      alert(err);
    })
  }, [state])
  

  const castVote = () => {
    try {
    loading = true;
    let name = global.user.uid
    let first = rooms[name] == undefined
    if(first) {
      firstTime()
      updateLoc()
    } else {
      let prevPrice = rooms[name][0]
      let prevCat = rooms[name][1]
      if(prevPrice != range ){
        updatePrice()
      }
      if(prevCat != cat){
        updateCat()
      }
      
    }
    setState(state+1)
    } catch (error) {
      alert("Something went wrong. Please wait a bit for the data to load")
    }
  }

  const updateCat = () => {
    let name = global.user.uid
    let prevCat = ""
    let prevCatCount = 0
    let curCatCount = 0
    getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if(doc.id == route.params.name){
          prevCat = doc.data()[name][1]
          prevCatCount = doc.data()[prevCat]
          curCatCount = doc.data()[cat]
        }
      })
    })
    .then(() => {
      let temp = rooms
      temp[cat] = curCatCount +1
      temp[prevCat] = prevCatCount -1
      temp[name] = [range,cat]
      setRooms(temp)
      
      updateDoc(doc(db,'RoomIDs',rooms["name"]),{[name] : [range,cat], [cat] : curCatCount +1, [prevCat] : prevCatCount -1})
       })
    }

  const updatePrice= () => {
      let name = global.user.uid
      let prevPrice = 0
      let prevPriceCount = 0
      let curPriceCount = 0
      getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if(doc.id == route.params.name){
            prevPrice = doc.data()[name][0]
            prevPriceCount = doc.data()[prevPrice]
            curPriceCount = doc.data()[range]
          }
        })
      })
      .then(() => {
        let temp = rooms
        temp[range] = curPriceCount +1
        temp[prevPrice] = prevPriceCount -1
        temp[name] = [range,cat]
        setRooms(temp)
        updateDoc(doc(db,'RoomIDs',rooms["name"]),{[name] : [range,cat], [range] : curPriceCount +1, [prevPrice] : prevPriceCount -1})
         })
    }

  const updateLoc = () => {
    if(route.params.long != undefined && route.params.lat != undefined && route.params.long != 0 && route.params.lat !=0){
      let curLong = 0
      let curLat = 0
      let curNum = 0
     getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if(doc.id == route.params.name){
          console.log("update")
          curNum = doc.data().num
          curLong = (doc.data().long)*curNum
          curLat = (doc.data().lat)*curNum
        }
      })
    }).then(()=>
     {
      curLong+=route.params.long
      curLat+=route.params.lat
      curLong = curLong/(curNum+1)
      curLat = curLat/(curNum+1)
      updateDoc(doc(db,'RoomIDs',rooms["name"]),{long:curLong, lat:curLat, num: curNum+1})
     }
    )
    }
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
    let temp = rooms
        temp[range] = curPriceCount +1
        temp[cat] = curCatCount +1
        temp[name] = [range,cat]
        setRooms(temp)
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
    for (let i = 0; i < 5; i++) {
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
    try {
      let p = getHighestPrice()
      let c = getHighestCat()
      if(p == '' || c == ''){
        alert("Something went wrong. Did you remember to put at least one vote?")
      } else {
       navigation.navigate('RestaurantRoom', {room:true, term: rooms.term, price: p, cat: c, loc: '&location=Singapore'})
      }
      } catch (error) {
        alert("Something went wrong. Please wait a bit for the data to load")
      }
  }

  const renderLoading = () => {
    if(loading){
      return <Text>Loading</Text>
    } else {
      return 
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        {renderLoading()}
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