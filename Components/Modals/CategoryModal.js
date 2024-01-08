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
    useEffect
} from 'react'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import Animated, { 
    useSharedValue,
    withTiming,
    withDelay,
    Easing,
    interpolate,
    useAnimatedStyle,
    runOnJS
} from 'react-native-reanimated';
import { images } from '../../assets'

export function CategoryModal ({ isVisible, setIsVisible, category }) {
    const { height, width } = useWindowDimensions()
    const cardHeight = useSharedValue(height);

    const handleClose = () => {
        cardHeight.value = withTiming(height, {
            toValue: height,
            duration: 500,
            easing: Easing.inOut(Easing.quad),
        },)
        setTimeout(() => setIsVisible(false), 500)
    }

    useEffect(() => {
        if (isVisible) cardHeight.value = withTiming(0, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.quad),
        })
    },[isVisible])

    const cardAnimatedStyle = useAnimatedStyle(() => {
        return {
                marginTop: cardHeight.value
        };
    }, []);

    const handlePlay = () => {

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
        alignItems: 'center'
    },
    main:(h, w) => ({
        width: w * 0.8,
        height: h * 0.75,
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
        borderRadius: 100,
        backgroundColor: '#F0ECE5',
        margin: 5, 
    },
    playerTxt: {
        fontWeight: 'bold',
        color: '#31304D',
        fontSize: 20,
    }
})