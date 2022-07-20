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
      return <Text>Please Wait!</Text>
    } else {
      return <View style = {{borderWidth: 1, borderRadius: 5, padding: 10, margin: 5,}}>
      <Text style = {styles.text}>Current Tally: </Text>
      <Text style = {styles.text}>$: {rooms[1]} $$: {rooms[2]} $$$: {rooms[3]} $$$$: {rooms[4]}</Text>
      </View>
    }
  }

  export const renderCountCat = (rooms) => {
    if(rooms == undefined) {
      return <Text>Please Wait!</Text>
    } else {
      return <View style = {{borderWidth: 1,borderRadius: 5,padding: 10,margin: 5,}}>
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
    }
  }); 