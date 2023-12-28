import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContextProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

export function AuthScreen () {
    const { setCurrentUser } = useContext(AuthContext)

    return(
        <SafeAreaView style={styles.container}>
            
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