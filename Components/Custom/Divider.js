import {
    StyleSheet,
    View,
    Text
} from 'react-native'

export function Divider ({ text = '' }) {
    return(
        <View style={styles.dividerWrapper}>
            <View style={styles.line} />
            <Text style={styles.text}>{text}</Text>
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
    marginTop: 20,
  },
  line: {
    width: '40%',
    borderWidth: 0.75,
    borderColor: 'white'
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    color: 'white',
  }
});