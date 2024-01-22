import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    ImageBackground,
    useWindowDimensions,
} from 'react-native'
import {
    useEffect
} from 'react'
import Animated, { 
    interpolateColor, 
    useAnimatedProps, 
    useSharedValue, 
    withRepeat,
    withTiming 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export function LoadingCategoryCard () {
    const { height, width } = useWindowDimensions();
    const colorsValue = useSharedValue(1);
    const animatedProps = useAnimatedProps(() => {
        return {
        colors: [
            interpolateColor(colorsValue.value, [0, 1], ['transparent', '#31304D']),
            interpolateColor(colorsValue.value, [0, 1], ['#31304D', 'transparent']),
        ],
        };
    });

    useEffect(() => {
        colorsValue.value = withRepeat(withTiming(colorsValue.value ? 0: 1, {
            duration: 1000
        }), 0);
    },[])

    return(
        <AnimatedLinearGradient
            animatedProps={animatedProps}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardWrapper(width)}
            >

        </AnimatedLinearGradient>
    )
}

const styles = StyleSheet.create({
    cardWrapper: (w) => ({
        margin: 20, 
        width: w * 0.4,
        height: 200,
        borderRadius: 15,
    }),
})