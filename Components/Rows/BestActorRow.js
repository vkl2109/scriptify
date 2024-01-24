import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import Animated, { 
    FlipInXDown,
    FlipOutXUp,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

export function BestActorRow ({ bestActor = '' }) {
    return(
        <Animated.View
            entering={FlipInXDown.springify().damping(15)}
            exiting={FlipOutXUp.springify().damping(15)}
            style={styles.wrapper}>
                <View style={styles.innerWrapper}>
                    <View style={styles.titleWrapper}>
                        <FontAwesome name="trophy" size={24} color="#161A30" />
                        <Text style={styles.titleTxt}>Best Actor</Text>
                        <FontAwesome name="trophy" size={24} color="#161A30" />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.rowTxtWrapper}>
                        <Text style={styles.bestActorTxt}>{bestActor}</Text>
                        <Text style={styles.middleTxt}>with</Text>
                        <View style={styles.starWrapper}>
                            <Text style={styles.bestActorTxt}>5</Text>
                            <FontAwesome name="star" size={24} color="#161A30" />
                        </View>
                    </View>
                </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        borderRadius: 20,
        padding: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0ECE5',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    innerWrapper: {
        width: '100%',
        borderWidth: 2.5,
        borderRadius: 17.5,
        borderColor: '#161A30',
        backgroundColor: '#F0ECE5',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    bestActorTxt: {
        color: '#161A30',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    titleTxt: {
        color: '#161A30',
        fontSize: 30,
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
    },
    divider: {
        width: '100%',
        height: 2.5,
        borderRadius: 20,
        backgroundColor: '#161A30',
        margin: 5,
    },
    starWrapper: {
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    titleWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})