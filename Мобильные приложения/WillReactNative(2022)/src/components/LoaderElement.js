import React, {useRef} from 'react';
import {View, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Animated} from 'react-native';

const LoaderElement = ({style, show}) => {
  const fadeAnim = useRef(new Animated.Value(-320)).current;
  Animated.loop(
    Animated.timing(fadeAnim, {
      toValue: 600,
      duration: 1900,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ).start();

  return (
    <View
      style={[
        {
          width: '100%',
          height: '100%',
          backgroundColor: '#c8c8c8',
          borderRadius: 10,
          overflow: 'hidden',
        },
        style,
        show ? null : {display: 'none'},
      ]}>
      <Animated.View
        style={{
          width: '125%',
          minHeight: '100%',
          transform: [{translateX: fadeAnim}],
        }}>
        <LinearGradient
          style={{width: '100%', height: '100%'}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[
            '#c8c8c8',
            'rgba(208,203,203,0.5)',
            'rgba(234,229,229,0.5)',
            '#c8c8c8',
          ]}
        />
      </Animated.View>
    </View>
  );
};

export default LoaderElement;
