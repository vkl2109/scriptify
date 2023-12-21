import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

export function PlayerCheck ({ player, selected }) {
    return (
        <View style={[styles.playerWrapper, 
            { backgroundColor: selected ? 'green' : 'red' }
            ]}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    playerWrapper: {
        width: '90%',
        height: 50,
        borderRadius: 20,
        margin: 20,
        padding: 10,
    }
})