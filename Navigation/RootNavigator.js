import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    LandingScreen,
    CategoriesScreen,
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
            screenOptions={{ headerShown: false, gestureEnabled: false }}
            initialRouteName={'Landing'}
            >
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="Waiting" component={WaitingScreen} options={{gestureEnabled: false}}/>
            <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
    )
}