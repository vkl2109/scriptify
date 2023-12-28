import { 
    StyleSheet, 
    View,
    Text, 
    TextInput,
    Image,
    KeyboardAvoidingView,
    useWindowDimensions
} from 'react-native';
import { 
  useState,
} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { 
    Divider,
    PrimaryButton,
    JoinGameModal,
} from '../Components'
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo.png'

export function MainScreen () {
    const {height, width} = useWindowDimensions();
    const navigation = useNavigation();
    const [ joinGame, setJoinGame ] = useState(false)

    const handleStart = () => {
        navigation.navigate('Start')
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Image 
                  source={logo}
                  style={styles.logoImg(width)}
                  />
                
                <View style={styles.lowerHalf(width)}>
                    <PrimaryButton
                        onPress={handleStart}
                        text={'Start Game'}
                        />
                    <View style={{ height: 20 }} />
                    <PrimaryButton
                        variant="secondary"
                        onPress={()=>setJoinGame(true)}
                        text={'Join Game'}
                        />
                      <JoinGameModal 
                        isVisible={joinGame}
                        setIsVisible={setJoinGame}
                        />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31304D',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  lowerHalf:(w) => ({
    width: w,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  joinText: {
    margin: 5,
  },
  logoImg: (w) => ({
    width: w * 0.75,
    height: w * 0.25,
    resizeMode: 'contain',
  })
});