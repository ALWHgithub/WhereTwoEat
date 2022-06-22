import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator();


const BottomTabs = (props) => {

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

      <TouchableOpacity onPress={() => {
        global.offset = 0
        navigation.navigate('Price')
        }} ><Icon icon="receipt" text="Order" />
        </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile',
       {user: props.user, email: props.email, username: props.username, masternav: props.masternav})
       } ><Icon icon="user" text="Profile" /></TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('EnterRoom',
       {user: props.user, email: props.email, username: props.username, masternav: props.masternav})
       } ><Icon icon="glass-cheers" text="Group Order" /></TouchableOpacity>
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

export default BottomTabs