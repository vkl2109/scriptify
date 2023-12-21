import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    useWindowDimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function CategoryCard ({ category }) {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();

    const handleCategory = () => {
        navigation.navigate('Category')
    }

    return(
        <TouchableOpacity 
            onPress={handleCategory}
            style={styles.cardWrapper(width)}
            >
            <View style={styles.topRow}>
                <Text style={styles.title}>{category.title}</Text>
            </View>
            <View style={styles.bottomRow}>
                <Text style={styles.title}>{category.players} players</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardWrapper: (w) => ({
        margin: 20, 
        width: w * 0.9,
        height: 100,
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    }),
    topRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 16,
    },
    bottomRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})