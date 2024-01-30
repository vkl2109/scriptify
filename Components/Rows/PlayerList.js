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

function ChoicePlayer ({ player, selected, isHost }) {
    const { height, width } = useWindowDimensions()
    
    return(
        <View style={[choiceStyles.wrapper, {
            backgroundColor: selected ? '#31304D' : '#F0ECE5',
            width: width * (isHost ? 0.35 : 0.7)
        }]}>
            <Text style={[choiceStyles.playerTxt, {
                color: selected ? '#F0ECE5' : '#161A30',
                fontSize: isHost ? 15 : 25,
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
        fontWeight: 'bold',
    },
})

export function PlayerList ({ 
    players,
    totalPlayers,
    unchosen,
    code,
    isHost
}) {
    const { height, width } = useWindowDimensions()
    const [ choosePlayer, setChoosePlayer ] = useState(false)
    const [ choice, setChoice ] = useState(null)
    const [ error, setError ] = useState(false)
    const { currentUser, deviceID } = useContext(AuthContext)


    const handlePlay = async (selectedChoice) => {
        try {
            const sessionRef = doc(db, 'sessions', code)
            const newPlayerObject = {
                deviceID: deviceID,
                name: currentUser,
                choice: selectedChoice,
            }
            const newPlayersArray = []
            for (const player of totalPlayers) {
                if (player?.choice == selectedChoice) {
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
            setError('')
            setChoosePlayer(true)
        }
        catch (e) {
            console.log(e)
            setError('Please Try Again')
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
                    scrollEnabled
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
                        numColumns={isHost ? 2 : 1}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity 
                                onPress={() => handlePlay(item?.choice)}
                                key={index}
                                >
                                <ChoicePlayer player={item?.choice} selected={choice == item?.choice} isHost={isHost}/>
                            </TouchableOpacity>
                        )}
                        />
                        {/* <View style={styles.btnWrapper}>
                            <PrimaryButton 
                                text={"Choose Player"} 
                                onPress={handlePlay}
                                />
                        </View> */}
                </Animated.View>
                }
            </View>
            <TouchableOpacity 
                onPress={() => setChoosePlayer(prevState => !prevState)}
                style={styles.addButtonWrapper}
                >
                <View style={styles.addButtonInnerWrapper}>
                    {choosePlayer ?
                        <AntDesign name="plus" size={30} color="#31304D" />
                    :
                        <AntDesign name="back" size={30} color="#31304D" />
                    }
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#161A30',
        borderRadius: 17.5,
    },
    flatlistWrapper: (w) => ({
        width: w * 0.9,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        borderWidth: 2.5,
        backgroundColor: '#161A30',
        borderColor: '#F0ECE5',
        borderRadius: 17.5,
        overflow: 'hidden',
        position: 'relative',
    },
    addButtonWrapper: {
        position: 'absolute',
        top: -30,
        right: 10,
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatlistPlayers: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'space-evenly',
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
        margin: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})