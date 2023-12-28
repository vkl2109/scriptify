import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    useWindowDimensions
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
    PlayerRow,
    CloseHeader,
    PrimaryButton
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
import { friendCategory } from '../constants'

export function WaitingScreen ({ route }) {
    const { category, code } = route.params
    const { deviceID } = useContext(AuthContext)
    const [ players, setPlayers ] = useState(null)
    const [ unchosen, setUnchosen] = useState(new Set())
    const [ showCancel, setCancel ] = useState(false)
    const [ hasChosen, setHasChosen ] = useState(false)
    const [ totalPlayers, setTotalPlayers ] = useState([])
    const [ host, setHost ] = useState('')
    const navigation = useNavigation()
    const { height, width } = useWindowDimensions()

    useEffect(() => {
        const sessionRef = doc(db, "sessions", code);
        const unsubscribe = onSnapshot(sessionRef, async (doc) => {
            if (doc.exists()) {
                const sessionData = doc.data()
                const newPlayers = []
                const newChosen = []
                const playerIDs = new Set()
                setTotalPlayers(sessionData?.players)
                for (const player of sessionData?.players) {
                    if (player?.deviceID == '') {
                        newChosen.push(player)
                    }
                    else {
                        newPlayers.push(player)
                    }
                    playerIDs.add(player?.deviceID)
                }
                if (!playerIDs.has(deviceID)) setHasChosen(true)
                setHost(sessionData?.host)
                setUnchosen(newChosen)
                setPlayers(newPlayers)
            }
        },
        (error) => {
            console.log(error)
        })
        return () => {
            unsubscribe()
        }
    },[])

    const handleStart = () => {
        
    }

    return(
        <SafeAreaView style={styles.container}>
            <ChoosePlayerModal 
                unchosen={unchosen}
                isVisible={hasChosen}
                setIsVisible={setHasChosen}
                totalPlayers={totalPlayers}
                code={code}
                />
            <CancelGameModal 
                showCancel={showCancel}
                setCancel={setCancel}
                />
            <CloseHeader
                title={'Waiting Room'}
                onPress={() => setCancel(true)}
                />
            <View style={styles.centerColumn}>
                <Text style={styles.subText}>Session Code</Text>
                <View style={styles.codeWrapper}>
                    <Text style={styles.codeText}>{code}</Text>
                </View>
            </View>
            {host != '' && <Text style={styles.hostTxt}>Host: {host}</Text>}
            {!players ?
                <View style={styles.waiting}>
                    <ActivityIndicator size='large' />
                </View>
            :
            (players.length == 0 ?
                <View style={styles.waiting}>
                    <ActivityIndicator size='large' />
                    <Text style={styles.waitingText}>Waiting for Players to Join</Text>
                </View>
            :
            <FlatList
                data={players}
                contentContainerStyle={styles.flatlist(width)}
                renderItem={({ item, index }) => (
                    <PlayerRow key={index} player={item} />
                )}
                />
            )}
            <PrimaryButton 
                text={'Start'}
                onPress={handleStart}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
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
    titleTxt: {

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
        width: '100%',
    },
    hostTxt: {
        color: 'white',
        fontSize: 20,
    },
    codeWrapper: {
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 50,
        backgroundColor: '#161A30'
    },
    flatlist: (w) => ({
        width: w * 0.9,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    })
})