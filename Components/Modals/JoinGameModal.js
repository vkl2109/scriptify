import {
    StyleSheet,
    Modal,
    View,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { useState, useEffect } from 'react'
import {
    PrimaryButton
} from '../Buttons/PrimaryButton'
import {
    CodeInput,
} from '../CodeInput'
import { BlurView } from 'expo-blur'
import {
    BackHeader
} from '../Headers/BackHeader'
import { useNavigation } from '@react-navigation/native';

export function JoinGameModal ({ isVisible, setIsVisible }) {
    const navigation = useNavigation();
    const [ code, setCode ] = useState('')

    useEffect(() => {
        if (isVisible) {

        }
        else {

        }
    },[isVisible])

    const handleJoin = () => {
        if (code.length != 4) return
        navigation.navigate('Waiting', {
            code: code,
        })
        setIsVisible(false)
        setCode('')
    }

    const handleClose = () => {
        setIsVisible(false)
        setCode('')
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
                    <View style={styles.main}>
                        <BackHeader 
                        title='Enter Code'
                        primary={false}
                        onPress={handleClose}
                        />
                        <CodeInput 
                            value={code}
                            setValue={setCode}
                            />
                        <PrimaryButton
                            variant={code.length == 4 ? "secondary" : "primary"}
                            text={"Join"}
                            onPress={handleJoin}
                            />
                    </View>    
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
        paddingVertical: 20,
        padding: 10,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    row: {
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    }
})