import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import {
    useState
} from 'react'
import { MainCard } from './MainCard'
import { PrimaryButton } from '../Buttons/PrimaryButton'

export function IndivGameCard ({ 
    currentPlayer,
    handleNext = () => {}
}) {
    const { choice, name, quote } = currentPlayer
    const [ waiting, setWaiting ] = useState(true)

    return(
        <MainCard scale={.75}>
            <View style={styles.innerWrapper}>
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.choiceTxt}>Your Turn</Text>
                    <View style={styles.divider} />
                    <Text style={styles.instructions}>Give Us Your Best {choice} Impression!</Text>
                </View>
                <Text style={styles.quoteTxt}>"{quote || "quote"}"</Text>
                {waiting ?
                <PrimaryButton 
                    text="Next"
                    onPress={handleNext}
                    />
                :
                <Text style={styles.waitingTxt}>waiting for {name}...</Text>
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
        fontSize: 30,
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