import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from 'react-native'
import { 
    useState, 
    useContext,
    useEffect,
} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    ChoosePlayerModal,
    CancelGameModal,
} from '../Components'
import { AuthContext } from '../Context/AuthContextProvider'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import {
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { fetchDoc } from '../Hooks'
import { db } from '../firebase'

export function WaitingScreen ({ route }) {
    const { category, code } = route.params
    const { deviceID } = useContext(AuthContext)
    const [ players, setPlayers ] = useState(null)
    const [ unchosen, setUnchosen] = useState(new Set())
    const [ showCancel, setCancel ] = useState(false)
    const [ hasChosen, setHasChosen ] = useState(false)
    const [ host, setHost ] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        const sessionRef = doc(db, "sessions", code);
        const unsubscribe = onSnapshot(sessionRef, async (doc) => {
            if (doc.exists()) {
                const sessionData = doc.data()
                const newPlayers = new Set()
                const newChosen = new Set()
                for (let [key, value] of Object.entries(sessionData.players)) {
                    if (value == '') {
                        newChosen.add(key)
                    }
                    else {
                        newPlayers.add(value)
                    }
                }
                const hostData = await fetchDoc('users', sessionData?.host)
                if (hostData) setHost(hostData?.name)
                if (!newPlayers.has(deviceID)) setHasChosen(true)
                setUnchosen(newChosen)
                setPlayers(newPlayers)
            }
        })
        return () => {
            unsubscribe()
        }
    },[])

    const getName = async (key) => {
        const playerData = await fetchData('users', key)
        if (playerData) return playerData?.name
    }

    return(
        <SafeAreaView style={styles.container}>
            <ChoosePlayerModal 
                unchosen={unchosen}
                isVisible={hasChosen}
                setIsVisible={setHasChosen}
                code={code}
                />
            <CancelGameModal 
                showCancel={showCancel}
                setCancel={setCancel}
                />
            <View style={styles.topRow}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setCancel(true)}
                    >
                    <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.centerColumn}>
                <Text style={styles.codeText}>{code}</Text>
                <Text style={styles.subText}>Session Code</Text>
            </View>
            {host != '' && <Text style={styles.hostTxt}>Host: {host}</Text>}
            {!players ?
                <View style={styles.waiting}>
                    <ActivityIndicator size='large' />
                </View>
            :
            (players.size == 0 ?
                <View style={styles.waiting}>
                    <ActivityIndicator size='large' />
                    <Text style={styles.waitingText}>Waiting for Players to Join</Text>
                </View>
            :
            <FlatList
                data={players}
                renderItem={({ item, index }) => (
                    <Text>{}</Text>
                )}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#31304D',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    closeButton: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeText: {
        color: 'white',
        fontSize: 50,
    },
    subText: {
        color: 'white',
        fontSize: 20,
    },
    waiting: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    waitingText: {
        color: 'white',
        margin: 10,
    },
    centerColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hostTxt: {
        color: 'white',
        fontSize: 20,
    }
})