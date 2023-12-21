import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function BackHeader () {
    const navigation = useNavigation()

    return (
        <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={navigation.goBack}>
                <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    }
})