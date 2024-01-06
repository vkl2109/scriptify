import {
    StyleSheet,
    View,
    Text,
    Animated,
    useWindowDimensions
} from 'react-native'
import {
    useState,
    useEffect,
    useRef,
} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export function IntroGameScreen () {
    const [ loading, setLoading ] = useState(true)
    const widthAnim = useRef(new Animated.Value(0)).current
    const { height, width } = useWindowDimensions()

    useEffect(() => {

    },[])

    return (
        <SafeAreaView style={styles.container}>
            {loading ?
            <View style={styles.centerView}>
                <View style={styles.pillWrapper(width)}>
                    <Animated.View style={[styles.innerPill, {
                        width: widthAnim
                    }]}>

                    </Animated.View>
                </View>
                <Text style={styles.loadingTxt}>Loading Game...</Text>
            </View>
            :
            <></>
            }
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
        justifyContent: 'center',
    },
    loadingTxt: {
        color: 'white',
        fontSize: 20,
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pillWrapper: (w) => ({
        width: w * 0.75,
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