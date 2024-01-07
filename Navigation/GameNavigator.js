import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    IntroGameScreen,
    CharacterCardScreen
} from '../Screens'
import {
    useState,
    useEffect,
} from 'react'
import {
    fetchDoc
} from '../Hooks'

const Stack = createNativeStackNavigator();

export function GameNavigator ({ route }) {
    const { code } = route.params

    useEffect(() => {
        const getSessionData = async () => {
            const sessionSnapshot = await fetchDoc('sessions', code)
            // if (sessionSnapshot) 
        }
    },[])

    return(
        <Stack.Navigator 
            screenOptions={{ headerShown: false, gestureEnabled: false }}
            initialRouteName={'Intro'}
            >
            <Stack.Screen 
                name="Intro" 
                component={IntroGameScreen} 
                initialParams={{ code: code }}
                />
            <Stack.Screen 
                name="Character" 
                component={CharacterCardScreen}
                initialParams={{ code: code }} 
                />
        </Stack.Navigator>
    )
}