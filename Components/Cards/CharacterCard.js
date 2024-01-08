import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import { MainCard } from './MainCard'
import { Avatar } from './Avatar'
import { Pill } from './Pill'
import { PrimaryButton } from '../Buttons/PrimaryButton';

export function CharacterCard ({ characterData, handleNav }) {
    return(
        <MainCard>
            <View style={styles.innerCard}>
                <Avatar />
                <Text style={styles.nameTxt}>{characterData?.name}</Text>
                <View style={styles.divider} />
                <Pill title="TRAITS" />
                {characterData?.traits.map((trait, index) => {
                    return(
                        <View key={index} style={styles.traitsWrapper}>
                            {/* <Text style={styles.traitTxt}>{'\u26AB'}</Text> */}
                            <Text style={styles.traitTxt}>{trait}</Text>
                        </View>
                    )
                })}
                <PrimaryButton 
                    text='Enter Game'
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
    divider: {
        width: '100%',
        height: 5,
        backgroundColor: '#F0ECE5',
        borderRadius: 10,
        margin: 20,
    },
    nameTxt: {
        color: '#F0ECE5',
        fontSize: 30,
        fontWeight: 'bold',
    },
    traitsWrapper: {
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    traitTxt: {
        color: '#F0ECE5',
        fontWeight: '100',
        fontSize: 30,
    }
})