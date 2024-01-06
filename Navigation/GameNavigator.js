import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    IntroGameScreen,
    CharacterCardScreen
} from '../Screens'

const Stack = createNativeStackNavigator();

export function GameNavigator ({ route }) {
    const { code } = route.params

    return(
        <Stack.Navigator 
            screenOptions={{ headerShown: false, gestureEnabled: false }}
            initialRouteName={'Intro'}
            >
            <Stack.Screen name="Intro" component={IntroGameScreen} />
            <Stack.Screen name="Character" component={CharacterCardScreen} />
        </Stack.Navigator>
    )
}