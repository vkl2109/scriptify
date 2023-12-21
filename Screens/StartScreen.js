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

export function StartScreen () {
    return(
        <SafeAreaView style={styles.container}>
            <BackHeader />
            <FlatList 
                ListHeaderComponent={<Text style={styles.title}>Choose Your Category</Text>}
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  }
});