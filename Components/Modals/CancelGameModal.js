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
import {
    PrimaryButton
} from '../Buttons/PrimaryButton'
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
                    <View style={styles.greyDivider} />
                    <View style={styles.bottomRow}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <PrimaryButton
                                text={'No'}
                                onPress={() => setCancel(false)}
                                />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <PrimaryButton
                                text={'Yes'}
                                variant='secondary'
                                onPress={handleCancelGame}
                                />
                        </View>
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
    greyDivider: {
        width: '100%',
        height: 2,
        marginBottom: 10,
        backgroundColor: 'grey'
    }
})