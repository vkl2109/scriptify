import { 
    StyleSheet, 
    View,
    Text, 
    TextInput,
    KeyboardAvoidingView,
    useWindowDimensions
} from 'react-native';
import { 
  useState,
  useContext,
} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { 
    Divider,
    PrimaryButton,
    CodeInput
} from '../Components'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContextProvider'

export function MainScreen () {
    const {height, width} = useWindowDimensions();
    const navigation = useNavigation();
    const [ code, setCode ] = useState('')
    const { currentUser } = useContext(AuthContext)

    const handleStart = () => {
        navigation.navigate('Start')
    }

    const handleJoin = () => {
        navigation.navigate('Waiting', {
          code: code,
        })
        setCode('')
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text style={styles.title}>Scriptify</Text>
                {currentUser && 
                  <View style={styles.welcomeBlock}>
                    <Text style={styles.welcomeBackTxt}>Welcome Back</Text>
                    <Text style={styles.nameTxt}>{currentUser}</Text>
                  </View>
                }
                <View style={styles.lowerHalf(width)}>
                    <PrimaryButton
                        onPress={handleStart}
                        text={'Start Game'}
                        />
                    <Divider text={'or'}/>
                    {/* <Text style={styles.joinText}>Input Code to Join Game</Text> */}
                    <CodeInput 
                        value={code}
                        setValue={setCode}
                        />
                    {code.length === 4 && <PrimaryButton
                        onPress={handleJoin}
                        text={'Join Game'}
                        />}
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
    justifyContent: 'space-evenly',
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
  welcomeBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBackTxt: {
    fontStyle: 'italic',
    fontSize: 20,
    color: 'white',
  },
  nameTxt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  }
});