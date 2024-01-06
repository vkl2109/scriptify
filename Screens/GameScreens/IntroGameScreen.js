import {
    StyleSheet,
    View,
    Text,
    // Animated,
    // Easing,
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
    useRef,
} from 'react'
import {
    BackHeader
} from '../../Components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchDoc } from '../../Hooks'

export function IntroGameScreen ({ route, navigation }) {
    const { code } = route.params
    const [ loading, setLoading ] = useState(true)
    const [ categoryName, setCategoryName ] = useState('')
    const { height, width } = useWindowDimensions()
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
                setCategoryName(gameData?.category)
            }
            catch (e) {
                console.log(e)
            }
        }
        widthAnim.value = withTiming(width * 0.5, {
            toValue: width * 0.5,
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
        });
        spin.value = withDelay(1000, withTiming(1));
    },[])

    const handleFinishLoading = (finished) => {
        if (finished) setLoading(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader 
            onPress={navigation.goBack}
            />
            <View style={styles.centerView}>
                <Animated.View style={[styles.cardView(width, height), styles.frontView, frontAnimatedStyle]}>
                    <View style={styles.pillWrapper(width)}>
                        <Animated.View style={[styles.innerPill, {
                            width: widthAnim
                        }]} />
                    </View>
                    <Text style={styles.loadingTxt}>Loading Game...</Text>
                </Animated.View>
                <Animated.View style={[styles.cardView(width, height), styles.backView, backAnimatedStyle]}>
                    <Text>Hello</Text>
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
        color: 'white',
        fontSize: 20,
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardView: (w, h) => ({
        height: h * 0.75,
        width: w * 0.75,
        borderRadius: 16,
        backgroundColor: '#161A30',
        alignItems: "center",
        justifyContent: "center",
    }),
    frontView: {
        position: "absolute",
    },
    backView: {
        backfaceVisibility: "hidden",
        zIndex: 10,
    },
    pillWrapper: (w) => ({
        width: w * 0.5,
        height: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'white',
        margin: 10,
    }),
    innerPill: {
        height: 30,
        borderRadius: 30,
        backgroundColor: 'white',
    }
})