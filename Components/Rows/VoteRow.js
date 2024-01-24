import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'

export function VoteRow ({ option }) {
    const [key, value] = option

    return(
        <View style={styles.rowWrapper}>
            <View style={styles.wrapper}>
                <Text style={styles.choiceTxt}>{key}</Text>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={[styles.choiceTxt, { marginHorizontal: 5}]}>{value.length} votes</Text>
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
        fontSize: 15,
    }
})

