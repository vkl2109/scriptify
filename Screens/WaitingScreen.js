import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    BackHeader
} from '../Components'
import { AuthContext } from '../Context/AuthContextProvider'

export function WaitingScreen ({ route }) {
    const { code } = route.params
    const { deviceID } = useContext(AuthContext)

    return(
        <SafeAreaView style={styles.container}>
            <BackHeader />
            <View style={styles.topRow}>

            </View>
            <Text>{code}</Text>
            <Text>Share This Code</Text>
            <Text>{deviceID || 'none'}</Text>
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