import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import DeleteNotes from "../../assets/img/DeleteNotes";



const NotesItem = ({id, text, deleteNotesItemHandler, idItem}) => {

  const deleteNotesHandler = () => {
    deleteNotesItemHandler(id)
  };
  return (
    <View style={styles.wrapper}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Заметка #{idItem + 1}</Text>
        {deleteNotesItemHandler? <TouchableHighlight activeOpacity={1} underlayColor="transparent"
                             onPress={deleteNotesHandler}><Text><DeleteNotes/></Text></TouchableHighlight> : null}
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 21,
    paddingVertical: 28,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  title: {
    color: 'rgba(88, 209, 129, 1)',
    fontFamily: 'Nunito-SemiBold',
    marginBottom: 14,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    marginLeft: 2,
  },
});

export default NotesItem;
