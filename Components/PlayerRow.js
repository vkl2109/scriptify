import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'
import { 
    useState,
    useEffect
} from 'react'
import { fetchDoc } from '../Hooks'
import { LinearGradient } from 'expo-linear-gradient';

export function PlayerRow ({ player }) {
    const { name, choice } = player
    const { height, width } = useWindowDimensions()

    return(
        <View style={styles.rowWrapper(width)}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#B6BBC4', '#161A30']}
                style={styles.wrapper}
            >
                <View style={{flex: 1}}>
                    <Text style={styles.choiceTxt}>{name}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.middleTxt}>is</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={styles.choiceTxt}>{choice}</Text>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    rowWrapper:(w) => ({
        margin: 5,
        width: w * 0.9,
    }),
    middleTxt: {
        color: '#B6BBC4',
        fontSize: 20,
    },
    wrapper: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },
    choiceTxt: {
        color: '#F0ECE5',
        fontWeight: 'bold',
        fontSize: 20,
    }
})