import {Text,View,StyleSheet} from 'react-native';

export function renderLoading(loading) {
    if(loading){
      return <Text>Loading</Text>
    } else {
      return 
    }
  }

  export const renderCountPrice = (rooms) => {    
    if(rooms == undefined) {
      return <View style = {[styles.tallyBox, {padding: 0, height: 60, justifyContent: 'center', alignItems: 'center', bottom:70}]}>
      {/* <Text style = {styles.text}>Current Tally: </Text> */}
      
      <View style ={{flexDirection:'row',}}>
      <View style = {styles.dollarBorder}>
        <Text style = {styles.dollarText}>$</Text>
        <Text>-</Text>
      </View>
      <View style = {styles.dollarBorder}>
        <Text style = {styles.dollarText}>$$</Text>
        <Text>-</Text>
      </View>
      <View style = {styles.dollarBorder}>
        <Text style = {styles.dollarText}>$$$</Text>
        <Text>-</Text>
      </View>
      <View style = {[styles.dollarBorder, {borderRightWidth: 0}]}>
        <Text style = {styles.dollarText}>$$$$</Text>
        <Text>-</Text>
      </View>

      </View>
      {/* <Text style = {styles.text}>$: {rooms[1]} $$: {rooms[2]} $$$: {rooms[3]} $$$$: {rooms[4]}</Text> */}
      </View>
    } else {
      return <View style = {[styles.tallyBox, {padding: 0, height: 60, justifyContent: 'center', alignItems: 'center', bottom:70}]}>
      {/* <Text style = {styles.text}>Current Tally: </Text> */}
      
      <View style ={{flexDirection:'row',}}>
      <View style = {styles.dollarBorder}>
        <Text style = {styles.dollarText}>$</Text>
        <Text>{rooms[1]}</Text>
      </View>
      <View style = {styles.dollarBorder}>
        <Text style = {styles.dollarText}>$$</Text>
        <Text>{rooms[2]}</Text>
      </View>
      <View style = {styles.dollarBorder}>
        <Text style = {styles.dollarText}>$$$</Text>
        <Text>{rooms[3]}</Text>
      </View>
      <View style = {[styles.dollarBorder, {borderRightWidth: 0}]}>
        <Text style = {styles.dollarText}>$$$$</Text>
        <Text>{rooms[4]}</Text>
      </View>

      </View>
      {/* <Text style = {styles.text}>$: {rooms[1]} $$: {rooms[2]} $$$: {rooms[3]} $$$$: {rooms[4]}</Text> */}
      </View>
    }
  }

  export const renderCountCat = (rooms) => {
    if(rooms == undefined) {
      return <Text>Please Wait!</Text>
    } else {
      return <View style = {styles.tallyBox}>
      <Text style = {styles.text}>Current Tally: </Text>
      <Text style = {styles.text}>Chinese: {rooms['Chinese']} Japanese: {rooms['Japanese']} Italian: {rooms['Italian']} Others: {rooms['Others']}</Text>
      </View>
    }
  }

  export const renderCurrentVotePrice = (votePrice) => {
    if (votePrice == 0) {
      return <Text></Text>
    } else {
      return <Text>Current Vote:  {"$".repeat(votePrice)}</Text>
    }
  }

  const styles = StyleSheet.create({
    text: {
      fontSize: 18,      
    },
    dollarText: {
      textAlign: 'center',
      fontSize: 25, 
    },
    tallyBox: {
      // borderWidth: 1, 
      borderRadius: 5, 
      padding: 10, 
      margin: 5,
      backgroundColor: '#e9e9e9',
    },
    dollarBorder: {
      width: '23%', 
      borderRightColor: 'white', 
      borderRightWidth: 4, 
      alignItems: 'center'
    }
  }); 