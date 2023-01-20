import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PickerItem from '../../components/TimePicker/PickerItem';
import {Slider} from '@miblanchard/react-native-slider';

const MultiSliderHomePage = ({title, value, setValue}) => {
  const [visiblePercentPicker, setVisiblePercentPicker] = useState(false);
  const [doubleClick, setDoubleClick] = useState(0);

  useEffect(() => {
    if (doubleClick > 0) {
      setTimeout(() => {
        setDoubleClick(0);
      }, 1000);
    }
  });
  return (
    <TouchableOpacity
      style={{marginVertical: 20}}
      onPress={() => {
        setDoubleClick(doubleClick + 1);
        if (doubleClick >= 1) {
          setVisiblePercentPicker(true);
        }
      }}
      activeOpacity={1}>
      {visiblePercentPicker ? (
        <PickerItem
          setVisiblePercentPicker={setVisiblePercentPicker}
          value={value}
          setValue={setValue}
          setDoubleClick={setDoubleClick}
        />
      ) : null}
      <Text style={styles.sliderTitle}>{title}</Text>
      <View>
        <Slider
          value={value}
          onValueChange={value => setValue(value[0])}
          step={1}
          maximumValue={100}
          minimumValue={0}
          containerStyle={{marginVertical: 10}}
          trackStyle={{
            height: 34,
            backgroundColor: '#F8F8F8',
            borderRadius: 50,
          }}
          thumbStyle={
            value > 1
              ? {
                  width: 34,
                  height: 34,
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#58D181',
                }
              : {
                  width: 34,
                  height: 34,
                  borderRadius: 50,
                  backgroundColor: '#58D181',
                }
          }
          minimumTrackTintColor={value > 1 ? '#58D181' : '#F8F8F8'}
        />
        <View
          style={{position: 'absolute', top: 20, right: -18, zIndex: 1111111}}>
          <Text style={styles.valueSlider}>{value}%</Text>
        </View>
      </View>
      <Text style={styles.sliderDescr}>Укажи проценты так, как ощущаешь</Text>
    </TouchableOpacity>
  );
};

export default MultiSliderHomePage;

const styles = StyleSheet.create({
  sliderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: '100%',
  },
  sliderTitle: {
    fontFamily: 'Nunito-Light',
    fontSize: 14,
    marginBottom: 10,
  },
  sliderDescr: {
    fontFamily: 'Nunito-Light',
    fontSize: 12,
    color: '#499563',
    marginLeft: 22,
    marginTop: 5,
    marginBottom: 23,
  },
  valueSlider: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    right: 40,
    zIndex: 11,
  },
});
