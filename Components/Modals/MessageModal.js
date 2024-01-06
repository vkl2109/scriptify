import {
    StyleSheet,
    Modal,
    View,
    Text
} from 'react-native'
import { BlurView } from 'expo-blur'
import {
    PrimaryButton
} from '../Buttons/PrimaryButton'

export function MessageModal ({ isVisible, setIsVisible, message }) {
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
                <View style={styles.main}>
                    <Text style={styles.messageTxt}>{message}</Text>
                    <View style={styles.greyDivider} />
                    <PrimaryButton
                        text={'OK'}
                        variant='secondary'
                        onPress={() => setIsVisible(false)}
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    messageTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
    },
    greyDivider: {
        width: '100%',
        height: 2,
        marginBottom: 10,
        backgroundColor: 'grey'
    }
})