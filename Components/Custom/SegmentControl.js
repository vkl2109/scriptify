import {
    StyleSheet,
    View,
    TouchableOpacity,
    useWindowDimensions,
    Text
} from 'react-native'
import Animated, {
    useSharedValue,
    withSpring
} from 'react-native-reanimated'
import {
    useState,
    useEffect,
} from 'react'

export function SegmentControl ({ data, selected, setSelected }) {
    const [ index, setIndex ] = useState(0)
    const { height, width } = useWindowDimensions()
    const leftAnim = useSharedValue(0)

    useEffect(() => {
        // Animated.timing(leftAnim, {
        //     toValue: index * width * 0.9 / 4,
        //     duration: 250,
        //     useNativeDriver: false
        // }).start(({ finished })=> {
        // })
        leftAnim.value = withSpring(index * width * 0.9 / 4, {
            mass: 1,
            damping: 15,
            stiffness: 150,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        })
        setSelected(data[index].label)
    },[index])

    return(
        <View style={styles.wrapper}>
            <View style={styles.innerWrapper}>
                {data.map(item => {
                    return(
                        <TouchableOpacity
                        key={item.index}
                        style={styles.btn}
                        onPress={() => setIndex(item.index)}>
                            <Text style={styles.unselectedTxt}>{item.label}</Text>
                        </TouchableOpacity>
                    )
                })}
                <Animated.View style={[styles.movingBtn(width), {
                    left: leftAnim
                }]}>
                    <View style={styles.innerBtn}>
                        <Text style={styles.selectedTxt}>{selected}</Text>
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        margin: 10,
        marginBottom: 20,
        padding: 2.5,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#161A30',
        flexDirection: 'row',
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 5,
        shadowRadius: 2.5,
    },
    innerWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 7.5,
        borderWidth: 2.5,
        borderColor: '#F0ECE5',
        flexDirection: 'row',
    },
    movingBtn:(w) => ({
        position: 'absolute',
        top: 0,
        height: 45,
        margin: 2.5,
        width: w * 0.9 / 4 - 15,
        borderRadius: 5,
        padding: 2.5,
        backgroundColor: '#F0ECE5',
        justifyContent: 'center',
        alignItems: 'center'
    }),
    innerBtn: {
        backgroundColor: '#F0ECE5',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#31304D',
    },
    unselectedTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F0ECE5',
    }
})