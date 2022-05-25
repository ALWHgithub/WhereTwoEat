import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer} from 'react-navigation';

import Price from './Price';
import Home from './Home';
const screens = {
    Home: {
        screen: Home
    },
    Price: {
        screen: Price
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);