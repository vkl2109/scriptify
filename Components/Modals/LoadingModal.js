import {
    StyleSheet,
    Modal,
    View,
    Text
} from 'react-native'
import {
    CloseHeader
} from '../Headers/CloseHeader'
import { BlurView } from 'expo-blur'
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
    FadeInDown,
    FadeOutUp,
} from 'react-native-reanimated';
import {
    useState,
    useEffect,
    useCallback,
} from 'react'

const textLines = [
    'Creating Scenario',
    'Generating Quotes',
    'Building Choice Map'
]

export function LoadingModal ({ isVisible, setIsVisible }) {
    const insets = useSafeAreaInsets();
    const [ index, setIndex ] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 2500);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const TextRenderer = useCallback(() => {
        return(
            <Animated.Text
                entering={FadeInDown.springify().damping(15)} 
                exiting={FadeOutUp.springify().damping(15)}
                style={styles.textRenderer}>
                {textLines[index]}
            </Animated.Text>
        )
    },[index])

    return(
        <Modal
            animationType='fade'
            visible={isVisible}
            transparent
            onRequestClose={() => setIsVisible(false)}
            >
            <BlurView
                style={styles.wrapper(insets)}
                intensity={20}
                >
                <View style={styles.main}>
                    <CloseHeader
                        onPress={() => setIsVisible(false)}
                        />
                    <View style={styles.mainWrapper}>
                        <LottieView 
                            source={require("../../assets/SimpleLoading2.json")} 
                            autoPlay 
                            loop 
                            style={styles.loader}
                            />
                        <TextRenderer />
                    </View>
                    <View style={{height: 100}} />
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper:(i) => ({
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: i.top + 10,
    }),
    main: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    creatingTxt: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F0ECE5',
        margin: 20,
    },
    mainWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    textRenderer: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F0ECE5',
    },
    loader: {
        width: 500,
        height: 500,
    }
})