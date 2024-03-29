import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    IntroGameScreen,
    CharacterCardScreen
} from '../Screens'
import { 
    GameContextProvider
} from '../Context';

const Stack = createNativeStackNavigator();

export function GameNavigator ({ route }) {
    const { code } = route.params

    return(
        <GameContextProvider>
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
        </GameContextProvider>
    )
}