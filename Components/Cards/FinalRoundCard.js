import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import { MainCard } from './MainCard'
import { MessageModal } from '../Modals/MessageModal'
import { 
    useState, 
    useEffect,
    useContext,
} from 'react'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import { PrimaryButton } from '../Buttons/PrimaryButton'
import {
    AuthContext,
} from '../../Context'

export function FinalRoundCard ({ 
    code,
    currentRound,
    isHost
}) {
    const [ error, setError ] = useState(false)
    const [ options, setOptions ] = useState([])
    const roundRef = doc(db, 'sessions', code, 'rounds', `round${currentRound}`)
    const { deviceID: authDeviceID } = useContext(AuthContext)
    const [ hasVoted, setHasVoted ] = useState(false)
    const [ selectedVote, setSelectedVote ] = useState('')

    useEffect(() => {
        if (options.length == 0) fetchOptions()
    },[options])

    const fetchOptions = async () => {
        try {
            const roundSnap = await getDoc(roundRef)
            if (!roundSnap.exists()) throw new Error('not found')
            const roundData = roundSnap.data()
            const newOptions = roundData?.options
            if (!newOptions) throw new Error('not found')
            setOptions(Object.entries(newOptions))
        }
        catch (e) {
            setError(true)
            console.log(e)
        }
    }

    const handleVote = async (selectedOption) => {
        try {
            const roundRef = doc(db, 'sessions', code, 'rounds', `round${currentRound}`)
            const updateOptionRef = `options.${selectedOption}`
            await updateDoc(roundRef, {
                [updateOptionRef]: arrayUnion(authDeviceID)
            })
            setHasVoted(true)
            setSelectedVote(selectedOption)
        }
        catch (e) {
            setError(true)
            console.log(e)
        }
    }

    const toggleNextRound = () => {

    }

    return(
        <MainCard scale={0.75}>
            <View style={styles.wrapper}>
                <MessageModal
                    isVisible={error}
                    setIsVisible={setError}
                    message={"Bad Connection"}
                    />
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.choiceTxt}>What's Next?</Text>
                    <View style={styles.divider} />
                    <Text style={styles.quoteTxt}>Vote on what to investigate!</Text>
                </View>
                <View style={styles.optionsWrapper}>
                    {!hasVoted ?
                    (options?.map((option, index) => {
                        const [ key, value ] = option
                        return (<View style={styles.btnWrapper} key={index}>
                            <PrimaryButton 
                                text={key}
                                onPress={() => handleVote(key)}
                                />
                        </View>)
                    }))
                    :
                    <Text style={styles.choiceTxt}>You selected {selectedVote}!</Text>
                    }
                </View>
                <View style={styles.endWrapper}>
                    {isHost ? 
                    <PrimaryButton 
                        onPress={toggleNextRound}
                        />
                    :
                    <Text style={styles.quoteTxt}>Waiting for Host</Text>
                    }
                </View>
            </View>
        </MainCard>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingVertical: 20,
    },
    mainTxtWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    choiceTxt: {
        color: '#F0ECE5',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    divider: {
        width: '90%',
        height: 5,
        borderRadius: 10,
        backgroundColor: '#F0ECE5',
        margin: 10,
    },
    quoteTxt: {
        color: '#F0ECE5',
        fontSize: 20,
        fontWeight: '100',
        fontStyle: "italic",
        textAlign: 'center',
    },
    optionsWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },
    btnWrapper: {
        width: '100%',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    endWrapper: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
})