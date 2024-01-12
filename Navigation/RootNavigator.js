import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    MainScreen,
    StartScreen,
    CategoryScreen,
    WaitingScreen,
    GameScreen
} from '../Screens'
import {
    GameNavigator
} from './GameNavigator'

const Stack = createNativeStackNavigator();

export function RootNavigator () {

    return(
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName={'Main'}
            >
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="Waiting" component={WaitingScreen} options={{gestureEnabled: false}}/>
            <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
    )
}