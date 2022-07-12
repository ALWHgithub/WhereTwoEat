import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { View,Text,Image,TouchableOpacity, Dimensions,Linking } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import config from '../../config'
import StdButton from './button';
import { authentication } from "../../firebase/firebase-config";
import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc, doc
} from 'firebase/firestore'

export const localRestaurants = [

]

export default function RestaurantItem(props) {
	const [review, setReview] = useState('')
	const YELP_API_KEY = config.API_KEY;
	const apiOptions = {
        headers: {
          Authorization : `Bearer ${YELP_API_KEY}`,
        },
      }
	
	const toReviews = (restaurant,navigation) => {
		console.log(restaurant.alias)
		navigation.navigate('Reviews',{
			restaurant: restaurant,
			name: restaurant.name,
			image: restaurant.image_url,
			price: restaurant.price,
			reviews: restaurant.review_count,
			rating: restaurant.rating,
			categories: restaurant.categories,
			alias: restaurant.alias,
		})
	}

	return (
	<>
		{props.restaurantData.map((restaurant,index) => (
			<TouchableOpacity
				key={index}
				activeOpacity={1}
				style={{ marginBottom: 25 }}>
				<View>
					<RestaurantImage image = {restaurant.image_url} id ={restaurant.id}/>
					<RestaurantInfo alias = {restaurant.alias} rating = {restaurant.rating} phone = {restaurant.phone} name = {restaurant.name}/>
					<TouchableOpacity onPress={() =>toReviews(restaurant, props.navigation)}>
						<Text style={{fontSize: 15, }}>See Reviews</Text>
					</TouchableOpacity>
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
		<TouchableOpacity style={{position: 'absolute', right: 20, top: 20}} onPress={() => {addtoFav(props.id)}}>
        	<MaterialCommunityIcons name = 'heart-outline' size ={25} color = "#ffffff"/>
		</TouchableOpacity>
	</>
)

const addtoFav = (id) => {
  console.log("hi")
  const db = getFirestore()
  const colRef = collection(db,'Users')
  getDocs(colRef)
    .then((snapshot) => {
    snapshot.docs.forEach((Doc) => {
      if(Doc.id == global.user.uid){
		  let updated = Doc.data().fav
		  updated.push(id)
		  console.log(updated)
		  updateDoc(doc(db,'Users',global.user.uid),{fav: updated})
        }
      })
    })
}

const RestaurantInfo = (props) => (
	<View style = {{ flexDirection : "row", 
		justifyContent : "space-between", 
		alignItems : "center",
		marginTop: 10,
	}}>

		<View>
		<Text style={{fontSize: 20, textTransform: 'capitalize', fontWeight: 'bold', width: windowWidth - 50}}>
			{/* {replaceAll(props.alias,"-", " ")}  */}
			{props.name}
			</Text>  
			<TouchableOpacity style ={{ flexDirection : "row"}} onPress={() => {Linking.openURL(`tel:${props.phone}`)}}>
			<MaterialCommunityIcons  name = 'phone' size ={15} color = 'grey'/>          
			<Text style={{fontSize: 15, color: 'grey',}}> {props.phone}</Text>
			</TouchableOpacity>
			
		</View>

		<View style={{
			flexDirection : "row",
			backgroundColor: "#eee",
			height: 34,
			width: 34,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 17,
		}}
		>  
			<Text style={{fontSize: 15}} >{props.rating}</Text>
			
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

