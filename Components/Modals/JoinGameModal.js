import {
    StyleSheet,
    Modal,
    Text,
    KeyboardAvoidingView,
    Animated
} from 'react-native'
import { 
    useState, 
    useEffect,
    useRef,
} from 'react'
import {
    PrimaryButton
} from '../Buttons/PrimaryButton'
import {
    CodeInput,
} from '../Custom/CodeInput'
import { BlurView } from 'expo-blur'
import {
    BackHeader
} from '../Headers/BackHeader'
import { useNavigation } from '@react-navigation/native';
import { fetchDoc } from '../../Hooks'

export function JoinGameModal ({ isVisible, setIsVisible }) {
    const navigation = useNavigation();
    const [ code, setCode ] = useState('')
    const [ error, setError ] = useState('')
    const heightAnim = useRef(new Animated.Value(-300)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.timing(heightAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    },[isVisible])

    const handleJoin = async () => {
        if (code.length != 4) return
        try {
            const checkSessionDB = await fetchDoc('sessions', code)
            if (!checkSessionDB) {
                setError('Invalid Session Code')
                return
            }
            handleClose()
            if (checkSessionDB.hasStarted) {
                navigation.navigate('Game', {
                    code: code,
                })
            }
            else {
                navigation.navigate('Waiting', {
                    code: code,
                })
            }
        }
        catch (e) {
            console.log(e)
            setError('Please Try Again')
        }
    }

    const handleClose = () => {
        Animated.timing(heightAnim, {
            toValue: -300,
            duration: 300,
            useNativeDriver: false,
        }).start(({finished}) => {
            setIsVisible(false)
            setCode('')
            setError('')
        });
    }

    return(
        <Modal
            animationType='fade'
            visible={isVisible}
            transparent
            onRequestClose={() => setIsVisible(false)}>
            <BlurView
                style={styles.wrapper}
                intensity={10}
                >
                <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
                    <Animated.View style={[styles.main, {
                        top: heightAnim,
                    }]}>
                        <BackHeader 
                        title='Enter Code'
                        primary={false}
                        onPress={handleClose}
                        />
                        <CodeInput 
                            value={code}
                            setValue={setCode}
                            />
                        {error != '' && <Text style={styles.errorText}>{error}</Text>}
                        <PrimaryButton
                            variant={code.length == 4 ? "secondary" : "primary"}
                            text={"Join"}
                            onPress={handleJoin}
                            />
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
    },
    main: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 30,
        paddingVertical: 20,
        padding: 10,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
    },
    row: {
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    errorText: {
        color: 'red',
        fontSize: 20,
        marginBottom: 15,
    }
})