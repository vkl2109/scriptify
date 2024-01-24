import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Share,
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
    MessageModal,
    PlayerRow,
    CloseHeader,
    PrimaryButton,
    HostRow,
    SegmentControl,
    CodeRow,
    PlayerList,
    ChoiceModal,
    LoadingModal,
} from '../Components'
import { AuthContext } from '../Context'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { fetchDoc } from '../Hooks'
import { db } from '../firebase'
import { friendCategory, roundsData } from '../constants'
import { Feather } from '@expo/vector-icons';
import { getFunctions, httpsCallable } from "firebase/functions";
import LottieView from 'lottie-react-native';

export function WaitingScreen ({ route }) {
    const { code } = route.params
    const { deviceID } = useContext(AuthContext)
    const [ players, setPlayers ] = useState(null)
    const [ unchosen, setUnchosen] = useState(new Set())
    const [ showCancel, setCancel ] = useState(false)
    const [ isFull, setIsFull ] = useState(false)
    const [ totalPlayers, setTotalPlayers ] = useState([])
    const [ host, setHost ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ rounds, setRounds ] = useState(roundsData[0].label)
    const [ error, setError ] = useState(false)
    const navigation = useNavigation()
    const isHost = host == deviceID
    const sessionRef = doc(db, 'sessions', code)

    useEffect(() => {
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
                if (newChosen.length == 0 && !sessionData?.turns?.hasStarted) setIsFull(true)
                setHost(sessionData?.host)
                setCategory(sessionData?.category)
                setUnchosen(newChosen)
                setPlayers(newPlayers)
                if (sessionData?.turns?.hasStarted) navigation.navigate(
                    "Game",
                    { code: code }
                )
            }
            else {
                navigation.goBack()
            }
        },
        (error) => {
            console.log(error)
            setError(true)
        })
        return () => {
            unsubscribe()
        }
    },[])

    const handleStart = async () => {
        try {
            setLoading(true)
            const functions = getFunctions();
            const updateWaitingRoom = httpsCallable(functions, 'updateWaitingRoom');
            const result = await updateWaitingRoom({ 
                totalPlayers: totalPlayers, 
                rounds: rounds, 
                code: code,
                category: category,
            })
            if (!result?.data?.success) throw new Error ("failed to update game")
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }

    const handleCancel = async () => {
        try {
            if (isHost) {
                await deleteDoc(sessionRef)
            }
            else {
                const newPlayersArray = []
                for (const player of totalPlayers) {
                    if (player?.deviceID == deviceID) {
                        newPlayersArray.push({
                            deviceID: '',
                            name: '',
                            choice: player.choice,
                        })
                    }
                    else {
                        newPlayersArray.push(player)
                    }
                }
                await updateDoc(sessionRef, {
                    players: newPlayersArray
                })
            }
        }
        catch (e) {
            console.log(e)
        }
        finally {
            navigation.navigate('Landing')
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <ChoiceModal 
                isVisible={showCancel}
                setIsVisible={setCancel}
                text={isHost ? "Cancel Game?" : "Leave Game?"}
                handleChoice={handleCancel}
                />
            <LoadingModal
                isVisible={loading}
                setIsVisible={setLoading}
                />
            <MessageModal
                isVisible={isFull}
                setIsVisible={setIsFull}
                message={"Game is Full"}
                />
            <MessageModal
                isVisible={error}
                setIsVisible={setError}
                message={"Bad Connection"}
                />
            <CloseHeader
                title={'Waiting Room'}
                onPress={() => setCancel(true)}
                />
            <Text style={styles.subText}>Session Code</Text>
            <CodeRow code={code} />
            <HostRow host={host} />
            {!players ?
                <View style={styles.waiting}>
                    <LottieView 
                        source={require("../assets/SimpleLoading2.json")} 
                        autoPlay 
                        loop 
                        style={styles.loader}
                        />
                </View>
            :
            <PlayerList 
                players={players}
                totalPlayers={totalPlayers}
                unchosen={unchosen}
                code={code}
                />
            }
            {unchosen.length > 0 ?
                <Text style={styles.subText}>
                    Waiting for {unchosen.length} more players...
                </Text>
            :
                <Text style={styles.subText}>
                    Waiting for Host to Start
                </Text>
            }
            {isHost &&
                <>
                    <View style={styles.divider} />
                    <Text style={styles.subText}>Rounds?</Text>
                    <SegmentControl 
                        data={roundsData}
                        selected={rounds}
                        setSelected={setRounds}
                        />
                    <PrimaryButton 
                        text={'Start Game'}
                        onPress={() => setLoading(true)}
                        loading={loading}
                        />
                </>
            }
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
        paddingVertical: 10,
    },
    subText: {
        color: '#F0ECE5',
        fontSize: 20,
        fontWeight: '200',
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
    hostTxt: {
        color: 'white',
        fontSize: 20,
    },
    divider: {
        borderWidth: 1,
        width: '90%',
        borderColor: '#F0ECE5',
        margin: 10,
    },
    loader: {
        width: 200,
        height: 200,
    }
})