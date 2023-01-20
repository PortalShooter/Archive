import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Facebook(props) {
  return (
    <Svg
      width={43}
      height={43}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M37.625 0H5.375A5.38 5.38 0 000 5.375v32.25A5.38 5.38 0 005.375 43h32.25A5.38 5.38 0 0043 37.625V5.375A5.38 5.38 0 0037.625 0z"
        fill="#1976D2"
      />
      <Path
        d="M36.281 21.5h-6.718v-5.375c0-1.483 1.204-1.344 2.687-1.344h2.688V8.062h-5.376a8.062 8.062 0 00-8.062 8.063V21.5h-5.375v6.719H21.5V43h8.063V28.219h4.03l2.688-6.719z"
        fill="#FAFAFA"
      />
    </Svg>
  );
}

export default Facebook;
