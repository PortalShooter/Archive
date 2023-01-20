import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, BackHandler, Keyboard} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useDispatch} from "react-redux";
import {setError} from "../../../redux/auth-reducer";

const CodeEntry = (prop) => {
  const CELL_COUNT = prop.count;
  const typeText = prop.keyboard;
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [keyBoardShow, setKeyBoardShow] = useState(false);

  useEffect(() => {
    prop.setCode(value);
    dispatch(setError(''))
  }, [value]);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  Keyboard.addListener('keyboardDidHide', () => setKeyBoardShow(false))
  Keyboard.addListener('keyboardDidShow', () => setKeyBoardShow(true))

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType={typeText}
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[symbol ? styles.cell: styles.textGray, isFocused &&  keyBoardShow && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused && keyBoardShow ? <Cursor/> : 0)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  codeFieldRoot: {
    marginTop: '8%',
    color: 'red',
    height: 120,
  },
  cell: {
    width: 48,
    fontSize: 46,
    textAlign: 'center',
    color: '#05B9F0',
    fontFamily: 'Nunito-Bold',
  },
  focusCell: {
    color: '#05B9F0',
  },
  textGray: {
    width: 40,
    color: '#E8E8E8',
    fontSize: 48,
    fontFamily: 'Nunito-Regular',
  }
});

export default CodeEntry;
