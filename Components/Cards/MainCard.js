import {
    StyleSheet,
    View,
    useWindowDimensions
} from 'react-native'

export function MainCard ({ children, scale = 1 }) {
    const { height, width } = useWindowDimensions()

    return(
        <View style={styles.wrapper(width, height * scale)}>
            <View style={styles.innerWrapper}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: (w, h) => ({
        height: h * 0.75,
        width: w * 0.9,
        borderRadius: 20,
        backgroundColor: '#161A30',
        alignItems: "center",
        justifyContent: 'center',
        position: 'relative',
        padding: 10,
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 0.75,
    }),
    innerWrapper: {
        width: '100%',
        height: '100%',
        borderWidth: 3,
        borderColor: '#F0ECE5',
        borderRadius: 10,
    }
})