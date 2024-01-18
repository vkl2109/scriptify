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
            <View style={styles.innerWrapper}>
                <Text style={styles.text}>
                    Host: {hostName}
                </Text>
            </View>
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
        paddingTop: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 0,
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 5,
        shadowRadius: 2.5,
    },
    innerWrapper: {
        borderTopRightRadius: 17.5,
        borderTopLeftRadius: 17.5,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#161A30',
        borderColor: '#F0ECE5',
        borderWidth: 2.5,
        borderBottomWidth: 0,
    },
    text: {
        fontSize: 30,
        lineHeight: 50,
        color: '#F0ECE5',
        fontWeight: 'bold',
        marginHorizontal: 20,
    }
})