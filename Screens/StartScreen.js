import { 
    StyleSheet, 
    View,
    Text, 
    TextInput,
    KeyboardAvoidingView,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    BackHeader
} from '../Components'
import { useNavigation } from '@react-navigation/native';

export function StartScreen () {
    return(
        <SafeAreaView style={styles.container}>
            <BackHeader />
            <Text style={styles.title}>Choose Your Category</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31304D',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  }
});