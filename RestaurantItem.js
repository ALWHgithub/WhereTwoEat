import React from 'react';
import { View,Text,Image,TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export const localRestaurants = [
    {
        alias: "Beachside Bar",
        image_url:
          "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 4.5,
      },
    {
        alias: "Kurger Bing",
        image_url : "https://upload.wikimedia.org/wikipedia/commons/b/bd/Spoon_%26_Pork_chori_burger.jpg",
        categories: ["Western"],
        price: "$$",
        reviews: 1244,
        rating: 4.9
    }
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
