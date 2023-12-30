import {
    StyleSheet,
    Modal,
    View,
    Text,
    TextInput,
    Animated,
    TouchableOpacity,
    FlatList,
    useWindowDimensions,
    KeyboardAvoidingView
} from 'react-native'
import { 
    useState,
    useContext,
    useEffect,
    useRef
} from 'react'
import { BlurView } from 'expo-blur'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { AuthContext } from '../../Context/AuthContextProvider'

export function AuthModal ({ isVisible, setIsVisible }) {
    const { currentUser, updateUsername } = useContext(AuthContext)
    const [ username, setUsername ] = useState('')
    const [ error, setError ] = useState('')
    const heightAnim = useRef(new Animated.Value(-300)).current;
    const { height, width } = useWindowDimensions()

    useEffect(() => {
        if (isVisible) {
            Animated.timing(heightAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
    },[isVisible])

    const handleSubmit = () => {
        if (username.length == 0) {
            setError('Enter Username')
            return
        }
        Animated.timing(heightAnim, {
            toValue: -300,
            duration: 500,
            useNativeDriver: false,
        }).start(async ({finished}) => {
            await updateUsername(username)
            setError('')
            setIsVisible(false)
        });
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
                <KeyboardAvoidingView
                    style={styles.wrapper}
                    behavior="padding"
                    >
                    <Animated.View style={[styles.main, {
                        top: heightAnim
                    }]}>
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder={'Enter Name'}
                            placeholderTextColor={'#F0ECE5'}
                            style={styles.usernameWrapper}
                            autoFocus
                            />
                        <Text style={styles.error}>{error}</Text>
                        <View style={styles.btnWrapper}>
                            <PrimaryButton
                                onPress={handleSubmit}
                                variant='secondary'
                                text={'Enter'}
                                />
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
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
        paddingVertical: 50,
        alignItems: 'center'
    },
    main: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
    },
    error: {
        color: 'red',
        fontSize: 20,
    },
    btnWrapper: {
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    usernameWrapper: {
        margin: 10,
        padding: 15,
        borderRadius: 50,
        backgroundColor: '#161A30',
        width: '75%',
        textAlign: 'center',
        fontSize: 30,
        color: '#F0ECE5',
    }
})