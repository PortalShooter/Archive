import React from 'react';
import Svg, {G, Path, Rect, Defs, ClipPath} from 'react-native-svg';
import {View} from 'react-native';

const Arrow = props => {
  return (
    <View
      style={[
        {
          transform: [{rotate: `${props.rotate}deg`}],
          width: 75,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}>
      <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <G clip-path="url(#clip0)">
          <Path
            d="M6.46824 9.33358L11.8083 3.99343C11.9319 3.86992 12 3.70504 12 3.52924C12 3.35343 11.9319 3.18856 11.8083 3.06504L11.4151 2.67178C11.1589 2.41588 10.7425 2.41588 10.4867 2.67178L6.00249 7.15604L1.51326 2.6668C1.38965 2.54329 1.22487 2.4751 1.04916 2.4751C0.873261 2.4751 0.708482 2.54329 0.584775 2.6668L0.191706 3.06007C0.0680971 3.18368 -3.81757e-08 3.34846 -4.58603e-08 3.52426C-5.3545e-08 3.70006 0.0680971 3.86494 0.191706 3.98845L5.53664 9.33358C5.66064 9.45738 5.8262 9.52538 6.00219 9.52499C6.17888 9.52538 6.34434 9.45738 6.46824 9.33358Z"
            fill={props.color ? props.color : '#05B9F0'}
          />
        </G>
        <Defs>
          <ClipPath id="clip0">
            <Rect width="12" height="12" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default Arrow;
