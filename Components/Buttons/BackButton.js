import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export function BackButton ({ onPress }) {
    return(
        <TouchableOpacity
            style={styles.wrapper}
            onPress={onPress}
            >
            <Ionicons name="arrow-back" size={32} color="grey" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 1000,
        width: 100,
        height: 100,
        margin: 10,
        padding: 10,
        backgroundColor: '#F0ECE5',
    }
})