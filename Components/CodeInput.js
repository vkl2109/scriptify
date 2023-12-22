import {
    StyleSheet,
    Text,
} from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export function CodeInput ({ value, setValue }) {
    const ref = useBlurOnFulfill({value, cellCount: 4});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return(
        <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoFocus
            autoComplete={"one-time-code"}
            renderCell={({index, symbol, isFocused}) => (
            <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            )}
        />
    )
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        margin: 20
    },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 40,
        fontSize: 30,
        borderWidth: 2,
        marginHorizontal: 10,
        borderColor: '#00000030',
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    focusCell: {
        borderColor: '#000',
    },
})