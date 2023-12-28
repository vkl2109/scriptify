import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    AuthScreen,
    MainScreen,
    StartScreen,
    CategoryScreen,
    WaitingScreen
} from '../Screens'
import { 
    useContext,
} from 'react'
import { AuthContext } from '../Context/AuthContextProvider'

const Stack = createNativeStackNavigator();

export function RootNavigator () {
    const { currentUser } = useContext(AuthContext)

    return(
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName={'Main'}
            >
            {currentUser ? 
            <Stack.Group>
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Category" component={CategoryScreen} />
                <Stack.Screen name="Waiting" component={WaitingScreen} options={{gestureEnabled: false}}/>
            </Stack.Group>
            :
            <Stack.Screen name="Auth" component={AuthScreen} options={{ presentation: 'modal' }}/>
            }
        </Stack.Navigator>
    )
}