import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function BackArrow(props) {
  return (
    <Svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M4.222 10.241l8.455 8.456c.196.195.457.303.735.303.278 0 .54-.108.735-.303l.623-.623a1.04 1.04 0 000-1.47l-7.1-7.1 7.108-7.108c.195-.196.303-.457.303-.735 0-.278-.108-.54-.303-.735l-.623-.622A1.032 1.032 0 0013.42 0c-.278 0-.54.108-.735.304L4.222 8.766a1.033 1.033 0 00-.303.737c0 .28.107.542.303.738z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path
            fill="#fff"
            transform="rotate(-180 9.5 9.5)"
            d="M0 0h19v19H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default BackArrow;
