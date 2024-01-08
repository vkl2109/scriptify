import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    ImageBackground,
    useWindowDimensions,
} from 'react-native'
import { CategoryModal } from '../Modals/CategoryModal';
import {
    useState
} from 'react'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets'

export function CategoryCard ({ category }) {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    const [ isModal, setIsModal ] = useState(false)

    const handleCategory = () => {
        setIsModal(true)
    }

    return(
        <TouchableOpacity 
            onPress={handleCategory}
            style={styles.cardWrapper(width)}
            >
            <CategoryModal 
                isVisible={isModal}
                setIsVisible={setIsModal}
                category={category}
                />
            <View style={styles.wrapper}>
                <View style={styles.innerWrapper}>
                    <Image 
                        source={images[category.image]}
                        style={styles.image}
                        resizeMode='cover'
                        />
                        <Text style={styles.title(20)}>{category.title}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.title(15)}>{category.count} players</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardWrapper: (w) => ({
        margin: 20, 
        width: w * 0.4,
        height: 200,
        backgroundColor: '#31304D',
    }),
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#161A30',
        borderRadius: 15,
        padding: 5,
        shadowColor: '#F0ECE5',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    innerWrapper: {
        width: '100%',
        height: '100%',
        padding: 5,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2.5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    divider: {
        width: '90%',
        height: 2.5,
        borderRadius: 10,
        backgroundColor: '#F0ECE5'
    },
    title: (s) => ({
        color: 'white',
        fontSize: s,
        margin: 5,
        fontWeight: 'bold',
    }),
    image: {
        width: '100%',
        height: 100,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
    },
})