import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, Platform} from 'react-native';
import stylesGeneral from '../../assets/stylesGeneral';
import {WheelPicker} from 'react-native-wheel-picker-android';
// import {Picker} from '@react-native-picker/picker';

import {week} from '../../assets/data/valuePicker';

const WeekPicker = ({setWindowIsOpen, setWindowValue, windowValue}) => {
  const [lockBtn, setLockBtn] = useState(true);
  const [viewableItems, setViewableItems] = useState(1);

  const onViewRef = React.useRef(viewableItems => {
    setLockBtn(true);
    setViewableItems(viewableItems + 1);
  });
  const saveHandler = () => {
    setWindowValue(viewableItems);
    setWindowIsOpen(false);
  };

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      statusBarTranslucent={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalWarningWrapper}>
          <Text
            style={{
              marginTop: 44,
              marginHorizontal: 46,
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'Nunito-SemiBold',
            }}>
            Выбери продолжительность выполнения нового Дела
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              overflow: 'hidden',
              height: 210,
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View
              style={{
                width: 120,
                height: '200%',
                justifyContent: 'flex-start',
                flex: 1,
                top: '-22%',
              }}>
              {/* {Platform.OS !== 'ios' ? (
                <Picker
                  style={{flex: 1, top: 50}}
                  selectedValue={onViewRef.current}
                  onValueChange={(itemValue, itemIndex) => {
                    // setWindowValue(itemIndex + 1);
                    // setLockBtn(true);


                  }}
                  itemStyle={{
                    color: '#05B9F0',
                    fontSize: 48,
                    fontFamily: 'Nunito-Bold',
                  }}>
                  {week.map((el, index) => {
                    return <Picker.Item label={el} value={index + 1} />;
                  })}
                </Picker>
              ) : ( */}
                <WheelPicker
                  style={{flex: 1}}
                  data={week}
                  selectedItemTextSize={42}
                  initPosition={0}
                  itemTextSize={42}
                  selectedItemTextFontFamily={'Nunito-Bold'}
                  itemTextFontFamily={'Nunito-Bold'}
                  onItemSelected={onViewRef.current}
                  isCyclic={true}
                  visibleItemCount={3}
                  hideIndicator={false}
                  itemTextColor={'#F3F3F3'}
                  selectedItemTextColor={'#05B9F0'}
                  itemStyle={{
                    color: 'rgba(5, 185, 240, 1)',
                    fontSize: 48,
                    fontFamily: 'Nunito-Bold',
                    backgroundColor: 'transparent',
                    top: 65,
                  }}
                />
              {/* )} */}
            </View>
          </View>

          <Text
            style={[stylesGeneral.blueButton, {marginBottom: 23}]}
            onPress={() => {
              lockBtn && saveHandler();
            }}>
            Сохранить
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
    height: 420,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
    paddingBottom: 20,
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

export default WeekPicker;
