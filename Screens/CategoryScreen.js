import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { 
    useState,
    useContext
} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    BackHeader,
    PlayerCheck,
    PrimaryButton,
    LoadingModal
} from '../Components'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigation } from '@react-navigation/native'
import { generateCode } from '../Hooks'
import { db } from "../firebase";
import { AuthContext } from '../Context'

export function CategoryScreen ({ route }) {
    const navigation = useNavigation()
    const { category } = route.params
    const { title, players } = category
    const [ selected, setSelected ] = useState(new Set(players))
    const [ startLoading, setStartLoading ] = useState(false)
    const { deviceID } = useContext(AuthContext)

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
            const newCode = await generateCode()
            if (!newCode) throw new Error('Code Check Failed')
            let newPlayers = []
            for (const value of selected) {
                newPlayers.push({
                    name: '',
                    deviceID: '',
                    choice: value
                })
            }
            await setDoc(doc(db, "sessions", newCode), {
                category: title,
                host: deviceID,
                players: newPlayers,
            })
            setStartLoading(false)
            navigation.navigate('Waiting', {
                code: newCode,
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