import {
    StyleSheet,
    Modal,
    View,
    Text,
    Image,
    useWindowDimensions
} from 'react-native'
import { BlurView } from 'expo-blur'
import { CloseHeader } from '../Headers/CloseHeader';
import {
    useState,
    useEffect,
    useContext,
} from 'react'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import Animated, { 
    useSharedValue,
    withTiming,
    withSpring,
    withDelay,
    Easing,
    interpolate,
    useAnimatedStyle,
    runOnJS
} from 'react-native-reanimated';
import { images } from '../../assets'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigation } from '@react-navigation/native'
import { generateCode } from '../../Hooks'
import { db } from "../../firebase";
import { MessageModal } from './MessageModal'
import { AuthContext } from '../../Context'

export function CategoryModal ({ isVisible, setIsVisible, category }) {
    const { height, width } = useWindowDimensions()
    const navigation = useNavigation()
    const cardHeight = useSharedValue(height);
    const { deviceID } = useContext(AuthContext)
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handleClose = () => {
        cardHeight.value = withSpring(height, {
            mass: 1,
            damping: 15,
            stiffness: 100,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },)
        setTimeout(() => setIsVisible(false), 500)
    }

    useEffect(() => {
        if (isVisible) cardHeight.value = withSpring(height * 0.2, {
            mass: 1,
            damping: 12.5,
            stiffness: 100,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        })
    },[isVisible])

    const cardAnimatedStyle = useAnimatedStyle(() => {
        return {
                top: cardHeight.value
        };
    }, []);

    const handlePlay = async () => {
        
    }

    return(
        <Modal
            animationType='fade'
            visible={isVisible}
            transparent
            onRequestClose={handleClose}
            >
            <BlurView
                style={styles.wrapper}
                intensity={10}
                >
                <CloseHeader 
                    onPress={handleClose}
                    />
                <MessageModal
                    isVisible={error}
                    setIsVisible={setError}
                    message={"Failed to Connect: Check Connection"}
                    />
                <Animated.View style={[styles.main(height, width), cardAnimatedStyle]}>
                    <View style={styles.innerWrapper}>
                        
                        <PrimaryButton 
                            text="Play"
                            onPress={handlePlay}
                            loading={loading}
                            />
                    </View>
                </Animated.View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 65,
        alignItems: 'center',
        position: 'relative',
    },
    main:(h, w) => ({
        width: w * 0.8,
        height: h * 0.75,
        position: 'absolute',
        borderRadius: 20,
        backgroundColor: '#161A30',
        padding: 10,
    }),
    innerWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#F0ECE5',
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
    },
})