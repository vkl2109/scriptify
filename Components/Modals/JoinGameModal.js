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
import { BlurView } from 'expo-blur'
import {
    PrimaryButton
} from '../PrimaryButton'
import { useNavigation } from '@react-navigation/native';

export function JoinGameModal ({ isVisible, setIsVisible }) {
    const { height, width } = useWindowDimensions()
    const navigation = useNavigation()

    return(
        <Modal
            animationType='fade'
            visible={isVisible}
            transparent
            onRequestClose={() => setIsVisible(false)}>
            <BlurView
                style={styles.wrapper}
                intensity={10}
                >
                <View style={styles.main}>
                    
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
    },
    main: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})