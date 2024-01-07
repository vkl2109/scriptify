import {
    StyleSheet,
    View,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export function Avatar ({ character = '' }) {
    return (
        <View style={styles.avatarWrapper}>
            <View style={styles.innerWrapper}>
                <FontAwesome name="user" size={100} color="#161A30" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 100,
        padding: 5,
        borderWidth: 2.5,
        borderColor: '#F0ECE5',
        margin: 10,
    },
    innerWrapper: {
        borderRadius: 100,
        width: '100%',
        height: '100%',
        backgroundColor: '#F0ECE5',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
})