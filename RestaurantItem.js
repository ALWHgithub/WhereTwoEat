import React from 'react';
import { View,Text,Image,TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const localRestaurants = [
    {
        name: "Kurger Bing",
        image_url : "https://upload.wikimedia.org/wikipedia/commons/b/bd/Spoon_%26_Pork_chori_burger.jpg",
        categories: ["Western"],
        price: "$$",
        reviews: 1244,
        rating: 4.7
    },
    {
        name: "Kurger Bing",
        image_url : "https://upload.wikimedia.org/wikipedia/commons/b/bd/Spoon_%26_Pork_chori_burger.jpg",
        categories: ["Western"],
        price: "$$",
        reviews: 1244,
        rating: 4.9
    }
]

export default function RestaurantItem() {
    return (
        localRestaurants.map((restaurant,index) => (
        <View key = {index}>
            <RestaurantImage image = {restaurant.image_url}/>
            <RestaurantInfo name = {restaurant.name} rating = {restaurant.rating}/>
        </View>
        ))
    )
}

const RestaurantImage = (props) => (
    <>
    <Image
    source = {{
        uri : props.image,
    }}
    style = {{ width: "100%", height : 180}}
    />
    <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}}>
        <MaterialCommunityIcons name = 'heart-outline' size ={25} color = "#ffffff"/>
    </TouchableOpacity>
    </>
)

const RestaurantInfo = (props) => (
    <View style = {{ flexDirection : "row", justifyContent : "space-between", alignItems : "center",
    marginTop: 10,}}>
        <Text>{props.name} </Text>
        <Text> 30-45 min </Text>
        <Text>{props.rating}</Text>
    </View>
)