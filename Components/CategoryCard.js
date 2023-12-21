import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function CategoryCard ({ category }) {
    const navigation = useNavigation();

    const handleCategory = () => {
        navigation.navigate('Category')
    }

    return(
        <TouchableOpacity 
            onPress={handleCategory}
            style={styles.cardWrapper}
            >
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        margin: 10, 
        width: '90%',
        height: 100,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
    }
})