import {
    StyleSheet,
    View,
    Text,
    Image,
    useWindowDimensions
} from 'react-native'
import Animated, { 
    SlideInRight,
    SlideInLeft,
    SlideInUp,
    SlideInDown,
    SlideOutRight,
    SlideOutLeft,
    SlideOutUp,
    SlideOutDown,
    RollInRight, 
    RollInLeft,
    RollOutRight,
    RollOutLeft,
    ZoomInRight,
    ZoomOutLeft,
} from 'react-native-reanimated';
import {
    useState,
    useEffect,
    useCallback,
} from 'react'
import { introImages } from '../../assets'

const carouselData = [
    {
        id: 1,
        image: 'theater',
        caption: 'Play With Friends!'
    },
    {
        id: 2, 
        image: 'suspect',
        caption: 'Find the Suspect!'
    },
    {
        id: 3,
        image: 'fun',
        caption: 'Fun for All Ages!'
    }
]

export function MainCarousel () {
    const { height, width } = useWindowDimensions()
    const [ index, setIndex ] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 2000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    function IndivSlide ({ item }) {
        return(
            <View style={styles.item(width)}>
                <View style={styles.inner}>
                    <Image
                        source={introImages[item.image]}
                        style={styles.image}
                        />
                    <View style={styles.divider} />
                    <Text style={styles.caption}>
                        {item.caption}
                    </Text>
                </View>
            </View>
        )
    }

    const RenderSlide = useCallback(() => {
        return(
            <Animated.View entering={ZoomInRight.springify().damping(15)} exiting={ZoomOutLeft.springify().damping(15)}>
                <IndivSlide item={carouselData[index]} />
            </Animated.View>
        )
    },[index])

    return(
        <View style={styles.wrapper}>
            <RenderSlide />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        width: "100%",
    },
    item:(w) => ({
        width: w * 0.8,
        height: w * 0.8,
        borderRadius: 20,
        backgroundColor: '#161A30',
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 0.75,
    }),
    inner: {
        width: '100%',
        height: '100%',
        borderWidth: 3,
        borderColor: '#F0ECE5',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
    },
    divider: {
        width: '90%',
        height: 5,
        borderRadius: 100,
        backgroundColor: '#F0ECE5',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    caption: {
        color: '#F0ECE5',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})