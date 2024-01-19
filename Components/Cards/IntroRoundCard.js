import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import { MainCard } from './MainCard'
import { useState, useEffect, } from 'react'
import { PrimaryButton } from '../Buttons/PrimaryButton'

export function IntroRoundCard ({
    code,
    currentRound,
    handleNext
}) {
    const [ story, setStory ] = useState('')
    const [ loadTxt, setLoadTxt ] = useState('.')

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            if (loadTxt.length == 3) setLoadTxt('.')
            else setLoadTxt(loadTxt + '.')
        }, 500)

        return () => {
            clearTimeout(loadingTimeout)
        }
    },[loadTxt])

    return(
        <MainCard scale={0.75}>
            <View style={styles.wrapper}>
                <View style={styles.mainTxtWrapper}>
                    <Text style={styles.choiceTxt}>Scenario</Text>
                    <View style={styles.divider} />
                </View>
                {story != '' ?
                    <Text style={styles.storyTxt}>{story}</Text>
                :
                    <Text style={styles.loadingTxt}>{loadTxt}</Text>
                }
                <View />
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
        paddingVertical: 25,
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
    storyTxt: {
        color: '#F0ECE5',
        fontSize: 30,
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