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
                        <Image
                            source={introImages[item.image]}
                            style={styles.image(width)}
                            />
                        <Text style={styles.caption}>
                            {item.caption}
                        </Text>
                    </View>
                  )}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        width: "100%",
    },
    item: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
    image: (w) => ({
        width: w * 0.75,
        height: w * 0.75,
        resizeMode: 'contain'
    }),
    caption: {
        color: '#F0ECE5',
        fontSize: 30,
        fontWeight: 'bold',
    }
})