import React, { useEffect, useState } from "react";
import { View,Text,Image,TouchableOpacity, Dimensions,Linking,use } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {renderRating} from "./RestaurantComponents";

import {
  getFirestore,collection,getDocs,
  addDoc, updateDoc, setDoc, doc
} from 'firebase/firestore'

export const localRestaurants = [
	
]



export default function RestaurantItem(props) {
	const isFocused = useIsFocused();
	const [review, setReview] = useState('')
	const [state, setState] = useState(0)
	const db = getFirestore()
	const colRef = collection(db,'Users')

	  useEffect(() => {
		isFocused && setState(state+1)
	  },[isFocused]);
	
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

	
	const renderFavIcon = (id) => {
	if(global.fav == undefined){
		return <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}}  activeOpacity={1.0}>
		<MaterialCommunityIcons name = 'refresh' size ={25} color = "#FFFFFF"/>
		</TouchableOpacity>
	} else if(global.fav != undefined && global.fav.find((res) => (res == id)) != undefined) {
		return <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}} onPress={() => {removeFromFav(id)}} activeOpacity={1.0}>
		<MaterialCommunityIcons name = 'heart' size ={25} color = "#FFFFFF"/>
		</TouchableOpacity>
	} else {
	    return <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}} onPress={() => {addToFav(id)}} activeOpacity={1.0}>
		<MaterialCommunityIcons name = 'heart-outline' size ={25} color = "#FFFFFF"/>
		</TouchableOpacity>
	  }
	}
	
	const addToFav = (id) => {
	    let current = global.fav
	    current.push(id)
	    global.fav = current
		setState(state+1)
		updateDoc(doc(db,'Users',global.user.uid),{fav: current})
	}
	
	const removeFromFav = (id) => {
		let current = global.fav
		current = current.filter(data => data != id);
		global.fav = current
		setState(state+1)
		updateDoc(doc(db,'Users',global.user.uid),{fav: current})
		
	}

	const renderVegIcon= (cat) => {
		for(let i =0; i< cat.length; i++){
			if(cat[i].alias == 'vegetarian' ){
				return <MaterialCommunityIcons name = 'food-drumstick-off' size ={20} color = "green" />
			}
		}
	}

	const renderHalalIcon= (cat) => {
		for(let i =0; i< cat.length; i++){
			if(cat[i].alias == 'halal' ){
				return <View style={{flexDirection: 'row'}}>
					<MaterialCommunityIcons name = 'food-halal' size ={20} color = "orange" />
					<Text style ={{ color : "orange"}}> Halal</Text>
					</View>
			}
		}
	}

	const star = () => {
		return <MaterialCommunityIcons name = 'star' size ={20} color = "yellow"/>
	}

	const renderPhone = (number) => {
		if(number == ''){
			return 
		} else {
			return <TouchableOpacity style ={{ flexDirection : "row"}} onPress={() => {Linking.openURL(`tel:${number}`)}}>
			<MaterialCommunityIcons  name = 'phone' size ={15} color = 'grey'/>          
			<Text style={{fontSize: 15, color: 'grey',}}> {number} </Text>
	         </TouchableOpacity>
		}

	}
	
	const RestaurantInfo = (props) => (
		<View style = {{ flexDirection : "row", 
		justifyContent : "space-between", 
		alignItems : "center",
			marginTop: 10,
		}}>
	
			<View>
			<View style={{flexDirection: 'row'}}>
			<Text style={{fontSize: 20, textTransform: 'capitalize', fontWeight: 'bold',width: windowWidth - 80}}>{/* {replaceAll(props.alias,"-", " ")}  */}{props.name}</Text>
			</View> 
			<View style={{flexDirection: 'row'}}>
			    {renderPhone(props.phone)}
				{renderVegIcon(props.res.categories)}
				<Text> </Text>
				{renderHalalIcon(props.res.categories)}
			</View>
			</View>
	
			<View style={{
				flexDirection : "row",
				backgroundColor: "#eee",
				height: 34,
				width: 60,
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 17,
			}}
			>  
				{renderRating(props.rating)}
				{star()}
			</View>
			
		</View>
	)

	return (
	<>
		{props.restaurantData.map((restaurant,index) => (
			<TouchableOpacity
				key={index}
				activeOpacity={1}
				style={{ marginBottom: 15 }}>
				<View style ={{backgroundColor:'white', padding: 10 }}>
					<TouchableOpacity onPress={() =>toReviews(restaurant, props.navigation)} activeOpacity={0.7} >
						<Image source = {{uri : restaurant.image_url,}} style = {{ width: windowWidth - 20, height : 180, borderRadius: 0, resizeMode: 'cover', }}/>
					</TouchableOpacity>
					{renderFavIcon(restaurant.id)}
					<RestaurantInfo alias = {restaurant.alias} rating = {restaurant.rating} phone = {restaurant.phone} name = {restaurant.name} res = {restaurant}/>
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
		    resizeMethod="scale"
			resizeMode="cover"
			defaultSource = {{
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

