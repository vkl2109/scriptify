import { 
    StyleSheet, 
    View,
    Text, 
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from '../Components'

export function MainScreen () {

    const handleStart = () => {

    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Scriptify</Text>
            <View style={styles.lowerHalf}>
                <TouchableOpacity 
                    style={styles.buttonStart}
                    onPress={handleStart}
                    >
                        <Text style={styles.startText}>Start Game</Text>
                </TouchableOpacity>
                <Divider />
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
  buttonStart: {
    backgroundColor: '#F0ECE5',
    width: '90%',
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  startText: {
    fontWeight: 'bold',
    color: '#161A30',
  }
});