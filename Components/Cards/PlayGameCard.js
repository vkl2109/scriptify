import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import { MainCard } from './MainCard'
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
import CircularProgress from 'react-native-circular-progress-indicator';
import {
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from '../../firebase'
import Animated, { 
    SlideInRight,
    SlideInLeft,
    SlideInUp,
    SlideInDown,
    SlideOutRight,
    SlideOutLeft,
    SlideOutUp,
    SlideOutDown
} from 'react-native-reanimated';
import {
    AuthContext,
} from '../../Context'

export function PlayGameCard ({ code }) {
    const [ currentGameData, setCurrentGameData ] = useState(null)
    const [ error, setError ] = useState(false)
    const sessionRef = doc(db, 'sessions', code)
    const { deviceID: authDeviceID } = useContext(AuthContext)

    const checkError = () => {
        if (!currentGameData) setError(true)
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(sessionRef, async (doc) => {
            if (doc.exists()) {
                const sessionData = doc.data()
                setCurrentGameData(sessionData)
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
            let newTurn = currentGameData?.currentTurn
            let newRound = currentGameData?.currentRound
            let newFinished = currentGameData?.hasFinished
            newTurn += 1
            if (newTurn > currentGameData?.players.length) {
                newTurn = 0
                newRound += 1
            }
            if (newRound > currentGameData?.totalRounds) {
                newFinished = true
                newRound = currentGameData?.totalRounds + 1
                newTurn = currentGameData?.players.length
            }
            await updateDoc(sessionRef, {
                currentTurn: newTurn,
                currentRound: newRound,
                hasFinished: newFinished,
            })
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
    }

    const handleRating = async (rating) => {
        try {
            let newPlayers = []
            currentGameData?.players.map((player, index) => {
                if (index == currentGameData?.currentTurn) {
                    let newRatings = {}
                    if (player.ratings) newRatings = JSON.parse(JSON.stringify(player.ratings))
                    newRatings[currentGameData?.currentRound] = {
                        [authDeviceID]: rating
                    }
                    let newPlayer = {
                        choice: player.choice,
                        deviceID: player.deviceID,
                        name: player.name,
                        ratings: newRatings
                    }
                    newPlayers.push(newPlayer)
                }
                else {
                    newPlayers.push(player)
                }
            })
            await updateDoc(sessionRef, {
                players: newPlayers
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
        // if (!currentGameData) return <LoadingView />
        if (currentGameData?.hasFinished) return (
            <Animated.View entering={SlideInRight.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                
            </Animated.View>
        )
        else if (currentGameData?.currentTurn == currentGameData?.players.length) return(
            <Animated.View entering={SlideInRight.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                <ChameleonCard code={code} handleNextTurn={handleNextTurn}/>
            </Animated.View>
        )
        const currentPlayer = currentGameData?.players[currentGameData?.currentTurn]
        const { deviceID: playerDeviceID } = currentPlayer
        return (
            <Animated.View entering={SlideInRight.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                {playerDeviceID == authDeviceID ?
                <IndivGameCard 
                    currentPlayer={currentGameData?.players[currentGameData?.currentTurn]}
                    handleNext={handleNextTurn}
                    />
                :
                <RateGameCard
                    currentPlayer={currentPlayer}
                    handleRating={handleRating}
                    />
                }
            </Animated.View>
        )
    }, [currentGameData])

    return(
        <>
        {currentGameData ?
        <Animated.View 
        entering={SlideInRight.springify().damping(15)}
        style={styles.wrapper}>
            <MessageModal
                isVisible={error}
                setIsVisible={setError}
                message={"Bad Connection"}
                />
            <RoundStepper 
                gameData={currentGameData}
                />
            <View style={{height: 25 }} />
            <TurnRenderer />
        </Animated.View>
        :
        <LoadingView />
        }
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