import React from 'react';
import stylesGeneral from '../../assets/stylesGeneral';
import {Modal, StyleSheet, Text, View} from 'react-native';

const ModalTrainTimerReminder = ({setVisibleReminder, deleteHandler, setChoice}) => {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalWarningWrapper}>
          <Text style={styles.modalTitle}>
            Ты уверен(а), что хочешь удалить историю тренинга?
          </Text>
          <Text
            onPress={() => {
              deleteHandler()
              setVisibleReminder(false)}}
            style={[stylesGeneral.blueButton, {marginBottom: 22, backgroundColor: '#FF4242'}]}>
            Да, очистить
          </Text>
          <Text style={[styles.modalTitle, {color: '#C4C4C4', marginTop: 0, marginBottom: 0}]} onPress={() => {
            setVisibleReminder(false)
            setChoice(false)
          }}>Отмена</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    height: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  modalWarningWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    height: 208,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalTitle: {
    width: 253,
    textAlign: 'center',
    display: 'flex',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 33,
    marginBottom: 22,
    fontFamily: 'Nunito-SemiBold',
  },
});

export default ModalTrainTimerReminder;