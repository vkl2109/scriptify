import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
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

export function RoundStepper ({ 
    turns, 
    numRounds,
    introRound,
    setIntroRound,
}) {
    const { currentRound, currentTurn, totalRounds, hasFinished } = turns
    const { height, width } = useWindowDimensions()
    const colorAnim = useSharedValue(0)
    const widthAnim = useSharedValue(0)

    useEffect(() => {
        const checkWidth = () => {
            if (hasFinished) {
                widthAnim.value = withTiming(width * 0.75)
                return
            }
            else if (introRound) {
                widthAnim.value = withTiming(0)
                return
            }
            else {
                widthAnim.value = withTiming((width * 0.75) * (currentTurn + 1) / (numRounds + 1))
                return
            }
        }
        checkWidth()
    },[currentTurn, hasFinished, introRound])
    
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
        if (hasFinished) return(
            <View style={styles.pastIconWrapper}>
                <AntDesign name="check" size={18} color="#31304D" />
            </View>
        )
        else if (currentRound > totalRounds) return (
            <View style={styles.iconWrapper}>
                <AntDesign name="check" size={18} color="#F0ECE5" />
            </View>
        )
        else if (currentTurn == numRounds) return(
            <Animated.View style={[styles.selectedIcon, backgroundAnimatedStyle]}>
                <AnimatedCheck name="check" size={18} style={colorAnimatedStyle} />
            </Animated.View>
        )
        else return (
            <View style={styles.iconWrapper}>
                <AntDesign name="check" size={18} color="#B6BBC4" />
            </View>
        )
    }

    function InfoRenderer () {
        return (
            <TouchableOpacity onPress={() => setIntroRound(true)}>
                {introRound && !hasFinished ?
                <Animated.View style={[styles.selectedIcon, backgroundAnimatedStyle]}>
                    <AnimatedInfo name="information" size={16} style={colorAnimatedStyle} />
                </Animated.View>
                :
                <View style={styles.pastIconWrapper}>
                    <Ionicons name="information" size={16} color="#31304D" />
                </View>
                }
            </TouchableOpacity>
        )
    }

    function NumberRenderer ({ index }) {
        if (introRound && !hasFinished) return(
            <View style={styles.iconWrapper}>
                <Text style={[styles.iconText, { color: '#B6BBC4'}]}>
                    {index + 1}
                </Text>
            </View>
        )
        if (currentTurn == index) return(
            <Animated.View 
                style={[styles.iconWrapper, styles.selectedIcon, backgroundAnimatedStyle]} 
                >
                <Animated.Text style={[styles.iconText, colorAnimatedStyle]}>
                    {index + 1}
                </Animated.Text>
            </Animated.View>
        )
        else if (currentTurn > index || hasFinished) return(
            <View style={styles.pastIconWrapper}>
                <Text style={[styles.iconText, { color: '#31304D'}]}>
                    {index + 1}
                </Text>
            </View>
        )
        return(
            <View style={styles.iconWrapper}>
                <Text style={[styles.iconText, { color: '#B6BBC4'}]}>
                    {index + 1}
                </Text>
            </View>
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
                        {Array(numRounds).fill(null).map(( _, index) => 
                            <NumberRenderer index={index} key={index} />
                        )}
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
        borderWidth: 2,
        borderColor: '#F0ECE5',
        borderRadius: 100,
    }),
    innerPill: {
        height: 30,
        borderRadius: 100,
        backgroundColor: '#F0ECE5',
        zIndex: 10,
    },
    iconsWrapper: {
        width: '100%',
        height: 26,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        zIndex: 100,
    },
    iconWrapper: {
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderColor: '#B6BBC4',
        padding: 2.5,
        borderWidth: 2.5,
    },
    pastIconWrapper: {
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderColor: '#31304D',
        borderWidth: 2.5,
    },
    selectedIcon: {
        backgroundColor: '#161A30',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        borderRadius: 100,
        padding: 2.5,
        borderWidth: 2,
    },
    iconText: {
        fontSize: 12,
        fontWeight: 'bold',
    }
})