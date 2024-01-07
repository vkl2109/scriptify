import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import { MainCard } from "./MainCard";
import { Avatar } from './Avatar';
import { PrimaryButton } from '../Buttons/PrimaryButton';

export function AnonymousCard ({ handleNav }) {

    return(
        <MainCard>
            <View style={styles.innerCard}>
                <Avatar />
                <View style={styles.divider} />
                <Text style={styles.characterTxt}>Anonymous</Text>
                <View style={styles.quoteWrapper}>
                    <Text style={styles.placeholder}>You are spectating</Text>
                </View>
                <PrimaryButton 
                    text='Spectate'
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
        justifyContent: 'flex-start',
        padding: 20,
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
    },
    quoteWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        color: '#F0ECE5',
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center',
    }
})