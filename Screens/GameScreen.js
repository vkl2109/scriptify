import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Image,
    ImageBackground,
    useWindowDimensions,
} from 'react-native'
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
    useState,
    useEffect,
    useContext
} from 'react'
import {
    AuthContext,
} from '../Context'
import {
    CloseButton,
    CancelGameModal,
    MessageModal,
    InfoGameCard,
    AnonymousCard,
    CharacterCard,
    PlayGameCard,
} from '../Components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo, Ionicons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from '../firebase'
import { fetchDoc } from '../Hooks'

export function GameScreen ({ route, navigation }) {
    const { code } = route.params
    const [ currentCard, setCurrentCard ] = useState("info")
    const [ closeGame, setCloseGame ] = useState(false)
    const [ gameData, setGameData ] = useState(null)
    const [ categoryData, setCategoryData ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)
    const { deviceID } = useContext(AuthContext)
    const sessionRef = doc(db, 'sessions', code)

    const checkError = () => {
        if (loading) setError(true)
    }

    const fetchCategoryData = async (category) => {
        try {
            const infoData = await fetchDoc('info', category)
            if (!infoData) throw new Error('invalid category')
            setCategoryData(infoData)
            setLoading(false)
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(sessionRef, async (doc) => {
            if (doc.exists()) {
                const sessionData = doc.data()
                setGameData(sessionData)
                if (!categoryData) {
                    fetchCategoryData(sessionData?.category)
                }
                else {
                    setLoading(false)
                }
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

    const handleCancel = () => {
        navigation.navigate("Main")
    }

    function LoadingView () {
        return(
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    function GameRenderer () {
        if (!gameData) return <LoadingView />
        if (!categoryData) {
            fetchCategoryData(gameData?.category)
            return <LoadingView />
        }
        switch (currentCard) {
            case "info":
                return (
                    <Animated.View entering={SlideInDown.duration(500)} exiting={SlideOutLeft.duration(500)}>
                        <InfoGameCard categoryData={categoryData} handleNav={() => setCurrentCard("character")}/>
                    </Animated.View>
                )
            case "character":
                let character = null
                for (let player of gameData?.players) {
                    if (player?.deviceID == deviceID) character = player?.choice
                }
                if (!character) return (
                    <Animated.View entering={SlideInDown.duration(500)} exiting={SlideOutLeft.duration(500)}>
                        <AnonymousCard />
                    </Animated.View>
                )
                return (
                    <Animated.View entering={SlideInDown.duration(500)} exiting={SlideOutLeft.duration(500)}>
                        <CharacterCard 
                            characterData={categoryData[character]}
                            handleNav={() => setCurrentCard("play")}
                            />
                    </Animated.View>
                )
            case "play":
                return (
                    <Animated.View entering={SlideInDown.duration(500)} exiting={SlideOutLeft.duration(500)}>
                        <PlayGameCard gameData={gameData} />
                    </Animated.View>
                )
            default:
                return <LoadingView />
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <CancelGameModal 
                showCancel={closeGame}
                setCancel={setCloseGame}
                isHost={false}
                handleCancel={handleCancel}
                />
            <MessageModal
                isVisible={error}
                setIsVisible={setError}
                message={"Failed to Connect: Check Connection"}
                />
            <View style={styles.headerWrapper}>
                {loading ?
                <View />
                :
                <View style={styles.iconsWrapper}>
                    <TouchableOpacity 
                    style={styles.icon}
                    onPress={() => setCurrentCard("info")}>
                        <Entypo name="info-with-circle" size={36} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.icon}
                    onPress={() => setCurrentCard("character")}>
                        <Ionicons name="person-circle-sharp" size={42} color="white" />
                    </TouchableOpacity>
                </View>}
                <CloseButton 
                onPress={() => setCloseGame(true)}
                />
            </View>
            {loading ?
            <View style={styles.center}>
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
            </View>
            :
            <GameRenderer />
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
    },
    center: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerWrapper: {
        flexDirection: 'row',flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    iconsWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    icon: {
        margin: 10,
    }
})