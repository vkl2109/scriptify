import {
    StyleSheet,
    View,
    Text
} from 'react-native'

export function Divider ({ text }) {
    return(
        <View style={styles.dividerWrapper}>
            <View style={styles.line} />
            <Text>{text}</Text>
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
  dividerWrapper: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  line: {
    width: '40%',
    borderWidth: 0.9,
    borderColor: '#101010'
  }
});