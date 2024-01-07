import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator
} from 'react-native'

export function PrimaryButton ({ 
    text, 
    onPress,
    variant = "primary",
    loading = false,
}) {
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.buttonStart, {
                backgroundColor: variant == "primary" ? '#F0ECE5' : '#161A30'
            }]}
            >
            <View style={[styles.innerBtn, {
                borderColor: variant == "primary" ? '#31304D' : '#F0ECE5'
            }]}>
                {loading ?
                <ActivityIndicator size="small" />
                :
                <Text 
                    style={[styles.buttonText, {
                        color: variant == "primary" ? '#161A30' : 'white'
                    }]}
                    >
                    {text}
                </Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStart: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        padding: 3,
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 24
    },
    innerBtn: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 2,
    }
})