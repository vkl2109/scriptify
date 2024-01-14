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
            <View style={styles.innerWrapper}>
                <Text style={styles.roundTxt}>Round {round}</Text>
                <View style={styles.divider} />
                <View style={styles.iconsWrapper}>
                    {Array(total).fill(null).map(( _, index) => {
                        return(
                            <View 
                                style={[styles.iconWrapper, 
                                    { borderColor: turn > index ? "#F0ECE5" : "#B6BBC4" },
                                    { backgroundColor: turn > index ? "#F0ECE5" : "transparent" }
                                ]} 
                                key={index}
                                >
                                <Text style={[styles.iconText, { color: turn > index ? "#31304D" : "#B6BBC4" }]}>
                                    {index + 1}
                                </Text>
                            </View>
                        )
                    })}
                </View>
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
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 0.75,
    }),
    innerWrapper: {
        width: '100%',
        borderWidth: 3,
        padding: 10,
        borderColor: '#F0ECE5',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
    },
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
    },
    iconWrapper: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 5,
    },
    iconText: {
        fontSize: 25,
        fontWeight: 'bold',
    }
})