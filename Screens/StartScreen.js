import { 
    StyleSheet, 
    View,
    Text, 
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    BackHeader,
    CategoryCard
} from '../Components'
import { categories } from '../constants'
import { useNavigation } from '@react-navigation/native';

export function StartScreen () {
    const navigation = useNavigation()
    return(
        <SafeAreaView style={styles.container}>
            <BackHeader 
              title='Categories'
              onPress={navigation.goBack}
              />
            <FlatList 
                // ListHeaderComponent={<Text style={styles.title}>Choose A Category</Text>}
                contentContainerStyle={styles.categories}
                data={categories}
                renderItem={({ item, index }) => (
                    <CategoryCard category={item} key={index} />
                )}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31304D',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  categories: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '100%',
    backgroundColor: '#31304D',
  }
});