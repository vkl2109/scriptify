import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import {
    BackHeader,
    CharacterCard,
    AnonymousCard
} from '../../Components'
import { SafeAreaView } from 'react-native-safe-area-context'

export function CharacterCardScreen ({ route, navigation }) {
    const { characterData } = route.params

    const handleNav = () => {

    }

    return(
        <SafeAreaView style={styles.container}>
            <BackHeader 
                onPress={navigation.goBack}
                />
            {characterData?.name ?
            <CharacterCard 
                characterData={characterData}
                handleNav={handleNav}
                />
            :
            <AnonymousCard handleNav={handleNav}/>
            }
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
})