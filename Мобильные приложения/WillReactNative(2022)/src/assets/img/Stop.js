import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function Stop(props) {
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
        fill="#FF4242"
        stroke="#fff"
        strokeWidth={2}
      />
      <Path fill="#fff" d="M14 14h13v13H14z" />
    </Svg>
  );
}

export default Stop;
