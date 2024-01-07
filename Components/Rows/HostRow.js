import {
    StyleSheet,
    View,
    Text,
    Animated,
} from 'react-native'
import {
    useState,
    useEffect,
    useRef
} from 'react'
import { fetchDoc } from '../../Hooks'

export function HostRow ({ host }) {
    const [ hostName, setHostName ] = useState('')
    const heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const getHostName = async () => {
            try {
                let hostData = await fetchDoc('users', host)
                if (hostData) {
                    setHostName(hostData?.name)
                }
            }
            catch (e) {
                console.log(e)
            }
        }

        if (host != '') getHostName()
    },[host])

    useEffect(() => {
        if (hostName != '') {
            Animated.timing(heightAnim, {
                toValue: 75,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
    },[hostName])

    return(
        <Animated.View style={[styles.wrapper, {
            height: heightAnim
        }]}>
            <Text style={styles.text}>
                Host: {hostName}
            </Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#161A30',
    },
    text: {
        fontSize: 30,
        lineHeight: 50,
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 20,
    }
})