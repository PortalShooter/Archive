import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function Play(props) {
  return (
    <Svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle
        cx={20}
        cy={20}
        r={19}
        fill="#05B9F0"
        stroke="#fff"
        strokeWidth={2}
      />
      <Path d="M30 21l-15 8.66V12.34L30 21z" fill="#fff" />
    </Svg>
  );
}

export default Play;
