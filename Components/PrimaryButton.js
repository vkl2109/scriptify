import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native'

export function PrimaryButton ({ 
    text, 
    onPress,
    variant = "primary"
}) {
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.buttonStart, {
                backgroundColor: variant == "primary" ? '#F0ECE5' : '#31304D'
            }]}
            >
            <Text 
                style={[styles.buttonText, {
                    color: variant == "primary" ? '#161A30' : 'white'
                }]}
                >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStart: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 24
    },

})