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
    interpolateColor,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

export function RoundStepper ({ gameData }) {
    const { currentRound, currentTurn, totalRounds, players } = gameData
    const numRounds = players?.length || 0
    const { height, width } = useWindowDimensions()
    const colorAnim = useSharedValue(0)

    useEffect(() => {
        colorAnim.value = withRepeat(withTiming(1 - colorAnim.value, { duration: 1500 }), 0);
    },[])

    const backgroundAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                colorAnim.value,
                [0, 1],
                ['#F0ECE5', '#31304D']
            ),
        }
    })

    const colorAnimatedStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(
                colorAnim.value,
                [0, 1],
                ['#31304D', '#F0ECE5']
            ),
        }
    })

    return(
        <View style={styles.wrapper(width)}>
            <View style={styles.innerWrapper}>
                <Text style={styles.roundTxt}>Round {currentRound || "?"}</Text>
                <View style={styles.divider} />
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
                        {currentTurn == numRounds + 1 ?
                        <AntDesign name="checkcircle" size={50} color="#F0ECE5" />
                        :
                        <AntDesign name="checkcircleo" size={50} color="#B6BBC4" />
                        }
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
        borderColor: '#F0ECE5'
    },
    iconText: {
        fontSize: 25,
        fontWeight: 'bold',
    }
})