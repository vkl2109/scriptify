import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native'
import { MainCard } from './MainCard'
import { MessageModal } from '../Modals/MessageModal'
import { LoadingModal } from '../Modals/LoadingModal'
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
import Animated, { 
    FadeInDown,
    FadeOutUp,
    ZoomIn
} from 'react-native-reanimated';
import { db } from "../../firebase";
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { VoteRow } from '../Rows/VoteRow'
import {
    AuthContext,
} from '../../Context'
import { getFunctions, httpsCallable } from "firebase/functions";
import { generateNextScenario } from '../../constants'

export function FinalRoundCard ({ 
    code,
    currentRound,
    isHost,
    players,
    handleNextTurn,
    category
}) {
    const [ error, setError ] = useState(false)
    const [ selectedVote, setSelectedVote ] = useState(null)
    const [ options, setOptions ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const roundRef = doc(db, 'sessions', code, 'rounds', `round${currentRound}`)
    const { deviceID: authDeviceID } = useContext(AuthContext)

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
            const newOptionsArray = Object.entries(newOptions)
            setOptions(newOptionsArray)
            // console.log(newOptionsArray)
            newOptionsArray?.map((newOption) => {
                const [ key, value ] = newOption
                value?.map((user) => {
                    if (user == authDeviceID) setSelectedVote(key)
                })
            })
            return newOptionsArray
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
            setSelectedVote(selectedOption)
        }
        catch (e) {
            setError(true)
            console.log(e)
        }
    }

    const toggleNextRound = async () => {
        try {
            setLoading(true)
            const chosenCharacters = players.reduce((acc, player) => {
                acc.push(player?.choice)
                return acc;
            }, []);
            const latestOptionsArray = await fetchOptions()
            const highestVotedOption = latestOptionsArray.reduce((max, obj) => {
                const [key, value] = obj
                const newLength = value.length
                return newLength > max.length ? { "key": key, "length": newLength } : max
            }, { "key": null, "length": -1 })
            const functions = getFunctions();
            const updateNextRound = httpsCallable(functions, 'updateNextRound');
            const result = await updateNextRound({ 
                currentRound: currentRound, 
                code: code,
                scenario: generateNextScenario({
                    category: category,
                    characters: JSON.stringify(chosenCharacters),
                    choice: highestVotedOption["key"]
                }),
            })
            if (!result?.data?.success) throw new Error ("failed to update game")
            handleNextTurn()
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }

    return(
        <MainCard scale={0.75}>
            <View style={styles.wrapper}>
                <MessageModal
                    isVisible={error}
                    setIsVisible={setError}
                    message={"Bad Connection"}
                    />
                <LoadingModal
                    isVisible={loading}
                    setIsVisible={setLoading}
                    />
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.title}>What's Next?</Text>
                    <View style={styles.divider} />
                    <Text style={styles.quoteTxt}>Vote on what to investigate!</Text>
                </View>
                {!selectedVote ?
                <Animated.View 
                    entering={FadeInDown.springify().damping(15)} 
                    exiting={FadeOutUp.springify().damping(15)}
                    style={styles.optionsWrapper}>
                    {options?.map((option, index) => {
                        return (
                        <Animated.View 
                            entering={FadeInDown.springify().damping(15).delay(100 * index)} 
                            exiting={FadeOutUp.springify().damping(15).delay(100 * index)}
                            style={styles.btnWrapper} 
                            key={index}
                            >
                            <PrimaryButton 
                                text={option[0]}
                                onPress={() => handleVote(option[0])}
                                />
                        </Animated.View>)
                    })}
                </Animated.View>
                :
                <View 
                    style={styles.optionsWrapper}>
                    <Animated.Text 
                    entering={FadeInDown.springify().damping(15)} 
                    exiting={FadeOutUp.springify().damping(15)} 
                    style={styles.quoteTxt}>Your Choice:</Animated.Text>
                    <Animated.Text 
                    entering={FadeInDown.springify().damping(15)} 
                    exiting={FadeOutUp.springify().damping(15)}
                    style={styles.choiceTxt}>{selectedVote}</Animated.Text>
                    <Animated.FlatList
                        entering={FadeInDown.springify().damping(15)} 
                        exiting={FadeOutUp.springify().damping(15)}
                        contentContainerStyle={styles.flatlist}
                        data={options}
                        renderItem={({item, index}) => <VoteRow option={item} key={index} roundRef={roundRef} />}
                        />
                </View>
                }
                <View style={styles.endWrapper}>
                    {isHost ? 
                    <PrimaryButton 
                        text="Next Round"
                        loading={loading}
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
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        color: '#F0ECE5',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    choiceTxt: {
        color: '#F0ECE5',
        fontSize: 25,
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
        width: '100%',
        justifyContent: 'flex-start',
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
        marginTop: 20,
    },
    flatlist: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})