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
} from '../Components'
import { useNavigation } from '@react-navigation/native'

export function CategoryScreen ({ route }) {
    const navigation = useNavigation()
    const { title, players } = route.params
    const [ selected, setSelected ] = useState(new Set(players.map(player => player.name)))

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
        navigation.navigate('Waiting', {
            code: 'DXQZ',
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <BackHeader title={title} />
            <FlatList
                ListHeaderComponent={
                    <Text style={styles.subTitle}>Who's Playing?</Text>
                }
                contentContainerStyle={styles.players}
                data={players}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => toggleSelected(item.name)}>
                        <PlayerCheck player={item.name} key={index} selected={selected.has(item.name)}/>
                    </TouchableOpacity>
                )}
                ListFooterComponent={
                    <Text style={styles.subTitle}>✅ {selected.size}</Text>
                }
                />
            {selected.size > 0 
            ?
                <PrimaryButton text={'START'} onPress={handleStart} />
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