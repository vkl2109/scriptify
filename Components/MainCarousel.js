import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions
} from 'react-native'
import Carousel from "react-native-reanimated-carousel";

export function MainCarousel () {
    const { height, width } = useWindowDimensions()

    return(
        <View style={styles.wrapper}>
            <Carousel
                  loop
                  width={width}
                  height={width}
                  data={[]}
                  scrollAnimationDuration={1000}
                  renderItem={({ item }) => (
                    <></>
                  )}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {

    },
    item: {

    }
})