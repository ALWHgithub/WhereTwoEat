import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function StdButton({ text, onPress, icon}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}> {text} </Text>
        <MaterialCommunityIcons name = {icon} size = {25} color = "white" />
        {/* <MaterialCommunityIcons name = 'food-drumstick' color = "white" /> */}
      </View>
    </TouchableOpacity>
  )
}

export function StdButtonBlue({ text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor: "#50C878" , }] }>
        <Text style={styles.altButtonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export const catButton = (bool,name) => {
  if(bool){
    return <StdButtonBlue text = {name}  />
  } else {
    return <StdButton text = {name} />
  }
}

function getColor(x) {
  switch (x % 4) {
    case 0:
      return '#FF9E00'
      //return '#AA6D46';
    case 1:
      return '#FF6100'
      return '#CB5C00';
    case 2:
      return '#FFA448'
      return '#C17D39';
    case 3:
      return '#EA7500'
      return '#925600';
  }
}

const colorButton = (color,text,onPress) => {
  return <TouchableOpacity onPress={onPress}>
  <View style={[styles.button, { backgroundColor: color }] }>
    <Text style={styles.buttonText}>{text}</Text>
  </View>
</TouchableOpacity>
}

export function StdButtonRandomColor({ num,text, onPress}) {
  let rand = Math.floor((Math.random() * 3))
  return colorButton(getColor(num),text,onPress);
}


const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    // paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: 'orange',
    alignItems: "center",
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: 'row',
    height: 47.5,
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  altButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  }

})
