import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { 
    useState,
    useEffect
} from 'react'
import { fetchDoc } from '../Hooks'

export function PlayerRow ({ player }) {
    const { name, choice } = player

    return(
        <View style={styles.rowWrapper}>
            <Text style={styles.nameTxt}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: 100,
        height: 50,
    },
    nameTxt: {
        
    }
})