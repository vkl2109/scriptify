import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import {
    useState,
    useEffect,
} from 'react'
import { MainCard } from './MainCard'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { ChoiceModal } from '../Modals/ChoiceModal'
import { MessageModal } from '../Modals/MessageModal'
import { ReviewRow } from '../Rows/ReviewRow'
import { IconButton } from '../Buttons/IconButton'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from '../../firebase'
import Animated, { 
    FadeInDown,
    FadeOutUp,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

export function IndivGameCard ({ 
    currentPlayer,
    code,
    turns,
    handleNext,
    numReviews,
}) {
    const { choice, deviceID } = currentPlayer
    const { currentRound } = turns
    const [ quote, setQuote ] = useState('')
    const [ typeQuote, setTypeQuote ] = useState('')
    const [ index, setIndex ] = useState(0)
    const [ error, setError ] = useState(false)
    const [ showChoice, setShowChoice ] = useState(false)
    const [ showReviews, setShowReviews ] = useState(false)
    const [ reviews, setReviews ] = useState([])
    const roundsRef = doc(db, "sessions", code, "rounds", `round${currentRound}`)

    useEffect(() => {
        if (quote == '') fetchStory()
        else {
            if (index < quote.length) {
                const typeStoryTimeout = setTimeout(() => {
                        setTypeQuote(prevQuote => prevQuote + quote[index])
                        setIndex(prevIndex => prevIndex + 1)
                }, 1)
                        
                return () => clearTimeout(typeStoryTimeout)
            }
        }
    },[quote, typeQuote, index])

    useEffect(() => {
        const unsubscribe = onSnapshot(roundsRef, (doc) => {
            if (doc.exists()) {
                const roundsData = doc.data()
                const newRatings = roundsData?.ratings[deviceID]
                if (newRatings) setReviews(Object.entries(newRatings))
            }
        },
        (error) => {
            console.log(error)
            setError(true)
        })
        return () => unsubscribe()
    },[reviews])

    const fetchStory = async () => {
        try {
            const roundRef = doc(db, 'sessions', code, 'rounds', `round${currentRound}`)
            const roundSnap = await getDoc(roundRef)
            if (!roundSnap.exists()) throw new Error('not found')
            const roundData = roundSnap.data()
            const newQuote = roundData?.quotes[choice]
            if (!newQuote) throw new Error('not found')
            setQuote(newQuote)
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
    }

    const toggleChoice = () => {
        // if (reviews.length < numReviews) setShowChoice(true)
        // else handleNext()
        //dev only:
        setShowChoice(true)
    }

    return(
        <MainCard scale={.75}>
            <View style={styles.innerWrapper}>
                <ChoiceModal 
                    isVisible={showChoice}
                    setIsVisible={setShowChoice}
                    text={"Proceed without all reviews?"}
                    handleChoice={handleNext}
                    />
                <MessageModal
                    isVisible={error}
                    setIsVisible={setError}
                    message={"Bad Connection"}
                    />
                <View style={styles.mainTxtWrapper}>
                    <View style={styles.titleWrapper}>
                        <View style={{ width: 35 }}/>
                        <Text style={styles.choiceTxt}>Your Turn</Text>
                        {reviews.length > 0 ?
                        <Animated.View
                            entering={FadeInDown.springify().damping(15)} 
                            exiting={FadeOutUp.springify().damping(15)}
                            >
                            <IconButton
                                handlePress={() => setShowReviews(prevReview => !prevReview)}
                                >
                                {showReviews ?
                                <FontAwesome name="quote-right" size={15} color="#31304D" />
                                :
                                <FontAwesome name="star" size={20} color="#31304D" />
                                }
                            </IconButton>
                        </Animated.View>
                        :
                        <View style={{ width: 35 }}/>}
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.instructions}>Give Us Your Best {choice} Impression!</Text>
                </View>
                {showReviews ? 
                <Animated.FlatList 
                    entering={FadeInDown.springify().damping(15)} 
                    exiting={FadeOutUp.springify().damping(15)}
                    data={reviews}
                    contentContainerStyle={styles.flatlist}
                    renderItem={({ item, index }) => <ReviewRow review={item} />}
                    />
                :
                <Animated.Text 
                    entering={FadeInDown.springify().damping(15)} 
                    exiting={FadeOutUp.springify().damping(15)}
                    style={styles.quoteTxt}>
                        {typeQuote}
                </Animated.Text>}
                <PrimaryButton 
                    text="Next"
                    onPress={toggleChoice}
                    />
            </View>
        </MainCard>
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
    instructions: {
        color: '#F0ECE5',
        fontSize: 15,
        fontWeight: '100',
        textAlign: 'center',
    },
    quoteTxt: {
        color: '#F0ECE5',
        fontSize: 20,
        fontWeight: '100',
        fontStyle: "italic",
        textAlign: 'center',
    },
    waitingTxt: {
        color: '#F0ECE5',
        fontSize: 20,
        textAlign: 'center',
    },
    center: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
    },
    flatlist: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showReviewsTxt: {
        color: '#F0ECE5',
        margin: 10,
        fontSize: 15,
        fontWeight: '400'
    },
    titleWrapper: {
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconWrapper: {
        width: 35,
        height: 35,
        padding: 2.5,
        borderRadius: 100,
        backgroundColor: '#F0ECE5',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    innerIconWrapper: {
        width: 30,
        height: 30,
        padding: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2.5,
        borderColor: '#31304D',
    }
})