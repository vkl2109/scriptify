import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    BackHeader,
    PlayerCheck,
    PrimaryButton,
    LoadingModal
} from '../Components'
import { useNavigation } from '@react-navigation/native'

export function CategoryScreen ({ route }) {
    const navigation = useNavigation()
    const { category } = route.params
    const { title, players } = category
    const [ selected, setSelected ] = useState(new Set(players))
    const [ startLoading, setStartLoading ] = useState(false)

    const toggleSelected = (player) => {
        if (selected.has(player)) {
            let newSet = new Set(selected)
            newSet.delete(player)
            setSelected(newSet)
        }
        else {
            let newSet = new Set(selected)
            newSet.add(player)
            setSelected(newSet)
        }
    }

    const handleStart = () => {
        setStartLoading(true)
    }

    const createGame = async () => {
        try {
            navigation.navigate('Waiting', {
                code: 'AAAA',
                category: category,
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <BackHeader 
              title={title}
              onPress={navigation.goBack}
              />
            <LoadingModal
            isVisible={startLoading}
            setIsVisible={setStartLoading}
            handleLoading={createGame}
            />
            <View style={styles.wrapperTxt}>
                <Text style={styles.subTitle}>Who's Playing?</Text>
            </View>
            <FlatList
                contentContainerStyle={styles.players}
                data={players}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => toggleSelected(item)}>
                        <PlayerCheck player={item} key={index} selected={selected.has(item)}/>
                    </TouchableOpacity>
                )}
                />
            <View style={styles.wrapperTxt}>
                <Text style={styles.subTitle}>{selected.size} players selected</Text>
            </View>
            {selected.size > 0 
            ?
                <PrimaryButton text={'CREATE GAME'} onPress={handleStart} />
            :
                <Text style={styles.errorTxt}>Must Select At Least One Player</Text>
            }
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
    subTitle: {
        color: 'white',
        fontSize: 20,
    },
    wrapperTxt: {
        padding: 15,
        margin: 20,
        borderRadius: 15,
        backgroundColor: '#161A30'
    },
    players: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorTxt: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
    }
})