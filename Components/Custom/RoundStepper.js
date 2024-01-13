import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'

export function RoundStepper ({ round, turn, total }) {
    const { height, width } = useWindowDimensions()

    return(
        <View style={styles.wrapper(width)}>
            <Text style={styles.roundTxt}>Round {round}</Text>
            <View style={styles.divider} />
            <View style={styles.iconsWrapper}>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: (w) => ({
        width: w * 0.9,
        borderRadius: 20,
        backgroundColor: '#161A30',
        padding: 10,
        alignItems: "center",
        justifyContent: 'center',
        position: 'relative',
        padding: 10,
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 0.75,
    }),
    roundTxt: {
        color: '#F0ECE5',
        fontSize: 30,
        fontWeight: 'bold',
    },
    divider: {
        height: 5,
        width: '90%',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#F0ECE5'
    },
    iconsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        padding: 5,
    }
})