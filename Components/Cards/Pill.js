import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

export function Pill ({ title }) {
    return(
        <View style={styles.wrapper}>
            <View style={styles.innerWrapper}>
                <Text style={styles.mainTxt}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 5,
        backgroundColor: '#F0ECE5',
        borderRadius: 100,
    },
    innerWrapper: {
        padding: 5,
        paddingHorizontal: 15,
        // borderWidth: 2.5,
        // borderColor: '#31304D',
        borderRadius: 100,
    },
    mainTxt: {
        color: '#31304D',
        fontSize: 30,
        fontWeight: 'bold',
    }
})