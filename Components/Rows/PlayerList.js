import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    useWindowDimensions,
    Text,
} from 'react-native'
import { PlayerRow } from './PlayerRow'
import {
    useState,
    useContext
} from 'react'
import {
    PrimaryButton
} from '../Buttons/PrimaryButton'
import Animated, { 
    SlideInRight,
    SlideInLeft,
    SlideInUp,
    SlideInDown,
    SlideOutRight,
    SlideOutLeft,
    SlideOutUp,
    SlideOutDown
} from 'react-native-reanimated';
import { ChoosePlayerModal } from '../Modals/ChoosePlayerModal';
import { AntDesign } from '@expo/vector-icons';
import { useChoosePlayerStore } from '../../Context/ZustandStores';
import { MessageModal } from '../Modals/MessageModal';
import { db } from '../../firebase'
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from '../../Context'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function ChoicePlayer ({ player, selected }) {
    const { height, width } = useWindowDimensions()
    
    return(
        <View style={[choiceStyles.wrapper, {
            backgroundColor: selected ? '#31304D' : '#F0ECE5',
            width: width * 0.5
        }]}>
            <Text style={[choiceStyles.playerTxt, {
                color: selected ? '#F0ECE5' : '#161A30',
            }]}>{player}</Text>
        </View>
    )
}

const choiceStyles = StyleSheet.create({
    wrapper: {
        margin: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        borderColor: '#F0ECE5',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F0ECE5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    },
    playerTxt: {
        marginVertical: 5,
    },
})

export function PlayerList ({ 
    players,
    totalPlayers,
    unchosen,
    code,
}) {
    const { height, width } = useWindowDimensions()
    const [ choosePlayer, setChoosePlayer ] = useState(false)
    const [ choice, setChoice ] = useState(null)
    const [ error, setError ] = useState(false)
    const { currentUser, deviceID } = useContext(AuthContext)


    const handlePlay = async () => {
        try {
            if (!choice) {
                setChoosePlayer(true)
                return
            }
            const sessionRef = doc(db, 'sessions', code)
            const newPlayerObject = {
                deviceID: deviceID,
                name: currentUser,
                choice: choice,
            }
            const newPlayersArray = []
            for (const player of totalPlayers) {
                if (player?.choice == choice) {
                    newPlayersArray.push(newPlayerObject)
                }
                else if (player?.deviceID == deviceID) {
                    newPlayersArray.push({
                        deviceID: '',
                        name: '',
                        choice: player?.choice
                    })
                }
                else {
                    newPlayersArray.push(player)
                }
            }
            await updateDoc(sessionRef, {
                players: newPlayersArray
            })
            setChoice()
            setError('')
            setChoosePlayer(true)
        }
        catch (e) {
            console.log(e)
            setError('Please Try Again')
        }
    }

    const toggleChoice = (item) => {
        if (choice == item) {
            setChoice()
        }
        else {
            setChoice(item)
        }
    }

    return (
        <View style={styles.flatlistWrapper(width)}>
            <MessageModal
                isVisible={error}
                setIsVisible={setError}
                message={"Bad Connection"}
                />
            <View style={styles.flatlistInnerWrapper}>
                {choosePlayer ?
                <Animated.FlatList
                    entering={SlideInDown.springify().damping(15)} 
                    exiting={SlideOutDown.duration(500)}
                    data={players}
                    contentContainerStyle={styles.flatlist}
                    renderItem={({ item, index }) => (
                        <PlayerRow key={index} player={item} />
                    )}
                    />
                :
                <Animated.View 
                    entering={SlideInDown.springify().damping(15)} 
                    exiting={SlideOutDown.duration(500)}
                    style={styles.main}>
                    <FlatList
                        data={unchosen}
                        contentContainerStyle={styles.flatlistPlayers}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity 
                                onPress={() => toggleChoice(item?.choice)}
                                key={index}
                                >
                                <ChoicePlayer player={item?.choice} selected={choice == item?.choice}/>
                            </TouchableOpacity>
                        )}
                        />
                        <View style={styles.btnWrapper}>
                            <PrimaryButton 
                                text={"Choose Player"} 
                                onPress={handlePlay}
                                />
                        </View>
                </Animated.View>
                }
            </View>
            {choosePlayer &&
            <TouchableOpacity 
                onPress={() => setChoosePlayer(false)}
                style={styles.addButtonWrapper}
                >
                <View style={styles.addButtonInnerWrapper}>
                    <AntDesign name="plus" size={30} color="#31304D" />
                </View>
            </TouchableOpacity>}
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
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 0.75,
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
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F0ECE5',
        margin: 5,
    },
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#161A30',
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatlistPlayers: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 15,
        margin: 5,
    },
    greyDivider: {
        width: '90%',
        height: 2.5,
        borderRadius: 10,
        backgroundColor: '#F0ECE5',
        marginBottom: 10,
    },
    btnWrapper: {
        margin: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})