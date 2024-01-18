import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Share,
    useWindowDimensions
} from 'react-native'
import { Feather } from '@expo/vector-icons';

export function CodeRow ({ code }) {
    const handleShare = async () => {
        try {
            await Share.share({
                message:
                `Let's Play Scriptify! Join the Game below with the code ${code}`,
            });
        }
        catch (e) {
            console.log(e)
        }
    }

    return(
        <TouchableOpacity 
            onPress={handleShare}
            style={styles.codeWrapper}>
            <View style={styles.codeInnerWrapper}>
                <View style={{width: 50 }}/>
                <Text style={styles.codeText}>{code}</Text>
                <View style={styles.iconWrapper}>
                    <Feather name="share" size={30} color="#31304D" />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    codeText: {
        color: '#F0ECE5',
        fontSize: 50,
    },
    codeWrapper: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 10,
        borderRadius: 50,
        backgroundColor: '#161A30',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 5,
        shadowRadius: 2.5,
    },
    codeInnerWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        borderWidth: 2.5,
        backgroundColor: '#161A30',
        borderColor: '#F0ECE5',
    },
    iconWrapper: {
        borderRadius: 100,
        padding: 10,
        backgroundColor: '#F0ECE5'
    }
})