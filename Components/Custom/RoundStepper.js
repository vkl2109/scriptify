import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'
import {
    useEffect
} from 'react'
import { AntDesign } from '@expo/vector-icons'
import Animated, { 
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    interpolateColor,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

export function RoundStepper ({ gameData }) {
    const { currentRound, currentTurn, totalRounds, players } = gameData
    const numRounds = players?.length || 0
    const { height, width } = useWindowDimensions()
    const colorAnim = useSharedValue(0)
    const widthAnim = useSharedValue(0)

    useEffect(() => {
        colorAnim.value = withRepeat(withTiming(1 - colorAnim.value, { duration: 1000 }), 0);
    },[])

    useEffect(() => {
        widthAnim.value = withTiming((width * 0.75) * (currentTurn + 1) / (numRounds + 1))
    },[currentTurn])

    const backgroundAnimatedStyle = useAnimatedStyle(() => {
        return {
            borderColor: interpolateColor(
                colorAnim.value,
                [0, 1],
                ['#B6BBC4', '#F0ECE5']
            ),
            shadowRadius: interpolate(
                colorAnim.value,
                [0, 1],
                [0.1, 5]
            ),
        }
    })

    const colorAnimatedStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(
                colorAnim.value,
                [0, 1],
                ['#B6BBC4', '#F0ECE5']
            ),
        }
    })

    function CheckRenderer () {
        if (currentRound > totalRounds) return <AntDesign name="checkcircle" size={50} color="#F0ECE5" />
        else if (currentTurn == numRounds) return(
            <Animated.View style={[styles.selectedIcon, backgroundAnimatedStyle]}>
                <AnimatedCheck name="checkcircleo" size={50} style={colorAnimatedStyle} />
            </Animated.View>
        )
        else return <AntDesign name="checkcircleo" size={50} color="#B6BBC4" />
    }

    const AnimatedCheck = Animated.createAnimatedComponent(AntDesign)

    return(
        <View style={styles.wrapper(width)}>
            <View style={styles.innerWrapper}>
                {currentRound && currentRound > totalRounds ?
                    <Text style={styles.roundTxt}>Game Complete!</Text>
                :
                    <Text style={styles.roundTxt}>Round {currentRound || "?"}</Text>
                }
                <View style={styles.divider(width)}>
                    <Animated.View style={[styles.innerPill, {
                        width: widthAnim
                    }]} />
                </View>
                <View style={styles.iconsWrapper}>
                    {Array(numRounds).fill(null).map(( _, index) => {
                        return(currentTurn == index ?
                            <Animated.View 
                                style={[styles.iconWrapper, styles.selectedIcon, backgroundAnimatedStyle]} 
                                key={index}
                                >
                                <Animated.Text style={[styles.iconText, colorAnimatedStyle]}>
                                    {index + 1}
                                </Animated.Text>
                            </Animated.View>
                            :
                            <View 
                                style={[styles.iconWrapper, 
                                    { borderColor: currentTurn > index ? "#F0ECE5" : "#B6BBC4" },
                                    { backgroundColor: currentTurn > index ? "#F0ECE5" : "transparent" }
                                ]} 
                                key={index}
                                >
                                <Text style={[styles.iconText, { color: currentTurn > index ? "#31304D" : "#B6BBC4" }]}>
                                    {index + 1}
                                </Text>
                            </View>
                        )
                    })}
                    <View style={{ margin: 10 }}>
                        <CheckRenderer />
                    </View>
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
    divider: (w) => ({
        height: 30,
        width: w * 0.75,
        margin: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F0ECE5',
        borderRadius: 20,
    }),
    innerPill: {
        height: 30,
        borderRadius: 30,
        backgroundColor: '#F0ECE5',
    },
    iconsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '90%',
        padding: 5,
        flexWrap: 'wrap',
    },
    iconWrapper: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 4,
        margin: 10,
    },
    selectedIcon: {
        backgroundColor: '#161A30',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        borderRadius: 100,
    },
    iconText: {
        fontSize: 25,
        fontWeight: 'bold',
    }
})