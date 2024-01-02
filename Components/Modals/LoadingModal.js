import {
    StyleSheet,
    Modal,
    View,
    Text,
    Animated
} from 'react-native'
import {
    CloseHeader
} from '../Headers/CloseHeader'
import { BlurView } from 'expo-blur'
import CircularProgress from 'react-native-circular-progress-indicator';

export function LoadingModal ({ isVisible, setIsVisible, handleLoading }) {

    return(
        <Modal
            animationType='fade'
            visible={isVisible}
            transparent
            onRequestClose={() => setIsVisible(false)}
            >
            <BlurView
                style={styles.wrapper}
                intensity={10}
                >
                <View style={styles.main}>
                    <CloseHeader
                        onPress={() => setIsVisible(false)}
                        />
                    <CircularProgress
                        value={100}
                        activeStrokeColor={'#F0ECE5'}
                        inActiveStrokeColor={'#F0ECE5'}
                        inActiveStrokeOpacity={0.2}
                        progressValueColor={'#F0ECE5'}
                        valueSuffix={'%'}
                        duration={2000}
                        // onAnimationComplete={handleLoading}
                        />
                    <View />
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        flexDirection: 'column',
        paddingVertical: 60,
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
    }
})