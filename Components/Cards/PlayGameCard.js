import {
    StyleSheet,
    View,
} from 'react-native'
import { MainCard } from './MainCard'
import { RoundStepper } from '../Custom/RoundStepper'

export function PlayGameCard ({ gameData }) {
    return(
        <View style={styles.wrapper}>
            <RoundStepper 
                round={1}
                turn={2}
                total={3}
                />
            <View style={{height: 50 }} />
            <MainCard scale={.75}>

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
        justifyContent: 'center',
        paddingBottom: 50,
    }
})