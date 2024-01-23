import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export function ReviewRow ({ review }) {
    const [key, value] = review

    return(
        <View style={styles.rowWrapper}>
            <View style={styles.wrapper}>
                <View style={{flex: 1}}>
                    <Text style={styles.choiceTxt}>{key}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.middleTxt}>gave</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={[styles.choiceTxt, { marginHorizontal: 5}]}>{value}</Text>
                    <FontAwesome name="star" size={24} color="#F0ECE5" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowWrapper:{
        width: '100%',
        backgroundColor: '#161A30',
        borderBottomWidth: 2.5,
        borderColor: '#F0ECE5'
    },
    middleTxt: {
        color: '#B6BBC4',
        fontSize: 20,
        fontWeight: '200'
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

