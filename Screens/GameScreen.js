import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
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
    useContext,
    useCallback,
} from 'react'
import {
    AuthContext,
} from '../Context'
import {
    CloseButton,
    ChoiceModal,
    MessageModal,
    InfoGameCard,
    AnonymousCard,
    CharacterCard,
    PlayGameCard,
    LoadingPie,
    IconButton
} from '../Components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo, Ionicons } from '@expo/vector-icons';
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

    const checkError = () => {
        if (loading) setError(true)
    }

    const fetchCategoryData = async (category) => {
        try {
            const infoData = await fetchDoc('categories', category)
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
        const startGame = async () => {
            try {
                const sessionData = await fetchDoc('sessions', code)
                if (!sessionData) throw new Error ("failed to fetch sessionData")
                setGameData(sessionData)
                if (sessionData?.turns?.hasFinished) setCurrentCard("play")
                const infoData = await fetchDoc('categories', sessionData?.category)
                if (!infoData) throw new Error('invalid category')
                setCategoryData(infoData)
                setLoading(false)
            }
            catch (e) {
                console.log(e)
                setError(true)
            }
        }
        startGame()
    },[code])

    const handleCancel = () => {
        navigation.navigate("Landing")
    }

    const GameRenderer = useCallback(() => {
        if (!gameData) return <LoadingPie externalError={error} />
        if (!categoryData) {
            fetchCategoryData(gameData?.category)
            return <LoadingPie externalError={error} />
        }
        switch (currentCard) {
            case "info":
                return (
                    <Animated.View entering={SlideInDown.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                        <InfoGameCard categoryData={categoryData} handleNav={() => setCurrentCard("character")}/>
                    </Animated.View>
                )
            case "character":
                let character = null
                for (let player of gameData?.players) {
                    if (player?.deviceID == deviceID) character = player?.choice
                }
                if (!character) return (
                    <Animated.View entering={SlideInDown.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                        <AnonymousCard 
                            handleNav={() => setCurrentCard("play")}
                            />
                    </Animated.View>
                )
                return (
                    <Animated.View entering={SlideInDown.springify().damping(15)} exiting={SlideOutLeft.springify().damping(15)}>
                        <CharacterCard 
                            characterData={categoryData[character]}
                            handleNav={() => setCurrentCard("play")}
                            />
                    </Animated.View>
                )
            case "play":
                return <PlayGameCard code={code} />
            default:
                return <LoadingPie externalError={error} />
        }
    }, [currentCard, gameData, categoryData])

    return(
        <SafeAreaView style={styles.container}>
            <ChoiceModal 
                isVisible={closeGame}
                setIsVisible={setCloseGame}
                text={"Leave Game?"}
                handleChoice={handleCancel}
                />
            <MessageModal
                isVisible={error}
                setIsVisible={setError}
                message={"Bad Connection"}
                />
            <View style={styles.headerWrapper}>
                {loading ?
                <View style={{ width: 100 }} />
                :
                <View style={styles.iconsWrapper}>
                    <IconButton
                    dimensions={50}
                    handlePress={() => setCurrentCard("info")}>
                        <Entypo name="info" size={25} color="#31304D" />
                    </IconButton>
                    <IconButton
                    dimensions={50}
                    handlePress={() => setCurrentCard("character")}>
                        <Ionicons name="person-sharp" size={25} color="#31304D" />
                    </IconButton>
                </View>}
                <Text style={styles.codeTxt}>{code}</Text>
                <View style={styles.closeBtnWrapper}>
                    <CloseButton 
                    onPress={() => setCloseGame(true)}
                    />
                </View>
            </View>
            {loading ?
            <LoadingPie externalError={error} />
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
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },
    center: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerWrapper: {
        flexDirection: 'row',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        paddingBottom: 10,
        width: '100%',
    },
    iconsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        width: 120,
    },
    icon: {
        margin: 10,
    },
    codeTxt: {
        fontSize: 30,
        color: '#F0ECE5',
        fontWeight: 'bold',
    },
    closeBtnWrapper: {
        width: 120,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})