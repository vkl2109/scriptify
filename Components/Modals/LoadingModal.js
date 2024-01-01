import {
    StyleSheet,
    Modal,
    View,
    Text
} from 'react-native'
import {
     useState,
     useEffect
} from 'react'
import {
    CloseHeader
} from '../Headers/CloseHeader'
import { BlurView } from 'expo-blur'
import * as Progress from 'react-native-progress';

export function LoadingModal ({ isVisible, setIsVisible, handleLoading }) {
    const [ loading, setLoading ] = useState(0)

    useEffect(() => {
        const load = async () => {
            try {

            }
            catch (e) {
                console.log(e)
            }
        }

        load()
    },[])

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
                <View style={styles.main}>
                    <CloseHeader
                        onPress={() => setIsVisible(false)}
                        />
                    <Progress.Pie size={200} indeterminate color={'#F0ECE5'}/>
                    <Text style={styles.creatingTxt}>Loading...</Text>
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    creatingTxt: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F0ECE5',
        margin: 20,
    }
})