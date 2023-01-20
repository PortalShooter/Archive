import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, Platform} from 'react-native';
import stylesGeneral from '../../assets/stylesGeneral';
import WheelPickerTime from './WheelPickerTime';
import {hour, minute} from '../../assets/data/valuePicker';
import {Picker} from '@react-native-picker/picker';

const TimePickerItemNew = ({
  setVisible,
  hours,
  setHours,
  minutes,
  setMinutes,
}) => {
  const hourValue = hours ? hour.indexOf(hours) : 0;
  const minuteValue = minutes ? minute.indexOf(minutes) : 0;

  const [valueH, setValueH] = useState(hourValue);
  const [valueM, setValueM] = useState(minuteValue);

  const saveHandler = () => {

    if (typeof valueH === 'number' && typeof valueM === 'number') {
      setHours(hour[valueH]);
      setMinutes(minute[valueM]);
      setVisible(false);
    } else {
      console.log('error');
    }
  };
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalWarningWrapper}>
          <View style={{width: 260, height: 320}}>
            {Platform.OS === 'ios' ? (
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  alignItems: 'center',
                }}>
                <Picker
                  style={{flex: 1}}
                  selectedValue={hour[valueH]}
                  onValueChange={(itemValue, itemIndex) => setValueH(itemIndex)}
                  itemStyle={{
                    color: '#05B9F0',
                    fontSize: 48,
                    fontFamily: 'Nunito-Bold',
                  }}>
                  {hour.map(el => {
                    return <Picker.Item label={el} value={el} />;
                  })}
                </Picker>

                <Text
                  style={[
                    {
                      fontSize: 48,
                      textAlignVertical: 'center',
                      color: 'rgba(5, 185, 240, 1)',
                    },
                  ]}>
                  :
                </Text>

                <Picker
                  style={{flex: 1}}
                  selectedValue={minute[valueM]}
                  onValueChange={(itemValue, itemIndex) => setValueM(itemIndex)}
                  itemStyle={{
                    color: '#05B9F0',
                    fontSize: 48,
                    fontFamily: 'Nunito-Bold',
                  }}>
                  {minute.map(el => {
                    return <Picker.Item label={el} value={el} />;
                  })}
                </Picker>
              </View>
            ) : (
              <WheelPickerTime
                setValueH={setValueH}
                setValueM={setValueM}
                valueH={hours}
                valueM={minutes}
              />
            )}
          </View>
          <Text
            style={[stylesGeneral.blueButton, {marginBottom: 23}]}
            onPress={saveHandler}>
            Сохранить
          </Text>
          <Text
            style={styles.remindLater}
            onPress={() => {
              setVisible(false);
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

export default TimePickerItemNew;
