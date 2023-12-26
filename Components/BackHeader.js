import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import {
    BackButton
} from './Buttons/BackButton'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function BackHeader ({ title = '' }) {
    const navigation = useNavigation()

    return (
        <View style={styles.headerWrapper}>
            <BackButton 
                onPress={navigation.goBack}
                />
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