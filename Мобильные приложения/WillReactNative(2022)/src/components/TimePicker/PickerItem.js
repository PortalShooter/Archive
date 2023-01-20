import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import stylesGeneral from '../../assets/stylesGeneral';
import SwiperPicker from './SwiperPicker';
import {percent} from '../../assets/data/valuePicker';

const PickerItem = ({setVisiblePercentPicker, setValue, value, setDoubleClick}) => {

  const [valueP, setValueP] = useState();

  const saveHandler = () => {
    if (typeof valueP === 'number') {
      setValue(valueP);
      setVisiblePercentPicker(false);
      setDoubleClick(0);
    }
  };


  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalWarningWrapper}>
          <View style={{width: 200, height: 280, marginVertical: 20}}>
            <SwiperPicker setValue={setValueP} value={value} data={percent}/>
          </View>
          <Text
            style={[stylesGeneral.blueButton, {marginBottom: 23}]}
            onPress={saveHandler}>
            Сохранить
          </Text>
          <Text
            style={styles.remindLater}
            onPress={() => {
              setVisiblePercentPicker(false);
              setDoubleClick(0);
            }}>
            Отмена
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    paddingHorizontal: 20,
    display: 'flex',
  },
  modalWarningWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    height: 432,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  remindLater: {
    color: '#C4C4C4',
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
});

export default PickerItem;
