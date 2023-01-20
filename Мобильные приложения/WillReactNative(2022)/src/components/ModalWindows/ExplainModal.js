import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import stylesGeneral from '../../assets/stylesGeneral';

const windowHeight = Math.round(Dimensions.get('window').height - 120);
const windowHeight1 = Math.round(Dimensions.get('window').width);

const ExplainModal = ({setModalIsOpen, modalIsOpen, title, text}) => {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalWarningWrapper}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{text}</Text>
            <Text
              onPress={() => setModalIsOpen(!modalIsOpen)}
              style={[stylesGeneral.blueButton, {marginBottom: 22}]}>
              Закрыть
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  modalWarningWrapper: {
    width: '100%',
    paddingHorizontal: 29,
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 5,
    height: windowHeight,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 22,
    fontFamily: 'Nunito-Bold',
  },
  modalText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    marginBottom: 50,
  },
});

export default ExplainModal;
