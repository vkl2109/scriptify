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
            // toValue: height,
            // duration: 500,
            // easing: Easing.inOut(Easing.quad),
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
            // toValue: 0,
            // duration: 500,
            // easing: Easing.inOut(Easing.quad),
        })
    },[isVisible])

    const cardAnimatedStyle = useAnimatedStyle(() => {
        return {
                top: cardHeight.value
        };
    }, []);

    const handlePlay = async () => {
        try {
            setLoading(true)
            const newCode = await generateCode()
            if (!newCode) throw new Error('Code Check Failed')
            let newPlayers = []
            category.players.map((player) => {
                newPlayers.push({
                    name: '',
                    deviceID: '',
                    choice: player
                })
            })
            await setDoc(doc(db, "sessions", newCode), {
                category: category.title,
                host: deviceID,
                players: newPlayers,
            })
            cardHeight.value = withSpring(height, {
                mass: 1,
                damping: 15,
                stiffness: 100,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
                // toValue: height,
                // duration: 500,
                // easing: Easing.inOut(Easing.quad),
            },)
            setTimeout(() => {
                setIsVisible(false)
                navigation.navigate('Waiting', {
                    code: newCode,
                    category: category,
                })
            }, 500)
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
        finally {
            setLoading(false)
        }
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
                        <Image
                            source={images[category.image]}
                            style={styles.image(width)}
                            resizeMode='cover'
                            />
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>{category.title}</Text>
                            <View style={styles.divider} />
                            <Text style={styles.subtitle}>{category.count} players</Text>
                        </View>
                        <View style={styles.playersWrapper}>
                            {category?.players.map((player, index) => {
                                return(
                                    <View key={index} style={styles.playerPill}>
                                        <Text style={styles.playerTxt}>{player}</Text>
                                    </View>
                                )
                            })}
                        </View>
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
    image: (w) => ({
        width: w * 0.8 - 40,
        height: w * 0.8 - 30,
        borderRadius: 10,
    }),
    title: {
        margin: 10,
        fontSize: 50,
        fontWeight: 'bold',
        color: '#F0ECE5'
    },
    titleWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playersWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: '90%',
        height: 10,
        borderRadius: 100,
        backgroundColor: '#F0ECE5'
    },
    subtitle: {
        margin: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F0ECE5'
    },
    playerPill: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 100,
        backgroundColor: '#F0ECE5',
        margin: 5, 
    },
    playerTxt: {
        fontWeight: 'bold',
        color: '#31304D',
        fontSize: 15,
    }
})