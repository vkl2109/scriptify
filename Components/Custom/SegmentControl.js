import {
    StyleSheet,
    View,
    TouchableOpacity,
    useWindowDimensions,
    Animated,
    Text
} from 'react-native'
import {
    useState,
    useEffect,
    useRef
} from 'react'

export function SegmentControl ({ data, selected, setSelected }) {
    const [ index, setIndex ] = useState(0)
    const { height, width } = useWindowDimensions()
    const leftAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(leftAnim, {
            toValue: index * width * 0.9 / 4,
            duration: 250,
            useNativeDriver: false
        }).start(({ finished })=> {
            setSelected(data[index].label)
        })
    },[index])

    return(
        <View style={styles.wrapper}>
            {data.map(item => {
                return(
                    <TouchableOpacity
                    key={item.index}
                    style={styles.btn}
                    onPress={() => setIndex(item.index)}>
                        <Text style={styles.selectedTxt}>{item.label}</Text>
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
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        margin: 20,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#161A30',
        flexDirection: 'row',
    },
    movingBtn:(w) => ({
        position: 'absolute',
        top: 0,
        height: 50,
        width: w * 0.9 / 4,
        borderRadius: 20,
        padding: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    }),
    innerBtn: {
        backgroundColor: '#31304D',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 15,
        shadowColor: '#B6BBC4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedTxt: {
        fontSize: 20,
        color: 'white',
    }
})