import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import { MainCard } from "./MainCard";
import { Pill } from "./Pill"
import {
    PrimaryButton
} from '../Buttons/PrimaryButton'

const rules = [
    'Stay In Character',
    'Follow the Clues',
    'Respect the Story'
]

export function InfoGameCard ({ categoryData, handleNav }) {

    return(
        <MainCard>
            <View style={styles.innerCard}>
                <Text style={styles.titleTxt}>{categoryData?.title}</Text>
                <View style={styles.divider} />
                <Text style={styles.bodyTxt}>{categoryData?.body}</Text>
                <Pill title="OBJECTIVE" />
                <Text style={styles.findMurderTxt}>Find the Murderer</Text>
                <Pill title="RULES" />
                {rules.map((rule, index) => {
                    return(
                    <View key={index} style={styles.ruleWrapper}>
                        <Text style={styles.ruleTxt}>{rule}</Text>
                    </View>
                    )
                })}
                <PrimaryButton 
                    text="Your Character"
                    onPress={handleNav}
                    />
            </View>
        </MainCard>
    )
}

const styles = StyleSheet.create({
    innerCard: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 20,
    },
    titleTxt: {
        color: '#F0ECE5',
        fontSize: 50,
        fontWeight: 'bold',
    },
    divider: {
        width: '100%',
        height: 5,
        backgroundColor: '#F0ECE5',
        borderRadius: 10,
    },
    bodyTxt: {
        color: '#F0ECE5',
        fontSize: 20,
        fontStyle: "italic",
        textAlign: 'center',
    },
    findMurderTxt: {
        fontWeight: 'bold',
        color: '#F0ECE5',
        fontSize: 25,
        textAlign: 'center',
    },
    ruleWrapper: {
        width: '65%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ruleTxt: {
        color: '#F0ECE5',
        fontWeight: 100,
        fontSize: 25,
    }
})