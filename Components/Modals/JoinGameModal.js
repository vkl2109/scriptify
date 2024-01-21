import {
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import { 
    useState, 
    useEffect,
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
import {
    CodeInput,
} from '../Custom/CodeInput'
import { BlurView } from 'expo-blur'
import {
    BackHeader
} from '../Headers/BackHeader'
import { useNavigation } from '@react-navigation/native';
import { fetchDoc } from '../../Hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export function JoinGameModal ({ isVisible, setIsVisible }) {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [ code, setCode ] = useState('')
    const [ error, setError ] = useState('')
    const [ cardVisible, setCardVisible ] = useState(false)

    useEffect(() => {
        if (isVisible) setCardVisible(true)
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
            if (checkSessionDB?.turns?.hasStarted) {
                navigation.navigate('Game', {
                    code: code,
                })
            }
            else {
                navigation.navigate('Waiting', {
                    code: code,
                })
            }
            setError('')
            setCode('')
        }
        catch (e) {
            console.log(e)
            setError('Please Try Again')
        }
    }

    const handleClose = () => {
        setCardVisible(false)
        setTimeout(() => setIsVisible(false), 500)
    }

    return(
        <Modal
            animationType='fade'
            visible={isVisible}
            transparent
            onRequestClose={handleClose}>
            <TouchableWithoutFeedback
                onPress={handleClose}
                >
                <BlurView
                    style={styles.wrapper}
                    intensity={10}
                    >
                    <StatusBar style="dark"/>
                    {cardVisible &&
                    <TouchableWithoutFeedback>
                        <Animated.View
                            entering={SlideInUp.springify().damping(15)}
                            exiting={SlideOutUp.springify().damping(15)}
                            style={styles.main(insets)}
                            >
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
                    </TouchableWithoutFeedback>}
                </BlurView>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    main:(i) => ({
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: i.top,
        paddingBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        left: 0,
    }),
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