import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import { MainCard } from './MainCard'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import {
    useState
} from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';

export function RateGameCard ({ 
    currentPlayer,
    handleRating,
}) {
    const { choice, name } = currentPlayer
    const [ hasRated, setHasRated] = useState(false)
    const [ currentRating, setCurrentRating ] = useState(3)

    const handleSubmit = () => {
        handleRating(currentRating)
        setHasRated(true)
    }

    return(
        <MainCard scale={.75}>
            <View style={styles.innerWrapper}>
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.choiceTxt}>{choice}'s Turn</Text>
                    <View style={styles.divider} />
                    <Text style={styles.instructions}>Rate {name}'s impression!</Text>
                </View>
                <View style={styles.ratingWrapper}>
                    <AirbnbRating 
                        reviewColor={"#31304D"}
                        selectedColor={"#31304D"}
                        readonly={hasRated}
                        ratingContainerStyle={styles.ratingInnerWrapper}
                        onFinishRating={(rating) => setCurrentRating(rating)}
                        />
                </View>
                {hasRated ? 
                <Text style={styles.waitingTxt}>waiting for other players...</Text>
                :
                <PrimaryButton
                    text="Rate"
                    onPress={handleSubmit}
                    />
                }
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
    ratingWrapper: {
        backgroundColor: '#F0ECE5',
        borderRadius: 15,
        padding: 5,
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    ratingInnerWrapper: {
        backgroundColor: '#F0ECE5',
        borderColor: '#31304D',
        borderWidth: 5,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
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
        fontSize: 20,
        fontWeight: '100',
        textAlign: 'center',
    },
    quoteTxt: {
        color: '#F0ECE5',
        fontSize: 30,
        fontWeight: '100',
        fontStyle: "italic",
        textAlign: 'center',
    },
    waitingTxt: {
        color: '#F0ECE5',
        fontSize: 20,
        fontWeight: '100',
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