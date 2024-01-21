import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    useWindowDimensions
} from 'react-native'
import { PlayerRow } from './PlayerRow'
import {
    useState
} from 'react'
import { ChoosePlayerModal } from '../Modals/ChoosePlayerModal';
import { AntDesign } from '@expo/vector-icons';

export function PlayerList ({ 
    players,
    totalPlayers,
    unchosen,
    code,
}) {
    const { height, width } = useWindowDimensions()
    const [ hasChosen, setHasChosen ] = useState(true)

    return (
        <View style={styles.flatlistWrapper(width)}>
            <ChoosePlayerModal 
                unchosen={unchosen}
                isVisible={hasChosen}
                setIsVisible={setHasChosen}
                totalPlayers={totalPlayers}
                code={code}
                />
            <View style={styles.flatlistInnerWrapper}>
                <FlatList
                    data={players}
                    contentContainerStyle={styles.flatlist}
                    renderItem={({ item, index }) => (
                        <PlayerRow key={index} player={item} />
                    )}
                    // ListEmptyComponent={
                    //     <View style={styles.waiting}>
                    //         <ActivityIndicator size='large' />
                    //     </View>
                    // }
                    />
            </View>
            <TouchableOpacity 
                onPress={() => setHasChosen(true)}
                style={styles.addButtonWrapper}
                >
                <View style={styles.addButtonInnerWrapper}>
                    <AntDesign name="plus" size={30} color="#31304D" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    waiting: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    flatlist: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        flex: 1,
        backgroundColor: '#161A30',
        borderRadius: 17.5,
        overflow: 'hidden',
    },
    flatlistWrapper: (w) => ({
        width: w * 0.9,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        padding: 5,
        backgroundColor: '#161A30',
        borderRadius: 20,
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 2.5,
        shadowRadius: 2,
        marginBottom: 10,
    }),
    flatlistInnerWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        borderWidth: 2.5,
        backgroundColor: '#161A30',
        borderColor: '#F0ECE5',
        borderRadius: 17.5,
        overflow: 'hidden',
        position: 'relative',
    },
    addButtonWrapper: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderRadius: 100,
        padding: 2.5,
        backgroundColor: '#F0ECE5',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    addButtonInnerWrapper: {
        borderRadius: 100,
        padding: 5,
        backgroundColor: '#F0ECE5',
        borderWidth: 2.5,
        borderColor: '#31304D'
    }
})