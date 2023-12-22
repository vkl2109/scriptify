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
import { useState } from 'react'
import { BlurView } from 'expo-blur'
import {
    PrimaryButton
} from '../Components'
import { db } from '../firebase'
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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

export function ChoosePlayerModal({ unchosen, isVisible }) {
    const [ name, setName ] = useState('')
    const [ choice, setChoice ] = useState()
    const navigation = useNavigation()

    const handlePlay = async () => {
        try {
            const sessionRef = doc(db, 'sessions', code)
        }
        catch (e) {

        }
    }

    return(
        <Modal
            animationType='slide'
            visible={isVisible}
            transparent
            onRequestClose={() => console.log('close')}
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
                    <TextInput 
                        value={name}
                        onChangeText={setName}
                        style={styles.nameInput}
                        maxLength={12}
                        placeholder='name'
                        />
                    {/* <Text>Enter Your Name</Text> */}
                    <FlatList
                        data={Array.from(unchosen)}
                        contentContainerStyle={styles.flatlist}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity 
                                onPress={() => setChoice(item)}
                                key={index}
                                >
                                <ChoicePlayer player={item} selected={choice == item}/>
                            </TouchableOpacity>
                        )}
                        // ListFooterComponent={<Text>Choose Character</Text>}
                        />
                    
                    <PrimaryButton 
                        text={"Let's Play"} 
                        onPress={handlePlay}
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
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 20,
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})