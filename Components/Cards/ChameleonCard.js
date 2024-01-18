import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import {
    useState
} from 'react'
import { MainCard } from "./MainCard"
import { PrimaryButton } from '../Buttons/PrimaryButton'

export function ChameleonCard ({ code, handleNextTurn }) {
    const [ showGame, setShowGame ] = useState(false)


    return(
        <MainCard scale={.5}>
            <View style={styles.innerWrapper}>
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.choiceTxt}>Time to Blend In</Text>
                    <View style={styles.divider} />
                    <Text style={styles.quoteTxt}>Everyone Except the Suspect Sees This Word</Text>
                </View>
                <PrimaryButton 
                    text="Play"
                    onPress={handleNextTurn}
                    />
            </View>
        </MainCard>
    )
}

const styles = StyleSheet.create({
    innerWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
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
        fontSize: 30,
        fontWeight: '100',
        fontStyle: "italic",
        textAlign: 'center',
    },
})