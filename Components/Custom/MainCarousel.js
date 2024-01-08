import {
    StyleSheet,
    View,
    Text,
    Image,
    useWindowDimensions
} from 'react-native'
import Carousel from "react-native-reanimated-carousel";
import { introImages } from '../../assets'

export function MainCarousel () {
    const { height, width } = useWindowDimensions()

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

    return(
        <View style={styles.wrapper}>
            <Carousel
                  loop
                  width={width}
                  height={width}
                  autoPlay
                  data={carouselData}
                  scrollAnimationDuration={2000}
                  renderItem={({ item }) => (
                    <View style={styles.item}>
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
                  )}
                />
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
    item: {
        width: '80%',
        height: '80%',
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
    },
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
        fontSize: 30,
        fontWeight: 'bold',
    }
})