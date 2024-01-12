import {
    StyleSheet,
    View,
} from 'react-native'
import { MainCard } from './MainCard'

export function PlayGameCard ({ gameData }) {
    return(
        <View style={styles.wrapper}>
            <MainCard scale={.5}>
                
            </MainCard>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})