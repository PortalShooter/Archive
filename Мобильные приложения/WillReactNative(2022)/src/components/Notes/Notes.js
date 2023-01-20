import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import stylesGeneral from '../../assets/stylesGeneral';
import ModalAlert from '../ModalWindows/ModalAlert';
import {useDispatch} from 'react-redux';
import {postUserNotes} from '../../redux/dayBook-reducer';
import NetInfo from '@react-native-community/netinfo';
import {getTasksActual} from '../../redux/auth-reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Notes = ({setNotesIsOpen, notes, date}) => {
  const dispatch = useDispatch();

  AsyncStorage.getItem('@DayBookNotes').then(res => {
    if (res !== null) {
      setNotesInputValue(res);
    }
  });

  const [notesInputValue, setNotesInputValue] = useState('');
  const [error, setError] = useState(false);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const notesSaveHandler = async () => {
    if (notesInputValue) {
      if (connected) {
        if (notesInputValue.length <= 15000) {
          dispatch(postUserNotes(date, notesInputValue));
          setNotesInputValue('');
          setNotesIsOpen(false);
        } else if (notesInputValue.length >= 15000) {
          const notesArr = [];
          for (let i = 0; i < Math.ceil(notesInputValue.length / 15000); i++) {
            if (i === 0) {
              notesArr.push(notesInputValue.slice(0, 15000));
            } else if (i === 1) {
              notesArr.push(notesInputValue.slice(15000, 30000));
            } else if (i === 2) {
              notesArr.push(notesInputValue.slice(30000, 45000));
            }
          }
          for (const item of notesArr) {
            await dispatch(postUserNotes(date, item));
          }
          setNotesInputValue('');
          setNotesIsOpen(false);
        }
      } else if (!connected) {
        AsyncStorage.setItem('@DayBookNotes', notesInputValue);
        setNotesIsOpen(false);
      }
    } else {
      setError(true);
    }
  };

  return (
    // <KeyboardAwareScrollView style={{height: '100%'}}>
    <View
      style={{
        padding: 21,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 5,
      }}>
      
      {error ? <ModalAlert setError={setError} /> : null}
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>
        Заметка #{notes ? notes.length + 1 : '1'}
      </Text>
      
      <TextInput
        defaultValue={notesInputValue}
        onChangeText={setNotesInputValue}
        multiline={true}
        autoCorrect={false}
        placeholder={'Запиши все здесь'}
        style={[styles.textInput, {minHeight: 292, textAlignVertical: 'top'}]}
      />
      
      
      <Text
        style={[stylesGeneral.blueButton, {marginBottom: 13}]}
        onPress={notesSaveHandler}>
        Сохранить
      </Text>
      <Text
        style={styles.clearButton}
        onPress={async () => {
          setNotesInputValue('');
          await AsyncStorage.removeItem('@DayBookNotes');
        }}>
        Очистить
      </Text>
    </View>
    // </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  itemFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    marginBottom: 13,
  },
  textInput: {
    paddingHorizontal: 21,
    paddingVertical: 15,
    marginVertical: 10,
    fontFamily: 'Nunito-Regular',
    backgroundColor: '#F8F8F8',
    color: '#000',
  },
  clearButton: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'rgba(196, 196, 196, 1)',
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
  },
  addFlex: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 21,
    paddingVertical: 10,
  },
  addText: {
    color: 'rgba(5, 185, 240, 1)',
    marginLeft: 16,
    fontSize: 12,
    fontFamily: 'Nunito-Semibold',
  },
});

export default Notes;
