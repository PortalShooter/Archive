import React from 'react';
import {Text, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

const MultiSliderItem = ({values, total}) => {
  return (
    <View>
      <Slider
        value={values}
        step={1}
        maximumValue={total}
        minimumValue={0}
        disabled={true}
        containerStyle={{marginVertical: 10}}
        trackStyle={{
          height: 34,
          backgroundColor: '#F8F8F8',
          borderRadius: 50,
        }}
        thumbStyle={
          values > 0
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
        minimumTrackTintColor={values > 0 ? '#58D181' : '#F8F8F8'}
      />
      <View
        style={{position: 'absolute', top: 20, right: -18, zIndex: 1111111}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Nunito-SemiBold',
            right: 40,
            zIndex: 11,
          }}>
          {values}
        </Text>
      </View>
    </View>
  );
};

export default MultiSliderItem;
