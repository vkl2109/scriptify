import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../Screens'

const Stack = createNativeStackNavigator();

export function RootNavigator () {
    return(
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName={'Main'}
            >
            <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
    )
}