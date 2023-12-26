import {
    StyleSheet,
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    useWindowDimensions
} from 'react-native'
import { 
    useState,
    useContext
} from 'react'
import { BlurView } from 'expo-blur'
import {
    PrimaryButton
} from './PrimaryButton'
import { db } from '../firebase'
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContextProvider'
import { friendCategory } from '../constants'

function ChoicePlayer ({ player, selected }) {
    const { height, width } = useWindowDimensions()

    return(
        <View style={[choiceStyles.wrapper, {
            backgroundColor: selected ? 'grey' : 'white',
            width: width * 0.5
        }]}>
            <Text>{player}</Text>
        </View>
    )
}

const choiceStyles = StyleSheet.create({
    wrapper: {
        height: 30,
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export function ChoosePlayerModal({ unchosen, isVisible, setIsVisible, code, totalPlayers }) {
    const [ name, setName ] = useState('')
    const [ error, setError ] = useState('')
    const [ choice, setChoice ] = useState()
    const navigation = useNavigation()
    const { currentUser, deviceID } = useContext(AuthContext)

    const handlePlay = async () => {
        try {
            if (!currentUser && name == '') {
                setError('Enter Name')
                return
            }
            if (!choice) {
                setError('Choose Player')
                return
            }
            const sessionRef = doc(db, 'sessions', code)
            const newPlayerObject = {
                deviceID: deviceID,
                name: name == '' ? currentUser : name,
                choice: choice,
            }
            const newPlayersArray = []
            for (const player of totalPlayers) {
                if (player?.choice == choice) {
                    newPlayersArray.push(newPlayerObject)
                }
                else {
                    newPlayersArray.push(player)
                }
            }
            await updateDoc(sessionRef, {
                players: newPlayersArray
            })
            setChoice()
            setName('')
            setError('')
            setIsVisible(false)
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

    return(
        <Modal
            animationType='fade'
            visible={isVisible}
            transparent
            onRequestClose={() => setIsVisible(false)}
            >
            <BlurView
                style={styles.wrapper}
                intensity={10}
                >
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={styles.backBtn}
                    >
                    <Ionicons name="arrow-back" size={32} color="white" />
                </TouchableOpacity>
                <View style={styles.main}>
                    {currentUser
                    ?
                    <Text style={styles.name}>{currentUser}</Text>
                    :
                    <TextInput 
                        value={name}
                        onChangeText={setName}
                        style={styles.nameInput}
                        maxLength={12}
                        placeholder='name'
                        />}
                    {/* <Text>Enter Your Name</Text> */}
                    <FlatList
                        data={unchosen}
                        contentContainerStyle={styles.flatlist}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity 
                                onPress={() => toggleChoice(item?.choice)}
                                key={index}
                                >
                                <ChoicePlayer player={item?.choice} selected={choice == item?.choice}/>
                            </TouchableOpacity>
                        )}
                        // ListFooterComponent={<Text>Choose Character</Text>}
                        />
                    <Text style={styles.errorText}>{error}</Text>
                    <PrimaryButton 
                        text={"Let's Play"} 
                        onPress={handlePlay}
                        variant={"secondary"}
                        />
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameInput: {
        borderRadius: 20,
        width: '50%',
        height: 50,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'grey',
        textAlign: 'center',
        fontSize: 20,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#31304D'
    },
    backBtn: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rbga(0, 0, 0, 0.75)',
        margin: 10,
        position: 'absolute',
        left: 20,
        top: 50,
    },
    backTxt: {
        color: 'white',
        fontSize: 20,
    },
    flatlist: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        fontSize: 15,
        margin: 5,
    }
})