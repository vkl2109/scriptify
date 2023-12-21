import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function BackHeader ({ title = '' }) {
    const navigation = useNavigation()

    return (
        <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={navigation.goBack}>
                <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={{width: 32}} />
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
})