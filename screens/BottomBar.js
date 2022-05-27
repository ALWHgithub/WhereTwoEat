import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home'
import PriceScreen from './Price';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


export default function BottomTabs() {
  const navigation = useNavigation();
  return (

    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Home')} ><Icon icon="home" text="Home" /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Price')} ><Icon icon="receipt" text="Order" /></TouchableOpacity>
      <Icon icon="user" text="Account" />
    </View>
  );
}


const Icon = (props) => (
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{props.text}</Text>
    </View>
);