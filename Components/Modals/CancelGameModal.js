import {
    StyleSheet,
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    useWindowDimensions
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase'
import { BlurView } from 'expo-blur'

export function CancelGameModal ({ showCancel, setCancel }) {
    
    const navigation = useNavigation()

    const handleCancelGame = () => {
        navigation.navigate('Main')
    }
    
    return (
        <Modal
            animationType='fade'
            visible={showCancel}
            transparent
            onRequestClose={() => setCancel(false)}
            >
            <BlurView
                style={styles.wrapper}
                intensity={10}
                >
                <View style={styles.main}>
                    <Text style={styles.cancelTxt}>Cancel Game?</Text>
                    <View style={styles.bottomRow}>
                        <TouchableOpacity 
                            style={styles.button('red')}
                            onPress={() => setCancel(false)}
                            >
                            <Text style={styles.btnTxt}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button('green')}
                            onPress={handleCancelGame}
                            >
                            <Text style={styles.btnTxt}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cancelTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    button: (c) => ({
        backgroundColor: c,
        padding: 10,
        margin: 10,
        borderRadius: 20,
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    btnTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
})