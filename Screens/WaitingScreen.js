import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { 
    useState, 
    useContext,
    useEffect,
} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    BackHeader,
    ChoosePlayerModal,
    CancelGameModal,
} from '../Components'
import { AuthContext } from '../Context/AuthContextProvider'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import {
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from '../firebase'

export function WaitingScreen ({ route }) {
    const { category, code } = route.params
    const { deviceID } = useContext(AuthContext)
    const [ players, setPlayers ] = useState(new Set())
    const [ unchosen, setUnchosen] = useState(new Set())
    const [ showCancel, setCancel ] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        const sessionRef = doc(db, "sessions", code);
        const unsubscribe = onSnapshot(sessionRef, (doc) => {
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
                console.log(newPlayers, newChosen)
                setUnchosen(newChosen)
                setPlayers(newPlayers)
            }
        })

        return () => {
            unsubscribe()
        }
    },[])

    return(
        <SafeAreaView style={styles.container}>
            <ChoosePlayerModal 
                unchosen={unchosen}
                isVisible={!players.has(deviceID)}
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
            <Text style={styles.codeText}>{code}</Text>
            <Text style={styles.subText}>Session Code</Text>
            {players.size == 0 &&
                <View style={styles.waiting}>
                    <ActivityIndicator size='large' />
                    <Text style={styles.waitingText}>Waiting for Players to Join</Text>
                </View>
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
    }
})