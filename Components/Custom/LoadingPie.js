import {
    StyleSheet,
    useWindowDimensions
} from 'react-native'
import Animated, {
    SlideInRight,
    SlideOutLeft,
    ZoomIn,
    ZoomOut,
} from 'react-native-reanimated'
import {
    useState
} from 'react'
import LottieView from 'lottie-react-native';

export function LoadingPie ({ externalError = false }) {
    const { height, width } = useWindowDimensions()

    return(
        <Animated.View 
            entering={ZoomIn.duration(500)} 
            exiting={ZoomOut.duration(500)}
            style={styles.center}>
            <LottieView 
                source={require("../../assets/SimpleLoading2.json")} 
                autoPlay 
                loop 
                style={styles.loader(width)}
                />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: (w) => ({
        width: w,
        height: w - 100,
    })
})