import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export function BackButton ({ onPress }) {
    return(
        <TouchableOpacity
            style={styles.wrapper}
            onPress={onPress}
            >
            <View style={styles.innerWrapper}>
                <Ionicons name="arrow-back" size={30} color="#31304D" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 1000,
        width: 50,
        height: 50,
        margin: 10,
        padding: 2,
        backgroundColor: '#F0ECE5',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    innerWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 1000,
        borderWidth: 2.5,
        borderColor: '#31304D'
    }
})