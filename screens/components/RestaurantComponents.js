import { Text} from 'react-native';


export function renderRating(rating)  {
    if(rating ==1 || rating == 2 || rating == 3 || rating == 4 || rating == 5) {
        return <Text style={{fontSize: 15}} >{rating}.0 </Text> 
    } else {
        return <Text style={{fontSize: 15}} >{rating}</Text> 
    }
  }


export function renderRestrauntsText(restaurantData,msg) {
    if(msg == 'none'){
      return <Text>No results found. Consider relaxing your criteria</Text>
    }
    else if(restaurantData.length == 0) {
      return <Text>Please wait for the results to load !</Text>
    } else {
      return <Text>Here are the Restaurants !</Text>
    }
  }


