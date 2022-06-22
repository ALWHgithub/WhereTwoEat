import React from 'react';
import { View,Text,Image,TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export const localRestaurants = [
  
]

export default function RestaurantItem(props) {
    return (
        <>
        {props.restaurantData.map((restaurant,index) => (
            <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={{ marginBottom: 25 }}
                // onPress={() =>
                //     navigation.navigate("RestaurantDetail", {
                //     name: restaurant.name,
                //     image: restaurant.image_url,
                //     price: restaurant.price,
                //     reviews: restaurant.review_count,
                //     rating: restaurant.rating,
                //     categories: restaurant.categories,
                //     })
                // }
            >
            

                <View>
                    <RestaurantImage image = {restaurant.image_url}/>
                    <RestaurantInfo alias = {restaurant.alias} rating = {restaurant.rating}/>
                </View>

            </TouchableOpacity>
        ))}
        </>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RestaurantImage = (props) => (
    <>
    <Image
    source = {{
        uri : props.image,
    }}
    
    style = {{ width: windowWidth - 10, height : 180, borderRadius: 0, resizeMode: 'cover', }}
    />
    <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}}>
        <MaterialCommunityIcons name = 'heart-outline' size ={25} color = "#ffffff"/>
    </TouchableOpacity>
    </>
)

const RestaurantInfo = (props) => (
    <View style = {{ flexDirection : "row", 
        justifyContent : "space-between", 
        alignItems : "center",
        marginTop: 10,
    }}>
        
        <View>

            <Text style={{ontSize: 14, textTransform: 'capitalize', fontWeight: 'bold',}}>
                {replaceAll(props.alias,"-", " ")} 
            </Text>            
            <Text style={{fontSize: 12, color: 'grey',}}>30-45 min</Text>
            
        </View>
    
        <View style={{
                backgroundColor: "#eee",
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
            }}
        >
            <Text>{props.rating}</Text>
        </View>
    </View>
)

const replaceAll = (str, find, replace) => (
   str.replace(new RegExp(find, 'g'), replace)
)


export function VertRestaurantItem(props) {
    return (
        <>
        {props.restaurantData.map((restaurant,index) => (
        <View key = {index} >
            <VertRestaurantImage image = {restaurant.image_url}/>
        </View>
        ))}
        </>
    )
}

const VertRestaurantImage = (props) => (
    <>
    <Image
    source = {{
        uri : props.image,
    }}
    
    style = {{ 
        width: windowWidth * 0.3,
        height : windowHeight * 0.5, 
        borderRadius: 20, 
        resizeMode: 'cover', 
        margin: 5,

    }}
    />

    </>
)

