import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import stylesGeneral from '../../assets/stylesGeneral';
import TimePickerItem from './TimePickerItem';


const TimePicker = ({setHours, setMinutes, setVisible, hours, minutes, type}) => {
  const [viewableItemsHour, setViewableItemsHour] = useState();
  const [viewableItemsMinutes, setViewableItemsMinutes] = useState();


  const saveHandler = () => {
      setHours(viewableItemsHour);
      setMinutes(viewableItemsMinutes);
      setVisible(false);
  };

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalWarningWrapper}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}>
            <TimePickerItem
              setViewableItems={setViewableItemsHour}
              type={type === undefined? 'hour' : type}
              hours={hours}
            />
            <Text
              style={{
                fontSize: 48,
                textAlignVertical: 'center',
                color: 'rgba(5, 185, 240, 1)',
              }}>
              :
            </Text>
            <TimePickerItem
              setViewableItems={setViewableItemsMinutes}
              type={'minutes'}
              minutes={minutes}
            />
          </View>
          <Text
            style={[stylesGeneral.blueButton, {marginBottom: 23}]}
            onPress={saveHandler}>
            Сохранить
          </Text>
          <Text style={styles.remindLater} onPress={() => setVisible(false)}>
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
    height: 332,
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

export default TimePicker;
