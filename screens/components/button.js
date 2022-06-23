import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function StdButton({ text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export function StdButtonBlue({ text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.blue}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'orange',
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: 'center',

    marginVertical: 5,

  },
  blue: {
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#ADD8E6',
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
  }

})
