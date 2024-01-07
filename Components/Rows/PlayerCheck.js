import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';

export function PlayerCheck ({ player, selected }) {
    const { height, width } = useWindowDimensions()
    
    return (
        <View style={[styles.playerWrapper, 
            { 
                backgroundColor: selected ? '#161A30' : 'transparent',
                width: 0.75 * width,
            }
            ]}>
            {selected ?
            <Entypo name="check" size={24} color="white" />
            :
            <AntDesign name="close" size={24} color="white" />
            }
            <Text style={styles.playerText}>{player}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    playerWrapper: {
        height: 50,
        margin: 20,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    playerText: {
        color: 'white',
        fontWeight: 'bold',
    }
})