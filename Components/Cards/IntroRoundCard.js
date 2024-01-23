import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { MainCard } from './MainCard'
import { 
    useState, 
    useEffect, 
    useRef
} from 'react'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { IconButton } from '../Buttons/IconButton'
import { MessageModal } from '../Modals/MessageModal'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Animated, { 
    ZoomIn,
} from 'react-native-reanimated';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export function IntroRoundCard ({
    code,
    currentRound,
    handleNext
}) {
    const [ story, setStory ] = useState('')
    const [ typeStory, setTypeStory ] = useState('')
    const [ loadTxt, setLoadTxt ] = useState('.')
    const [ done, setDone ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ index, setIndex ] = useState(0)
    const [ textSpeed, setTextSpeed ] = useState(25)
    const scrollRef = useRef()

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            if (loadTxt.length == 3) setLoadTxt('.')
            else setLoadTxt(loadTxt + '.')
        }, 500)

        return () => {
            clearTimeout(loadingTimeout)
        }
    },[loadTxt])

    useEffect(() => {
        if (story == '') {
            fetchStory()
        }
        else {
            if (index < story.length) {
                const typeStoryTimeout = setTimeout(() => {
                    setTypeStory(prevStory => prevStory + story[index])
                    setIndex(prevIndex => prevIndex + 1)
                }, textSpeed)
                
                return () => {
                    clearTimeout(typeStoryTimeout)
                }
            }
            else {
                scrollRef.current.scrollToEnd({animated: true})
                setDone(true)
            }
        }
    },[story, index])

    const fetchStory = async () => {
        try {
            const roundRef = doc(db, 'sessions', code, 'rounds', `round${currentRound}`)
            const roundSnap = await getDoc(roundRef)
            if (!roundSnap.exists()) throw new Error('not found')
            const roundData = roundSnap.data()
            const newScenario = roundData?.scenario
            if (!newScenario) throw new Error('not found')
            setStory(newScenario)
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
    }

    const handleReplay = () => {
        setIndex(0)
        setStory('')
        setTypeStory('')
        setDone(false)
        setTextSpeed(25)
    }

    const handleSpeed = () => {
        switch (textSpeed) {
            case 25:
                return setTextSpeed(5)
            case 5:
                return setTextSpeed(1)
            case 1:
                return setTextSpeed(25)
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
                <View style={styles.mainTxtWrapper}>
                    <View style={styles.rowWrapper}>
                        <IconButton 
                            dimensions={35}
                            handlePress={done ? handleReplay : handleSpeed}
                            >
                            {done ?
                                <FontAwesome name="repeat" size={15} color="#31304D" />
                            :
                                <AntDesign name="forward" size={15} color="#31304D" />
                            }
                        </IconButton>
                        <Text style={styles.choiceTxt}>Scenario</Text>
                        <IconButton 
                            dimensions={35}
                            handlePress={handleNext}
                            >
                            <AntDesign name="stepforward" size={15} color="#31304D" />
                        </IconButton>
                    </View>
                    <View style={styles.divider} />
                </View>
                <ScrollView 
                    contentContainerStyle={styles.storyWrapper}
                    ref={scrollRef}
                    onContentSizeChange={() => scrollRef.current.scrollToEnd({animated: true})}
                    >
                    {story != '' ?
                        <Text style={styles.storyTxt}>{typeStory}</Text>
                    :
                        <Text style={styles.loadingTxt}>{loadTxt}</Text>
                    }
                    {done &&
                    <Animated.View 
                        entering={ZoomIn.springify().damping(15)}
                        style={styles.btnWrapper}
                        >
                        <PrimaryButton 
                            text={"Next"}
                            onPress={handleNext}
                            />
                    </Animated.View>}
                </ScrollView>
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
        paddingVertical: 10,
    },
    storyWrapper: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'space-between'
    },
    mainTxtWrapper: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    btnWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    replayWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    replayTxt: {
        color: '#F0ECE5',
        fontSize: 20,
        fontWeight: '200',
        marginTop: 10,
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
    storyTxt: {
        color: '#F0ECE5',
        fontSize: 25,
        fontWeight: '100',
        textAlign: 'center',
    },
    loadingTxt: {
        color: '#F0ECE5',
        fontSize: 100,
        fontWeight: '100',
        textAlign: 'center',
    }
})