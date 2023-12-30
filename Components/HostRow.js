import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import {
    useState,
    useEffect,
} from 'react'
import { fetchDoc } from '../Hooks'

export function HostRow ({ host }) {
    const [ hostName, setHostName ] = useState('')

    useEffect(() => {
        const getHostName = async () => {
            try {
                let hostData = await fetchDoc(host)
                if (hostData) setHostName(hostData?.name)
            }
            catch (e) {
                console.log(e)
            }
        }

        if (host != '') getHostName()
    },[host])

    return(
        <View style={styles.wrapper}>
            <Text style={styles.text}>
                Host: {hostName}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {

    },
    text: {

    }
})