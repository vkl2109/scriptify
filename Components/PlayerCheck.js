import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'

export function PlayerCheck ({ player, selected }) {
    const { height, width } = useWindowDimensions()
    
    return (
        <View style={[styles.playerWrapper, 
            { 
                backgroundColor: selected ? 'rgba(0,0,0, 0.5)' : 'transparent',
                width: 0.75 * width,
            }
            ]}>
            <Text style={styles.playerText}>{player}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    playerWrapper: {
        height: 50,
        borderRadius: 20,
        margin: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'white',
    },
    playerText: {
        color: 'white',
        fontWeight: 'bold',
    }
})