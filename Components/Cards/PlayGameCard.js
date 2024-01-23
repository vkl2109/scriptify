import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import { RoundStepper } from '../Custom/RoundStepper'
import {
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react'
import { MessageModal } from '../Modals/MessageModal'
import { ChameleonCard } from './ChameleonCard'
import { IndivGameCard } from './IndivGameCard'
import { RateGameCard } from './RateGameCard'
import { IntroRoundCard } from './IntroRoundCard'
import CircularProgress from 'react-native-circular-progress-indicator';
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from '../../firebase'
import Animated, { 
    SlideInRight,
    SlideOutLeft,
} from 'react-native-reanimated';
import {
    AuthContext,
} from '../../Context'

export function PlayGameCard ({ code }) {
    const [ players, setPlayers ] = useState(null)
    const [ turns, setTurns ] = useState(null)
    const [ error, setError ] = useState(false)
    const [ introRound, setIntroRound ] = useState(true)
    const sessionRef = doc(db, 'sessions', code)
    const { deviceID: authDeviceID, currentUser } = useContext(AuthContext)

    const checkError = () => {
        if (!players || !turns) setError(true)
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(sessionRef, async (doc) => {
            if (doc.exists()) {
                const sessionData = doc.data()
                setPlayers(sessionData?.players)
                setTurns(sessionData?.turns)
            }
            else {
                setError(true)
            }
        },
        (error) => {
            console.log(error)
            setError(true)
        })
        return () => {
            unsubscribe()
        }
    },[code])

    function LoadingView () {
        return(
            <Animated.View 
                entering={SlideInRight.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}
                style={styles.center}>
                <CircularProgress
                    value={99}
                    activeStrokeColor={'#F0ECE5'}
                    inActiveStrokeColor={'#F0ECE5'}
                    inActiveStrokeOpacity={0.2}
                    progressValueColor={'#F0ECE5'}
                    valueSuffix={'%'}
                    duration={5000}
                    onAnimationComplete={checkError}
                    />
            </Animated.View>
        )
    }

    const handleNextTurn = async () => {
        try {
            let newTurn = turns?.currentTurn
            let newRound = turns?.currentRound
            let newFinished = turns?.hasFinished
            newTurn += 1
            if (newTurn > players.length) {
                newTurn = 0
                newRound += 1
                setIntroRound(true)
            }
            if (newRound > turns?.totalRounds) {
                newFinished = true
                newRound = turns?.totalRounds + 1
                newTurn = players.length
            }
            let newTurns = {...turns,
                currentTurn: newTurn,
                currentRound: newRound,
                hasFinished: newFinished
            }
            await updateDoc(sessionRef, {
                turns: newTurns,
            })
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
    }

    const handleRating = async (rating) => {
        try {
            const sessionRatingRef = doc(db, "sessions", code, "rounds", `round${turns.currentRound}`)
            const currentPlayer = players[turns.currentTurn]
            const { deviceID: playerDeviceID } = currentPlayer
            const ratingRef = `ratings.${playerDeviceID}.${currentUser}`
            await updateDoc(sessionRatingRef, {
                [ratingRef]: rating,
            })
            return true
        }
        catch (e) {
            console.log(e)
            setError(true)
            return false
        }
    }

    const TurnRenderer = useCallback(() => {
        if (turns.hasFinished) return (
            <Animated.View entering={SlideInRight.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                
            </Animated.View>
        )
        else if (turns.currentTurn == players.length) return(
            <Animated.View entering={SlideInRight.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                <ChameleonCard code={code} handleNextTurn={handleNextTurn}/>
            </Animated.View>
        )
        else if (introRound) return(
            <Animated.View entering={SlideInRight.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                <IntroRoundCard 
                    code={code}
                    currentRound={turns.currentRound}
                    handleNext={() => setIntroRound(false)}
                    />
            </Animated.View>
        )
        const currentPlayer = players[turns.currentTurn]
        const { deviceID: playerDeviceID } = currentPlayer
        return (
            <Animated.View entering={SlideInRight.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                {playerDeviceID == authDeviceID ?
                <IndivGameCard 
                    currentPlayer={currentPlayer}
                    turns={turns}
                    handleNext={handleNextTurn}
                    code={code}
                    />
                :
                <RateGameCard
                    currentPlayer={currentPlayer}
                    handleRating={handleRating}
                    />
                }
            </Animated.View>
        )
    }, [turns, players, introRound])

    return(
        <>
            {players && turns &&
            <Animated.View 
            entering={SlideInRight.springify().damping(15)}
            style={styles.wrapper}>
                <MessageModal
                    isVisible={error}
                    setIsVisible={setError}
                    message={"Bad Connection"}
                    />
                <RoundStepper 
                    turns={turns}
                    numRounds={players.length}
                    introRound={introRound}
                    setIntroRound={setIntroRound}
                    />
                <View style={{height: 25 }} />
                <TurnRenderer />
            </Animated.View>}
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 25,
    },
    center: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
    },
})