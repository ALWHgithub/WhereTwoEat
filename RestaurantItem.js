import React from 'react';
import { View,Text,Image,TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export const localRestaurants = [
  
]

export default function RestaurantItem(props) {
    return (
        <>
        {props.restaurantData.map((restaurant,index) => (
        <View key = {index}>
            <RestaurantImage image = {restaurant.image_url}/>
            <RestaurantInfo alias = {restaurant.alias} rating = {restaurant.rating}/>
        </View>
        ))}
        </>
    )
}

const windowWidth = Dimensions.get('window').width;

const RestaurantImage = (props) => (
    <>
    <Image
    source = {{
        uri : props.image,
    }}
    
    style = {{ width: windowWidth - 10, height : 180, borderRadius: 20, resizeMode: 'cover', }}
    />
    <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}}>
        <MaterialCommunityIcons name = 'heart-outline' size ={25} color = "#ffffff"/>
    </TouchableOpacity>
    </>
)

const RestaurantInfo = (props) => (
    <View style = {{ flexDirection : "row", justifyContent : "space-between", alignItems : "center",
    marginBottom: 10,}}>
        <Text style={{textTransform: 'capitalize',}}>{replaceAll(props.alias,"-", " ")} </Text>
        <Text> 30-45 min </Text>
        <Text>{props.rating}</Text>
    </View>
)

const replaceAll = (str, find, replace) => (
     str.replace(new RegExp(find, 'g'), replace)
)
