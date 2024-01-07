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
    PrimaryButton,
    Pill
} from '../../Components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchDoc } from '../../Hooks'

export function IntroGameScreen ({ route, navigation }) {
    const { code } = route.params
    const { height, width } = useWindowDimensions()
    const [ categoryData, setCategoryData ] = useState({})
    const [ loadingCharBtn, setLoadingCharBtn ] = useState(false)
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

    const handleNavigate = async () => {
        try {
            setLoadingCharBtn(true)
            navigation.navigate("Character", {
                characterData: characterData
            })
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoadingCharBtn(false)
        }
    }

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
                    duration: 500,
                    easing: Easing.inOut(Easing.quad),
                });
                spin.value = withDelay(500, withTiming(1));
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
                        <Pill title="OBJECTIVE" />
                        <Text style={styles.findMurderTxt}>Find the Murderer</Text>
                        <Pill title="RULES" />
                        {rules.map((rule, index) => {
                            return(
                            <View key={index} style={styles.ruleWrapper}>
                                <Text style={styles.ruleTxt}>{index + 1}.</Text>
                                <Text style={styles.ruleTxt}>{rule}</Text>
                            </View>
                            )
                        })}
                        <PrimaryButton 
                            text="View Character"
                            onPress={handleNavigate}
                            loading={loadingCharBtn}
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
        position: 'relative',
    },
    cardView: (w, h) => ({
        minHeight: h * 0.75,
        width: w * 0.9,
        borderRadius: 20,
        backgroundColor: '#161A30',
        alignItems: "center",
        justifyContent: 'center',
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
        paddingVertical: 10,
        paddingHorizontal: 15,
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
        overflow: 'hidden',
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
    },
    divider: {
        width: '100%',
        height: 5,
        backgroundColor: '#F0ECE5',
        borderRadius: 10,
    },
    findMurderTxt: {
        fontWeight: 'bold',
        color: '#F0ECE5',
        fontSize: 25,
        textAlign: 'center',
    },
    ruleWrapper: {
        width: '65%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ruleTxt: {
        color: '#F0ECE5',
        fontWeight: 100,
        fontSize: 20,
    }
})