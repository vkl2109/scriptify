import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import {
    BackButton
} from '../Buttons/BackButton'

export function BackHeader ({ title = '', onPress, primary = true}) {

    return (
        <View style={styles.headerWrapper}>
            <BackButton 
                onPress={onPress}
                />
            <Text style={[styles.title, { color: primary ? "#F0ECE5" : "#31304D"}]}>{title}</Text>
            <View style={{width: 70}} />
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
    },
})