import React, {useState} from 'react';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {View, Platform} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SwiperPicker = ({value, setValue, data}) => {
  const init = Array.isArray(value) ? value[0] : value;
  const [count, setCount] = useState(value);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        justifyContent: 'center',
      }}>
      {Platform.OS === 'ios' ? (
        <Picker
          style={{flex: 1}}
          selectedValue={count}
          onValueChange={(itemValue, itemIndex) => {
            setCount(itemIndex);
            setValue(itemValue);
          }}
          itemStyle={{
            color: '#05B9F0',
            fontSize: 48,
            fontFamily: 'Nunito-Bold',
          }}>
          {data.map((el, index) => {
            return <Picker.Item label={el} value={index} />;
          })}
        </Picker>
      ) : (
        <WheelPicker
          style={{flex: 1}}
          selectedItemTextSize={40}
          initPosition={init}
          itemTextSize={40}
          selectedItemTextFontFamily={'Nunito-Bold'}
          itemTextFontFamily={'Nunito-Bold'}
          data={data}
          onItemSelected={e => setValue(e)}
          isCyclic={true}
          hideIndicator={false}
          itemTextColor={'#F3F3F3'}
          selectedItemTextColor={'#05B9F0'}
          onViewableItemsChanged={e => {
            console.log(e);
          }}
          itemStyle={{
            color: 'rgba(5, 185, 240, 1)',
            fontSize: 48,
            fontFamily: 'Nunito-Bold',
            backgroundColor: 'transparent',
          }}
        />
      )}
    </View>
  );
};

export default SwiperPicker;
