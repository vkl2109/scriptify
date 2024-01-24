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

export function ResultCard ({
    players,
    suspect,
}) {
    const [ hasVoted, setHasVoted ] = useState(false)
    const [ isCorrect, setIsCorrect ] = useState(false)

    const handleVote = (selected) => {
        if (selected == suspect) setIsCorrect(true)
        setHasVoted(true)
    }

    return(
        <MainCard scale={0.75}>
            <View style={styles.wrapper}>
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.choiceTxt}>WHO DID IT?</Text>
                    <View style={styles.divider} />
                    <Text style={styles.quoteTxt}>Vote on your top suspect!</Text>
                </View>
                {!hasVoted ?
                <FlatList
                    contentContainerStyle={styles.flatlist}
                    data={players}
                    renderItem={({item, index}) => (
                        <View style={styles.btnWrapper}>
                            <PrimaryButton 
                                text={item?.choice}
                                onPress={() => handleVote(index)}
                                />
                        </View>
                    )}
                    />
                :
                <View />}
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
    },
    flatlist: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnWrapper: {
        width: '100%',
    }
})