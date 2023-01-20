import React from 'react';
import {WheelPicker} from 'react-native-wheel-picker-android';
import { Platform, Text, View } from "react-native";
import {hour, minute} from '../../assets/data/valuePicker';

const WheelPickerTime = ({valueH, valueM, setValueH, setValueM}) => {
  const initHour = valueH ? hour.indexOf(valueH) : 0;
  const initMinute = valueM ? minute.indexOf(valueM) : 0;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        marginVertical: 10,
      }}>
      <WheelPicker
        style={{height: 280, flex: 1}}
        data={hour}
        initPosition={initHour}
        selectedItemTextSize={40}
        itemTextSize={40}
        selectedItemTextFontFamily={'Nunito-Bold'}
        itemTextFontFamily={'Nunito-Bold'}
        onItemSelected={e => {
          setValueH(e);
        }}
        isCyclic={true}
        hideIndicator={false}
        itemTextColor={'#F3F3F3'}
        selectedItemTextColor={'#05B9F0'}
        itemStyle={{
          color: 'rgba(5, 185, 240, 1)',
          fontSize: 48,
          fontFamily: 'Nunito-Bold',
          backgroundColor: 'transparent',
        }}
      />
      <Text
        style={[
          {
            fontSize: 48,
            textAlignVertical: 'center',
            color: 'rgba(5, 185, 240, 1)',
            top: 6,
          },
          Platform.OS === 'ios' && {top: -36},
        ]}>
        :
      </Text>
      <WheelPicker
        style={{height: 280, flex: 1}}
        data={minute}
        initPosition={initMinute}
        selectedItemTextSize={40}
        itemTextSize={40}
        selectedItemTextFontFamily={'Nunito-Bold'}
        itemTextFontFamily={'Nunito-Bold'}
        onItemSelected={e => {
          setValueM(e);
        }}
        isCyclic={true}
        hideIndicator={false}
        itemTextColor={'#F3F3F3'}
        selectedItemTextColor={'#05B9F0'}
        itemStyle={{
          color: 'rgba(5, 185, 240, 1)',
          fontSize: 48,
          fontFamily: 'Nunito-Bold',
          backgroundColor: 'transparent',
        }}
      />
    </View>
  );
};

export default WheelPickerTime;
