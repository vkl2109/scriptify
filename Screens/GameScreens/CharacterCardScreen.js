import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import {
    MainCard,
    BackHeader,
    Avatar
} from '../../Components'
import { SafeAreaView } from 'react-native-safe-area-context'

export function CharacterCardScreen ({ route, navigation }) {

    return(
        <SafeAreaView style={styles.container}>
            <BackHeader 
                onPress={navigation.goBack}
                />
            <MainCard>
                <View style={styles.innerCard}>
                    <Avatar />
                    <View style={styles.divider} />
                    <Text style={styles.characterTxt}>Anonymous</Text>
                </View>
            </MainCard>
            <View />
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
    innerCard: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    divider: {
        width: '100%',
        height: 5,
        backgroundColor: '#F0ECE5',
        borderRadius: 10,
        margin: 20,
    },
    characterTxt: {
        color: '#F0ECE5',
        fontSize: 30,
        fontWeight: 'bold',
    }
})