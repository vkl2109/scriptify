import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import {
    useState,
    useEffect,
} from 'react'
import { fetchDoc } from '../../Hooks'
import Animated, { 
    FadeInDown,
    FadeOutDown,
} from 'react-native-reanimated';

export function HostRow ({ host }) {
    const [ hostName, setHostName ] = useState('')
    const [ showRow, setShowRow ] = useState(false)

    useEffect(() => {
        const getHostName = async () => {
            try {
                let hostData = await fetchDoc('users', host)
                if (hostData) setHostName(hostData?.name)
            }
            catch (e) {
                console.log(e)
            }
        }
        if (host != '') getHostName()
    },[host])

    useEffect(() => {
        if (hostName != '') setShowRow(true)
    },[hostName])

    return(
        <>
            {showRow && 
            <Animated.View 
                entering={FadeInDown.springify().damping(15)}
                style={styles.wrapper}
                >
                <View style={styles.innerWrapper}>
                    <Text style={styles.text}>
                        Host: {hostName}
                    </Text>
                </View>
            </Animated.View>}
        </>
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#161A30',
        borderColor: '#F0ECE5',
        borderWidth: 2.5,
        borderBottomWidth: 0,
        padding: 5,
    },
    text: {
        fontSize: 30,
        lineHeight: 50,
        color: '#F0ECE5',
        fontWeight: 'bold',
        marginHorizontal: 20,
    }
})