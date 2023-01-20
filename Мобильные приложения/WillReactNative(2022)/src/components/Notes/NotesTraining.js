import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import stylesGeneral from "../../assets/stylesGeneral";
import ModalAlert from "../ModalWindows/ModalAlert";
import {useDispatch, useSelector} from "react-redux";
import {postTrainingNotes} from "../../redux/training-reducer";

const NotesTraining = ({setNotesIsOpen, notesLeng, idTraining}) => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.Training.training_notes)
  const [notesInputValue, setNotesInputValue] = useState('');
  const [error, setError] = useState(false);

  const notesSaveHandler = () => {
    if (notesInputValue) {
      dispatch(postTrainingNotes(idTraining, notesInputValue))
      setNotesInputValue('');
      setNotesIsOpen(false);
    } else {
      setError(true);
    }
  };


  return (
    <View style={{paddingHorizontal: 21, marginVertical: 20, paddingTop: 20, backgroundColor: '#fff'}}>
      {error? <ModalAlert setError={setError}/> : null}
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>
        Заметка #{notesLeng + 1}
      </Text>
      <TextInput
        value={notesInputValue}
        onChangeText={setNotesInputValue}
        multiline={true}
        placeholder={'Запиши все здесь'}
        style={[
          styles.textInput,
          {height: 292, textAlignVertical: 'top', },
        ]}
      />
      <Text
        style={[stylesGeneral.blueButton, {marginBottom: 13, marginTop: 18}]}
        onPress={notesSaveHandler}>
        Сохранить
      </Text>
      <Text
        style={styles.clearButton}
        onPress={() => setNotesInputValue('')}>
        Очистить
      </Text>
    </View>
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
    marginTop: 20,
    paddingHorizontal: 21,
    paddingVertical: 15,
    fontFamily: 'Nunito-Regular',
    backgroundColor: '#F8F8F8',
    borderRadius: 5
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

export default NotesTraining;
