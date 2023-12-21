import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    MainScreen,
    StartScreen
} from '../Screens'

const Stack = createNativeStackNavigator();

export function RootNavigator () {
    return(
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName={'Main'}
            >
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Start" component={StartScreen} />
        </Stack.Navigator>
    )
}