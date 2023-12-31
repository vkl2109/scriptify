import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import {
    CloseButton
} from '../Buttons/CloseButton'

export function CloseHeader ({ title = '', onPress }) {

    return (
        <View style={styles.headerWrapper}>
            <View style={{width: 70}} />
            <Text style={styles.title}>{title}</Text>
            <CloseButton 
                onPress={onPress}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
})