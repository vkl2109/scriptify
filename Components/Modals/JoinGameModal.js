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
} from '../Buttons/PrimaryButton'
import { Ionicons } from '@expo/vector-icons';
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
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={styles.backBtn}
                    >
                    <Ionicons name="arrow-back" size={32} color="white" />
                </TouchableOpacity>
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
    backBtn: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rbga(0, 0, 0, 0.75)',
        margin: 10,
        position: 'absolute',
        left: 20,
        top: 50,
    },
})