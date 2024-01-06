import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'
import Animated, { 
    useSharedValue,
    withTiming,
    withDelay,
    Easing,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    useState,
    useEffect,
} from 'react'
import {
    BackHeader,
    PrimaryButton
} from '../../Components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchDoc } from '../../Hooks'

export function IntroGameScreen ({ route, navigation }) {
    const { code } = route.params
    const { height, width } = useWindowDimensions()
    const [ categoryData, setCategoryData ] = useState({})
    const widthAnim = useSharedValue(0);
    const spin = useSharedValue(0);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
        return {
            transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
            ],
        };
    }, []);

    const backAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
        return {
                transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
            ],
        };
    }, []);

    useEffect(() => {
        const setUpGame = async () => {
            try {
                const gameData = await fetchDoc('sessions', code)
                if (!gameData) throw new Error('invalid game code')
                const infoData = await fetchDoc('info', gameData?.category)
                if (!infoData) throw new Error('invalid category')
                setCategoryData(infoData)
                widthAnim.value = withTiming(width * 0.5, {
                    toValue: width * 0.5,
                    duration: 1000,
                    easing: Easing.inOut(Easing.quad),
                });
                spin.value = withDelay(1000, withTiming(1));
            }
            catch (e) {
                console.log(e)
            }
        }
        setUpGame()
    },[])

    const rules = [
        'Stay In Character',
        'Follow the Clues',
        'Respect the Story'
    ]

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader 
            onPress={navigation.goBack}
            />
            <View style={styles.centerView}>
                <Animated.View style={[styles.cardView(width, height), styles.frontView, frontAnimatedStyle]}>
                    <View style={[styles.innerCard, styles.secondCard]}>
                        <View style={styles.pillWrapper(width)}>
                            <Animated.View style={[styles.innerPill, {
                                width: widthAnim
                            }]} />
                        </View>
                        <Text style={styles.loadingTxt}>Loading Game...</Text>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.cardView(width, height), styles.backView, backAnimatedStyle]}>
                    <View style={[styles.innerCard, styles.mainCard]}>
                        <Text style={styles.titleTxt}>{categoryData?.title}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.bodyTxt}>{categoryData?.body}</Text>
                        <View style={styles.objectiveWrapper}>
                            <Text style={styles.objectiveTxt}>OBJECTIVE</Text>
                        </View>
                        <Text style={styles.findMurderTxt}>Find the Murderer</Text>
                        <View style={styles.objectiveWrapper}>
                            <Text style={styles.objectiveTxt}>RULES</Text>
                        </View>
                        {rules.map((rule, index) => {
                            return(
                            <View key={index} style={styles.ruleWrapper}>
                                <Text style={styles.ruleTxt}>{index + 1}.</Text>
                                <Text style={styles.ruleTxt}>{rule}</Text>
                            </View>
                            )
                        })}
                        <View style={{ height: 10 }}/>
                        <PrimaryButton 
                            text="View Character"
                            onPress={() => navigation.navigate("Character")}
                            />
                    </View>
                </Animated.View>
            </View>
            <View />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#31304D',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loadingTxt: {
        color: '#F0ECE5',
        fontSize: 20,
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardView: (w, h) => ({
        height: h * 0.75,
        width: w * 0.75,
        borderRadius: 20,
        backgroundColor: '#161A30',
        alignItems: "center",
        justifyContent: 'center',
        position: 'relative',
        padding: 10,
        position: "absolute",
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 0.75,
    }),
    frontView: {
        justifyContent: 'center',
    },
    backView: {
        backfaceVisibility: "hidden",
        zIndex: 10,
    },
    innerCard: {
        width: '100%',
        height: '100%',
        borderWidth: 3,
        borderColor: '#F0ECE5',
        borderRadius: 10,
        padding: 20,
    },
    mainCard: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    secondCard: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pillWrapper: (w) => ({
        width: w * 0.5,
        height: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#F0ECE5',
        margin: 10,
    }),
    innerPill: {
        height: 30,
        borderRadius: 30,
        backgroundColor: '#F0ECE5',
    },
    titleTxt: {
        color: '#F0ECE5',
        fontSize: 50,
        fontWeight: 'bold',
    },
    bodyTxt: {
        color: '#F0ECE5',
        fontSize: 20,
        fontStyle: "italic",
        textAlign: 'center',
        margin: 10,
    },
    divider: {
        width: '100%',
        height: 5,
        backgroundColor: '#F0ECE5',
        borderRadius: 10,
        margin: 10,
    },
    objectiveWrapper: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F0ECE5',
        borderRadius: 100,
        margin: 10,
    },
    objectiveTxt: {
        color: '#31304D',
        fontSize: 30,
        fontWeight: 'bold',
    },
    findMurderTxt: {
        fontWeight: 'bold',
        color: '#F0ECE5',
        fontSize: 25,
        textAlign: 'center',
        margin: 5,
    },
    ruleWrapper: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    ruleTxt: {
        color: '#F0ECE5',
        fontWeight: 100,
        fontSize: 20,
    }
})