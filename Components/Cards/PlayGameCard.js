import {
    StyleSheet,
    View,
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
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    const TurnRenderer = useCallback(() => {
        if (!currentGameData) return <LoadingView />
        return (
            <Animated.View entering={SlideInRight.duration(500)} exiting={SlideOutLeft.duration(500)}>
                <MainCard scale={.65}>

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
        justifyContent: 'center',
        paddingBottom: 50,
    },
    center: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})