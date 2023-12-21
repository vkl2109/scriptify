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
    PlayerCheck
} from '../Components'

export function CategoryScreen ({ route }) {
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

    return(
        <SafeAreaView style={styles.container}>
            <BackHeader />
            <Text style={styles.title}>{title}</Text>
            <FlatList
                contentContainerStyle={styles.players}
                data={players}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => toggleSelected(item.name)}>
                        <PlayerCheck player={item.name} key={index} selected={selected.has(item.name)}/>
                    </TouchableOpacity>
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
    players: {
        flex: 1,
        width: '100%',
    }
})