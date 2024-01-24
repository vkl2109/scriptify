import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native'
import { MainCard } from './MainCard'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import {
    useState,
    useEffect
} from 'react'
import Animated, { 
    FadeInDown,
    FadeOutUp,
    ZoomIn
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export function ResultCard ({
    players,
    suspect,
}) {
    const [ hasVoted, setHasVoted ] = useState(false)
    const [ isCorrect, setIsCorrect ] = useState(false)
    const [ bestActor, setBestActor ] = useState(null)
    const navigation = useNavigation()

    const handleVote = (selected) => {
        if (selected == suspect) setIsCorrect(true)
        setHasVoted(true)
    }

    useEffect(() => {
        if (!bestActor) fetchBestActor()
    },[bestActor])

    const fetchBestActor = async () => {
        try {

        }
        catch (e) {
            console.log(e)
            setBestActor(players[0]?.name)
        }
    }

    return(
        <MainCard scale={0.75}>
            {!hasVoted ?
            <Animated.View 
                entering={FadeInDown.springify().damping(15)} 
                exiting={FadeOutUp.springify().damping(15)} 
                style={styles.wrapper}>
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.choiceTxt}>WHO DID IT?</Text>
                    <View style={styles.divider} />
                    <Text style={styles.quoteTxt}>Vote on your top suspect!</Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.flatlist}
                    data={players}
                    renderItem={({item, index}) => (
                        <Animated.View 
                            entering={FadeInDown.springify().damping(15).delay(100 * index)} 
                            exiting={FadeOutUp.springify().damping(15).delay(100 * index)}
                            style={styles.btnWrapper}>
                            <PrimaryButton 
                                text={item?.choice}
                                onPress={() => handleVote(index)}
                                />
                        </Animated.View >
                    )}
                    />
                <Text style={styles.quoteTxt}>Think about all the quotes and scenarios!</Text>
            </Animated.View>
            :
            <Animated.View 
                entering={FadeInDown.springify().damping(15)} 
                exiting={FadeOutUp.springify().damping(15)} 
                style={styles.wrapper}>
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.choiceTxt}>{isCorrect ? "YOU WON" : "YOU LOST"}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.quoteTxt}>It was {players[suspect]?.choice}!</Text>
                </View>
                <View style={styles.resultWrapper}>
                    
                </View>
                <PrimaryButton 
                    text="Back to Home"
                    onPress={() => navigation.navigate("Landing")}
                    />
            </Animated.View>}
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
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    choiceTxt: {
        color: '#F0ECE5',
        fontSize: 30,
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
        marginHorizontal: 20,
    },
    flatlist: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnWrapper: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
})