import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import AdditionalInformation from '../components/AdditionalInformation';
import AddNotes from '../assets/img/AddNotes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesGeneral from '../assets/stylesGeneral';

const ToDoList = () => {
  const [notesIsOpen, setNotesIsOpen] = useState(false);
  let [notes, setNotes] = useState([]);
  let [change, setChange] = useState(true);

  useEffect(async () => {
    AsyncStorage.getItem('@NotesToDoList').then(res => {
      if (res !== null) {
        setNotes(JSON.parse(res));
      }
    });
  }, [notesIsOpen, change]);

  return (
    <Header>
      <ScrollView style={styles.wrapper}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <AdditionalInformation
          text={['Перечень поможет не забывать ценные идеи и важные дела']}
        />

        <View style={{height: '100%', paddingTop: 20}}>
          {notes
            ? notes.map((item, index) => (
                <NoteItem
                  notes={notes}
                  data={item}
                  index={index}
                  setChange={setChange}
                />
              ))
            : null}

          {notesIsOpen ? (
            <Note setNotesIsOpen={setNotesIsOpen} notes={notes} />
          ) : null}
          {notesIsOpen ? null : (
            <TouchableHighlight
              style={{marginVertical: 20}}
              activeOpacity={1}
              underlayColor="transparent"
              onPress={() => setNotesIsOpen(!notesIsOpen)}>
              <View style={styles.addFlex}>
                <AddNotes />
                <Text style={styles.addText}>Добавить запись</Text>
              </View>
            </TouchableHighlight>
          )}
        </View>
      </ScrollView>
    </Header>
  );
};

const Note = ({setNotesIsOpen, notes}) => {
  const [notesInputValue, setNotesInputValue] = useState('');

  const notesSaveHandler = async () => {
    const text = notesInputValue.trim()
    if (text) {
      const noteObj = {text};
      const notesArr = notes;
      notesArr.push(noteObj);

      await AsyncStorage.setItem('@NotesToDoList', JSON.stringify(notesArr));
      setNotesInputValue('');
      setNotesIsOpen(false);
    }
  };

  return (
    <View
      style={{
        padding: 21,
        backgroundColor: '#fff',
        borderRadius: 5,
      }}>
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>Важное дело</Text>

      <TextInput
        defaultValue={notesInputValue}
        onChangeText={setNotesInputValue}
        multiline={true}
        autoCorrect={false}
        maxLength={5000}
        placeholder={'Запиши все здесь'}
        style={[styles.textInput, {minHeight: 292, textAlignVertical: 'top'}]}
      />

      <Text
        style={[stylesGeneral.blueButton, {marginBottom: 13, marginTop: 20}, !notesInputValue.trim() && {backgroundColor: '#F3F3F3'}]}
        onPress={() => notesSaveHandler()}>
        Сохранить
      </Text>
      <Text
        style={styles.clearButton}
        onPress={() => {
          setNotesInputValue('');
        }}>
        Очистить
      </Text>
    </View>
  );
};

const NoteItem = ({data, notes, index, setChange}) => {
  return (
    <View style={stylesItemBody.wrapper}>
      <Text style={stylesItemBody.text}>{data.text}</Text>

      <TouchableOpacity
        onPress={async () => {
          const deleteArr = await notes;
          await deleteArr.splice(index, 1);

          await AsyncStorage.setItem(
            '@NotesToDoList',
            JSON.stringify(deleteArr),
          );
          setChange(deleteArr);
        }}>
        <View style={{width: 25, height: 25}}>
          <View
            style={[stylesItemBody.arrow, {transform: [{rotate: '45deg'}]}]}
          />
          <View
            style={[stylesItemBody.arrow, {transform: [{rotate: '-45deg'}]}]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: '4.5%',
    paddingHorizontal: 21,
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  wrapperVideo: {
    marginTop: '9%',
    marginBottom: '2%',
    position: 'relative',
  },

  addFlex: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  addText: {
    color: 'rgba(5, 185, 240, 1)',
    marginLeft: 16,
    fontSize: 12,
    fontFamily: 'Nunito-Semibold',
  },

  clearButton: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'rgba(196, 196, 196, 1)',
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
  },

  textInput: {
    marginTop: 20,
    paddingHorizontal: 21,
    paddingVertical: 15,
    fontFamily: 'Nunito-Regular',
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
  },
});

const stylesItemBody = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 23,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    width: 20,
    height: 2,
    backgroundColor: '#000',
    borderRadius: 100,
    position: 'absolute',
    right: 2,
    top: 9,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    width: '95%',
  },
});

export default ToDoList;
