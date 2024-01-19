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
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    useState,
    useEffect,
    useContext,
} from 'react'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import Animated, { 
    SlideInRight,
    SlideInLeft,
    SlideInUp,
    SlideInDown,
    SlideOutRight,
    SlideOutLeft,
    SlideOutUp,
    SlideOutDown
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFunctions, httpsCallable } from "firebase/functions";

export function CategoryModal ({ isVisible, setIsVisible, category }) {
    const insets = useSafeAreaInsets();
    const { height, width } = useWindowDimensions()
    const navigation = useNavigation()
    const { deviceID } = useContext(AuthContext)
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ cardVisible, setCardVisible ] = useState(false)
    
    useEffect(() => {
        if (isVisible) setCardVisible(true)
    },[isVisible])

    const handleClose = () => {
        setCardVisible(false)
        setTimeout(() => setIsVisible(false), 500)
    }

    const handlePlay = async () => {
        try {
            setLoading(true)
            const newCode = await generateCode()
            if (!newCode) throw new Error('Code Check Failed')
            const functions = getFunctions();
            const createNewGame = httpsCallable(functions, 'createNewGame');
            const result = await createNewGame({ code: newCode, category: category, deviceID: deviceID })
            if (!result?.data?.success) throw new Error ("failed to create game")
            setCardVisible(false)
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
                style={styles.blurWrapper(insets)}
                intensity={10}
                >
                <CloseHeader 
                    onPress={handleClose}
                    />
                <MessageModal
                    isVisible={error}
                    setIsVisible={setError}
                    message={"Bad Connection"}
                    />
                {cardVisible && 
                <Animated.View style={styles.main(width)} entering={SlideInDown.springify().damping(15)} exiting={SlideOutDown.springify().damping(15)}>
                    <View style={styles.innerWrapper}>
                        <Image
                            source={images[category.image]}
                            style={styles.image(height, width)}
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
                </Animated.View>}
                <View />
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    blurWrapper:(i) => ({
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        paddingTop: i.top,
    }),
    main:(w) => ({
        width: w * 0.8,
        borderRadius: 20,
        backgroundColor: '#161A30',
        padding: 7.5,
    }),
    innerWrapper: {
        width: '100%',
        height: 'auto',
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#F0ECE5',
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 10,
    },
    image: (h, w) => ({
        width: w * 0.8 - 35,
        height: h * 0.25,
        borderRadius: 7.5,
    }),
    title: {
        margin: 5,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F0ECE5',
    },
    titleWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playersWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'space-evenly',
    },
    divider: {
        width: '90%',
        height: 5,
        borderRadius: 100,
        backgroundColor: '#F0ECE5'
    },
    subtitle: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F0ECE5'
    },
    playerPill: {
        padding: 7.5,
        paddingHorizontal: 12.5,
        borderRadius: 100,
        backgroundColor: '#F0ECE5',
        margin: 5, 
    },
    playerTxt: {
        fontWeight: 'bold',
        color: '#31304D',
        fontSize: 12.5,
    }
})