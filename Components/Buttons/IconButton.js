import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native'

export function IconButton ({ 
    children, 
    dimensions = 35, 
    handlePress 
}) {
    return(
        <TouchableOpacity
            style={styles.iconWrapper(dimensions)}
            onPress={handlePress}
            >
            <View style={styles.innerIconWrapper(dimensions)}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
        iconWrapper:(d) => ({
        width: d,
        height: d,
        padding: 2.5,
        borderRadius: 100,
        backgroundColor: '#F0ECE5',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 0.75,
    }),
    innerIconWrapper:(d) => ({
        width: d - 5,
        height: d - 5,
        padding: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2.5,
        borderColor: '#31304D',
    }),
})