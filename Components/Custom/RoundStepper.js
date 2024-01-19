import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'
import {
    useEffect
} from 'react'
import { 
    AntDesign,
    Ionicons,
} from '@expo/vector-icons'
import Animated, { 
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    interpolateColor,
    withRepeat,
    withTiming,
    FadeInDown,
} from 'react-native-reanimated';

export function RoundStepper ({ turns, numRounds }) {
    const { currentRound, currentTurn, totalRounds } = turns
    const { height, width } = useWindowDimensions()
    const colorAnim = useSharedValue(0)
    const widthAnim = useSharedValue(0)

    useEffect(() => {
        widthAnim.value = withTiming((width * 0.75) * (currentTurn) / (numRounds))
    },[currentTurn])
    
    useEffect(() => {
        colorAnim.value = withRepeat(withTiming(1 - colorAnim.value, { duration: 1000 }), 0);
    },[])

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

    const AnimatedCheck = Animated.createAnimatedComponent(AntDesign)

    const AnimatedInfo = Animated.createAnimatedComponent(Ionicons)

    function CheckRenderer () {
        if (currentRound > totalRounds) return (
            <View style={styles.iconWrapper}>
                <AntDesign name="check" size={20} color="#F0ECE5" />
            </View>
        )
        else if (currentTurn == numRounds) return(
            <Animated.View style={[styles.selectedIcon, backgroundAnimatedStyle]}>
                <AnimatedCheck name="check" size={20} style={colorAnimatedStyle} />
            </Animated.View>
        )
        else return (
            <View style={styles.iconWrapper}>
                <AntDesign name="check" size={20} color="#B6BBC4" />
            </View>
        )
    }

    function InfoRenderer () {
        return (
            <>
                {currentTurn == 0 ?
                <Animated.View style={[styles.selectedIcon, backgroundAnimatedStyle]}>
                    <AnimatedInfo name="information" size={20} style={colorAnimatedStyle} />
                </Animated.View>
                :
                <View style={styles.iconWrapper}>
                    <Ionicons name="information" size={20} color="#F0ECE5" />
                </View>
                }
            </>
        )
    }


    return(
        <View style={styles.wrapper(width)}>
            <View style={styles.innerWrapper}>
                {currentRound > totalRounds ?
                    <Text style={styles.roundTxt}>Game Complete!</Text>
                :
                    <Text style={styles.roundTxt}>Round {currentRound}</Text>
                }
                <View style={styles.divider(width)}>
                    <Animated.View style={[styles.innerPill, {
                        width: widthAnim
                    }]} />
                    <View style={styles.iconsWrapper}>
                        <InfoRenderer />
                        {Array(numRounds).fill(null).map(( _, index) => {
                            return(currentTurn == index + 1 ?
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
        borderRadius: 100,
    }),
    innerPill: {
        height: 30,
        // borderRadius: 100,
        backgroundColor: '#F0ECE5',
        zIndex: 10,
    },
    iconsWrapper: {
        width: '100%',
        height: 30,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        zIndex: 100,
    },
    iconWrapper: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderColor: '#F0ECE5',
        padding: 2.5,
        borderWidth: 1,
    },
    selectedIcon: {
        backgroundColor: '#161A30',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        borderRadius: 100,
        padding: 2.5,
        borderWidth: 1,
    },
    iconText: {
        fontSize: 15,
        fontWeight: 'bold',
    }
})