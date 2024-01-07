import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import {
    MainCard,
    BackHeader
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
        justifyContent: 'space-evenly',
    }
})