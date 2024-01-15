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
} from 'react'
import { MessageModal } from '../Modals/MessageModal'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import CircularProgress from 'react-native-circular-progress-indicator';
import {
  doc,
  onSnapshot,
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

export function PlayGameCard ({ code }) {
    const [ currentGameData, setCurrentGameData ] = useState(null)
    const [ error, setError ] = useState(false)
    const sessionRef = doc(db, 'sessions', code)

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
                entering={SlideInRight.duration(500)} exiting={SlideOutLeft.duration(500)}
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

    const handleNextTurn = () => {

    }

    const TurnRenderer = useCallback(() => {
        if (!currentGameData) return <LoadingView />
        return (
            <Animated.View entering={SlideInRight.duration(500)} exiting={SlideOutLeft.duration(500)}>
                <MainCard scale={.5}>
                    <View style={styles.innerWrapper}>
                        <View style={styles.mainTxtWrapper}>
                            <Text style={styles.choiceTxt}>{currentGameData?.players[currentGameData?.currentTurn]?.choice || "Test"}</Text>
                            <View style={styles.divider} />
                            <Text style={styles.quoteTxt}>"Quote"</Text>
                        </View>
                        <PrimaryButton 
                            text="Next"
                            onPress={handleNextTurn}
                            />
                    </View>
                </MainCard>
            </Animated.View>
        )
    }, [currentGameData])

    return(
        <View style={styles.wrapper}>
            <MessageModal
                isVisible={error}
                setIsVisible={setError}
                message={"Failed to Connect: Check Connection"}
                />
            <RoundStepper 
                gameData={currentGameData || {}}
                />
            <View style={{height: 50 }} />
            <TurnRenderer />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 25,
    },
    innerWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
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
        fontSize: 30,
        fontWeight: '100',
        fontStyle: "italic",
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