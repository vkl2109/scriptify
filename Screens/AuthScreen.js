import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { 
    useState,
    useContext 
} from 'react'
import { AuthContext } from '../Context/AuthContextProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '../Components'

export function AuthScreen () {
    const { setCurrentUser } = useContext(AuthContext)
    const [ username, setUsername ] = useState('')
    const [ error, setError ] = useState('')

    const handleSubmit = () => {
        if (username.length == 0) {
            setError('Enter Username')
            return
        }
        setCurrentUser(username)
        setError('')
    }

    return(
        <SafeAreaView style={styles.container}>
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder={'Enter Username'}
                style={styles.usernameWrapper}
                />
            <Text style={styles.error}>{error}</Text>
            <View style={styles.btnWrapper}>
                <PrimaryButton
                    onPress={handleSubmit}
                    text={'Submit'}
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
        justifyContent: 'flex-start',
    },
    error: {
        color: 'red',
        fontSize: 20,
    },
    btnWrapper: {
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    usernameWrapper: {
        margin: 10,
        padding: 15,
        borderRadius: 50,
        backgroundColor: '#161A30',
        width: '75%',
        textAlign: 'center',
        fontSize: 30,
        color: '#F0ECE5',
    }
})