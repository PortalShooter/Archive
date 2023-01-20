import React from 'react';
import stylesGeneral from '../../assets/stylesGeneral';
import {Modal, StyleSheet, Text, View} from 'react-native';

const ModalAlert = ({setError, errorValue}) => {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalWarningWrapper}>
          <Text style={styles.modalTitle}>
            Не все поля заполнены
          </Text>
          <Text
            onPress={() => setError(false)}
            style={[stylesGeneral.blueButton, {marginBottom: 22}]}>
            Закрыть
          </Text>
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
    height: 171,
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
    fontFamily: 'Nunito-Regular',
  },
});

export default ModalAlert;
