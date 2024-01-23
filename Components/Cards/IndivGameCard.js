import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import {
    useState,
    useEffect,
} from 'react'
import { MainCard } from './MainCard'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { ChoiceModal } from '../Modals/ChoiceModal'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { MessageModal } from '../Modals/MessageModal'

export function IndivGameCard ({ 
    currentPlayer,
    code,
    turns,
    handleNext,
}) {
    const { choice, name } = currentPlayer
    const { currentRound } = turns
    const [ quote, setQuote ] = useState('')
    const [ typeQuote, setTypeQuote ] = useState('')
    const [ index, setIndex ] = useState(0)
    const [ error, setError ] = useState(false)
    const [ showChoice, setShowChoice ] = useState(false)
    const [ showReviews, setShowReview ] = useState(false)

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
                    <Text style={styles.choiceTxt}>Your Turn</Text>
                    <View style={styles.divider} />
                    <Text style={styles.instructions}>Give Us Your Best {choice} Impression!</Text>
                </View>
                {showReviews ? 
                <></>
                :
                <Text style={styles.quoteTxt}>{typeQuote}</Text>}
                <PrimaryButton 
                    text="Next"
                    onPress={() => setShowChoice(true)}
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
})