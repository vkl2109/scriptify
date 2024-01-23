import {
    StyleSheet,
    Modal,
    View,
    Text,
} from 'react-native'
import {
    PrimaryButton
} from '../Buttons/PrimaryButton'
import { BlurView } from 'expo-blur'
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
    useState
} from 'react'

export function ChoiceModal ({ 
    isVisible, 
    setIsVisible, 
    handleChoice,
    text = ''
}) {

    const handleClose = () => {
        setIsVisible(false)
    }

    return (
        <Modal
            animationType='fade'
            visible={isVisible}
            transparent
            onRequestClose={handleClose}
            >
            <BlurView
                style={styles.wrapper}
                intensity={10}
                >
                <Animated.View 
                    entering={SlideInDown.springify().damping(15)} exiting={SlideOutDown.duration(500)}
                    style={styles.main}>
                    <Text style={styles.cancelTxt}>{text}</Text>
                    <View style={styles.greyDivider} />
                    <View style={styles.bottomRow}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <PrimaryButton
                                text={'No'}
                                onPress={handleClose}
                                />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <PrimaryButton
                                text={'Yes'}
                                variant='secondary'
                                onPress={handleChoice}
                                />
                        </View>
                    </View>
                </Animated.View>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cancelTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    greyDivider: {
        width: '100%',
        height: 2,
        marginBottom: 10,
        backgroundColor: 'grey'
    }
})