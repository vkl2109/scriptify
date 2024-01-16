import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import Animated, {
    SlideInRight,
    SlideOutLeft,
    ZoomIn,
    ZoomOut,
} from 'react-native-reanimated'
import { MessageModal } from '../Modals/MessageModal'
import {
    useState
} from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';

export function LoadingPie ({ externalError = false }) {
    const [ error, setError ] = useState(false)

    return(
        <Animated.View 
            entering={ZoomIn.duration(500)} 
            exiting={ZoomOut.duration(500)}
            style={styles.center}>
            <MessageModal
                isVisible={error && !externalError}
                setIsVisible={setError}
                message={"Failed to Connect: Check Connection"}
                />
            <CircularProgress
                value={50}
                activeStrokeColor={'#F0ECE5'}
                inActiveStrokeColor={'#F0ECE5'}
                inActiveStrokeOpacity={0.2}
                progressValueColor={'#F0ECE5'}
                valueSuffix={'%'}
                duration={5000}
                onAnimationComplete={() => setError(true)}
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
})