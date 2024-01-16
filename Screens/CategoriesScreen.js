import { 
    StyleSheet, 
    View,
    Text, 
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    BackHeader,
    CategoryCard,
    LoadingPie,
    MessageModal,
} from '../Components'
// import { categories } from '../constants'
import { useNavigation } from '@react-navigation/native';
import Animated, { 
    FlipInEasyY
} from 'react-native-reanimated';
import {
  useState,
  useEffect,
} from 'react'
import {
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase"

export function CategoriesScreen () {
  const [ categories, setCategories ] = useState([])
  const [ error, setError ] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"))
        let newCategories = []
        querySnapshot.forEach((doc) => {
          newCategories.push(doc.data())
        });
        setCategories(newCategories)
      }
      catch (e) {
        console.log(e)
        setError(true)
      }
    }

    fetchCategories()
  },[])
    const navigation = useNavigation()
    return(
        <SafeAreaView style={styles.container}>
            <BackHeader 
              title='Categories'
              onPress={navigation.goBack}
              />
            <MessageModal
                isVisible={error}
                setIsVisible={setError}
                message={"Failed to Connect: Check Connection"}
                />
            <FlatList 
                // ListHeaderComponent={<Text style={styles.title}>Choose A Category</Text>}
                contentContainerStyle={styles.categories}
                horizontal={false}
                // ListEmptyComponent={<LoadingPie />}
                numColumns={2}
                data={categories}
                renderItem={({ item, index }) => (
                  <Animated.View key={index} entering={FlipInEasyY.springify().delay(200 * (index))}>
                    <CategoryCard category={item} />
                  </Animated.View>
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
    alignItems: 'flex-start',
    maxWidth: '100%',
    backgroundColor: '#31304D',
  }
});