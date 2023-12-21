import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native'

export function PrimaryButton ({ text, onPress }) {
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={styles.buttonStart}
            >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStart: {
        backgroundColor: '#F0ECE5',
        width: '90%',
        height: 50,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#161A30',
        fontSize: 24
    }
})