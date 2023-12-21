import { 
    StyleSheet, 
    View,
    Text, 
    TextInput,
} from 'react-native';
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { 
    Divider,
    PrimaryButton,
} from '../Components'

export function MainScreen () {
    const [ code, setCode ] = useState('')

    const handleStart = () => {

    }

    const handleJoin = () => {

    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Scriptify</Text>
            <View style={styles.lowerHalf}>
                <PrimaryButton
                    onPress={handleStart}
                    text={'Start Game'}
                    />
                <Divider text={'or'}/>
                <TextInput 
                    value={code}
                    onChangeText={setCode}
                    style={styles.input}
                    placeholder='Code'
                    />
            </View>
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
  lowerHalf: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    height: 50,
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
  }
});