import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    BackHeader
} from '../Components'

export function WaitingScreen ({ route }) {
    const { code } = route.params

    return(
        <SafeAreaView style={styles.container}>
            <BackHeader />
            <View style={styles.topRow}>

            </View>
            <Text>{code}</Text>
            <Text>Share This Code</Text>
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
})