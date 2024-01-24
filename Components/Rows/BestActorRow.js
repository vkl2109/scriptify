import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import Animated, { 
    FlipInXDown,
    FlipOutXUp,
} from 'react-native-reanimated';

export function BestActorRow ({ bestActor = '' }) {
    return(
        <Animated.View
            entering={FlipInXDown.springify().damping(15)}
            exiting={FlipOutXUp.springify().damping(15)}
            style={styles.wrapper}>
                <View style={styles.innerWrapper}>
                    <View style={styles.rowTxtWrapper}>
                        <Text style={styles.bestActorTxt}>{bestActor}</Text>
                        <Text style={styles.middleTxt}>got</Text>
                        <Text style={styles.bestActorTxt}>5</Text>
                    </View>
                </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        borderRadius: 15,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0ECE5',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    innerWrapper: {
        width: '100%',
        borderWidth: 2.5,
        borderRadius: 10,
        borderColor: '#161A30',
        backgroundColor: '#F0ECE5',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    bestActorTxt: {
        color: '#161A30',
        fontSize: 20,
        fontWeight: 'bold',
    },
    middleTxt: {
        color: '#161A30',
        fontSize: 15,
        fontWeight: '100',
    },
    rowTxtWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})