import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import { MainCard } from './MainCard'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import {
    useContext,
} from 'react'
import {
    AuthContext,
} from '../../Context'

export function IndivGameCard ({ 
    currentPlayer,
    handleNext = () => {}
}) {
    const { deviceID: authDeviceID } = useContext(AuthContext)
    const { choice, name, deviceID: playerDeviceID, quote } = currentPlayer

    return(
        <MainCard scale={.75}>
            <View style={styles.innerWrapper}>
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.choiceTxt}>{choice || "Test"}</Text>
                    <View style={styles.divider} />
                    {authDeviceID == playerDeviceID 
                    ?
                    <>
                        <Text style={styles.instructions}>Give Us Your Best Impression!</Text>
                        <Text style={styles.quoteTxt}>{quote || "quote"}</Text>
                    </>
                    :
                    <>
                        <Text style={styles.instructions}>Rate this impression!</Text>
                    </>
                    }
                </View>
                {authDeviceID == playerDeviceID ?
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
    instructions: {
        color: '#F0ECE5',
        fontSize: 20,
        fontWeight: 100,
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