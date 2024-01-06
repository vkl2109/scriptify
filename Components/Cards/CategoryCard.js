import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    useWindowDimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets'

export function CategoryCard ({ category }) {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();

    const handleCategory = () => {
        navigation.navigate('Category', {
            category: category
        })
    }

    return(
        <TouchableOpacity 
            onPress={handleCategory}
            style={styles.cardWrapper(width)}
            >
            <View style={styles.innerWrapper}>
                <ImageBackground 
                    source={images[category.image]}
                    style={styles.image}
                    resizeMode='cover'
                    >
                    <View style={styles.topRow}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.title}>{category.title}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomRow}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.title}>{category.count} players</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardWrapper: (w) => ({
        margin: 20, 
        width: w * 0.9,
        height: 100,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: '#31304D',
        padding: 5,
        
    }),
    innerWrapper: {
        width: '100%',
        height: '100%',
        padding: 5,
        backgroundColor: '#161A30',
        borderRadius: 10,
        shadowColor: '#F0ECE5',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    topRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15,
    },
    title: {
        color: 'white',
        fontSize: 16,
    },
    bottomRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        paddingRight: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        // borderColor: 'white',
        // borderWidth: 1,
    },
    textWrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 20,
    }
})