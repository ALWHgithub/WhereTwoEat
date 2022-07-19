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
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: 'orange',
    alignItems: "center",
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  blue: {
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#90ee90',
    alignItems: "center",
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
  }

})
