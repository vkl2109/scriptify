import { 
    StyleSheet, 
    View,
    Text, 
    TextInput,
    KeyboardAvoidingView,
    useWindowDimensions
} from 'react-native';
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { 
    Divider,
    PrimaryButton,
    CodeInput
} from '../Components'
import { useNavigation } from '@react-navigation/native';

export function MainScreen () {
    const {height, width} = useWindowDimensions();
    const navigation = useNavigation();
    const [ code, setCode ] = useState('')

    const handleStart = () => {
        navigation.navigate('Start')
    }

    const handleJoin = () => {

    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text style={styles.title}>Scriptify</Text>
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
                    {code.length === 6 && <PrimaryButton
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
  }
});